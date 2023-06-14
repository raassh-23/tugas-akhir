import {
	CodeBlock,
	CommandsContainer,
	RunnerCommand,
} from "./code-blocks/index.js";
import { 
	levelVariables,
	levelAvailableCodeBlocks,
	levelTarget,
} from "./level-data.js";
import {
	getSquaredDistance,
	getContainerParent,
	getTopCodeBlockContainer,
	getInstanceById,
	setupCommands,
	setupExpressions,
} from "./utils/misc.js";
import LeaderboardAPI from "./leaderboard-api.js";
import { ERROR, PLAYER_REACHED_GOAL, STOPPED } from "./code-blocks/code-block-constants.js";

/**
 * @type {RunnerCommand?}
 */
let runner = null;

/**
 * @type {CodeBlock?}
 */
let pickedCommand = null;

/**
 * @typedef {{
 * isStopped: boolean,
 * isError: boolean,
 * playerCount: number,
 * actionCount: number,
 * variables: {
 *  [variable: string]: number,
 * }
 * surrounding: {
 * 	up: number,
 * 	down: number,
 * 	left: number,
 * 	right: number,
 *  upperleft: number,
 *  upperright: number,
 * 	lowerleft: number,
 * 	lowerright: number,
 * 	center: number,
 * }}} GameState
 */

/**
 * @type {GameState}
 */
const state = {
	isStopped: false,
	isError: false,
	playerCount: 0,
	actionCount: 0,
	variables: {},
	surrounding: {
		up: 0,
		down: 0,
		left: 0,
		right: 0,
		upperleft: 0,
		upperright: 0,
		lowerleft: 0,
		lowerright: 0,
		center: 0,
	}
}

/**
 * @type {LeaderboardAPI}
 */
const leaderboard = new LeaderboardAPI("https://tugas-akhir-api.herokuapp.com");

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupLevel(runtime) {
	runner = runtime.objects.StartCommand.getFirstInstance();

	if (runner == null) {
		throw new Error("cannot find runner");
	}

	resetState(runtime, true);

	setupAvailableCommands(runtime);
	setupAvailableRepeatExpressions(runtime);
	setupAvailableConditionalExpressions(runtime);
	setupVariablesList(runtime);

	const {actions, codeBlocks} = levelTarget[runtime.globalVars.level];

	runtime.globalVars.targetActions = actions ?? 0;
	runtime.globalVars.targetCodeBlocks = codeBlocks ?? 0;
}

/**
 * 
 * @param {IRuntime} runtime
 * @param {IPlayer[]} players 
 */
async function runCommands(runtime, players) {
	if (!runtime.globalVars.isRunning) {
		runtime.globalVars.isRunning = true;
		
		players.sort((a, b) => a.instVars.order - b.instVars.order);

		for (const player of players) {
			runner.reset(true); // reset commands, including errors

			runtime.globalVars.currentPlayerUID = player.uid;

			const result = await runner.run(player, state);

			if (result === STOPPED || result === ERROR) {
				runtime.callFunction("ResetGame");

				return;
			} else if (result === PLAYER_REACHED_GOAL && state.playerCount === 0) {
				runtime.callFunction("GameOver");
				return;
			}

			resetVariables(runtime.globalVars.level);
		}

		runtime.globalVars.isRunning = false;

		runtime.callFunction("ResetGame");
	}
}

/**
 * 
 * @param {IRuntime} runtime 
 * @param {boolean} shouldResetVariables
 */
function resetState(runtime, shouldResetVariables = true) {
	const level = runtime.globalVars.level;
	const playerCount = runtime.objects.Player.getAllInstances().length;

	state.isStopped = false;
	state.isError = false;
	state.playerCount = playerCount;
	state.actionCount = 0;
	state.surrounding = {
		up: 0,
		down: 0,
		left: 0,
		right: 0,
		upperleft: 0,
		upperright: 0,
		lowerleft: 0,
		lowerright: 0,
		center: 0,
	};

	if (shouldResetVariables) {
		resetVariables(level);
	}
}

function resetVariables(level) {
	state.variables = { ...levelVariables[level] };
}

/**
 * 
 * @param {CodeBlock} codeBlock 
 * @param {ICodeBlockShadow} codeBlockShadow
 */
function addCodeBlock(codeBlock, codeBlockShadow) {
	const top = getTopCodeBlockContainer(codeBlockShadow);
	const addToGrandParent = codeBlockShadow.instVars.addToGrandParent;
	let parent = getContainerParent(codeBlockShadow);

	if (addToGrandParent) {
		parent = getContainerParent(parent);
	}

	codeBlock.setPosition(...codeBlockShadow.getPosition());

	parent.container.addCodeBlock(codeBlock);
	parent.addChild(codeBlock, {
		transformX: true,
		transformY: true,
		destroyWithParent: true,
	});

	codeBlock.containerParent = parent.container;

	top.updateLevel(0);
	top.container.logCodeBlocks();
	top.expand(0);
}

/**
 * 
 * @param {CodeBlock} codeBlock 
 */
function removeCodeBlock(codeBlock) {
	const top = getTopCodeBlockContainer(codeBlock);
	const parent = getContainerParent(codeBlock);

	parent.container.removeCodeBlock(codeBlock);
	codeBlock.removeFromParent();

	top.updateLevel(0);
}

/**
 * 
 * @param {CodeBlock} codeBlock 
 * @param {ICodeBlockShadow[]} codeBlockShadows 
 * @returns {number} uid of code block shadow to show, 0 if no code block shadow to show
 */
function pickCodeBlockShadowToShow(codeBlock, codeBlockShadows) {
	const pickedShadow = codeBlockShadows
		.map((shadow) => ({uid: shadow.uid, distance: getSquaredDistance(codeBlock, shadow)}))
		.sort((a, b) => a.distance - b.distance)[0];

	if (pickedShadow) {
		return pickedShadow.uid;
	} else {
		return 0;
	}
}

/**
 * 
 * @param {CommandsContainer[]} containers 
 */
function resetContainerLength(containers) {
	containers.filter((c) => c.layer.isSelfAndParentsInteractive && c.container.isLeaf())
		.forEach((c) => {
			c.expand(0);
		});
}

/**
 * 
 * @param {ICodeBlockShadow} codeBlockShadow 
 */
function expandCodeBlockShadowContainer(codeBlockShadow) {
	const addToGrandParent = codeBlockShadow.instVars.addToGrandParent;

	let parent = getContainerParent(codeBlockShadow);

	if (addToGrandParent) {
		parent = getContainerParent(parent);
	}

	parent.expand(codeBlockShadow.width);
}

/**
 * 
 * @param {ISpriteInstance} sprite 
 */
function logParent(sprite) {
	let level = 1;
	console.log("logParent");
	console.log("child");
	console.log(sprite);
	for (const parent of sprite.parents()) {
		console.log("parent level " + level++);
		console.log(parent);
	}
}

/**
 * 
 * @returns {number}
 */
function getCodeBlockCount() {
	return runner.getCount();
}

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupAvailableCommands(runtime) {
	const level = runtime.globalVars.level;

	const availableCommands = levelAvailableCodeBlocks[level].commands;

	const scrollable = getInstanceById(runtime.objects.ScrollablePanel, "available-commands")

	setupCommands(
		runtime.objects.CodeBlockButton,
		scrollable,
		availableCommands,
		{
			inactiveLayer: "InactiveCodeBlocks",
			panelId: "active-commands-panel",
		},
	);
}

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupAvailableRepeatExpressions(runtime) {
	const level = runtime.globalVars.level;

	const availableRepeatExpressions = levelAvailableCodeBlocks[level].repeatExpressions;

	if (availableRepeatExpressions.length === 0) {
		return;
	}

	const scrollable = getInstanceById(runtime.objects.ScrollablePanel, "available-repeat-expressions");

	setupExpressions(
		runtime.objects.CodeBlockButton,
		scrollable,
		availableRepeatExpressions,
		{
			inactiveLayer: "InactiveCodeBlocks",
			panelId: "",
		},
	);
}

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupAvailableConditionalExpressions(runtime) {
	const level = runtime.globalVars.level;

	const availableWhileExpressions = levelAvailableCodeBlocks[level].conditionalExpressions;

	if (availableWhileExpressions.length === 0) {
		return;
	}

	const scrollable = getInstanceById(runtime.objects.ScrollablePanel, "available-conditional-expressions");

	setupExpressions(
		runtime.objects.CodeBlockButton,
		scrollable,
		availableWhileExpressions,
		{
			inactiveLayer: "InactiveCodeBlocks",
			panelId: "",
		},
	);
}

const VARIABLE_X = 1216;
const VARIABLE_START_Y = 160;
const VARIABLE_SPACING_Y = 64;

const variableIconMap = {
	"health": 0,
	"ammo": 2,
	"gem": 6,
}

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupVariablesList(runtime) {
	const variables = Object.entries(state.variables);

	runtime.globalVars.variableNames = variables
		.map(([name]) => name)
		.join("|");

	for (let i = 0; i < variables.length; i++) {
		const [name, value] = variables[i];

		const variable = runtime.objects.Icon.createInstance(
			"UI",
			VARIABLE_X,
			VARIABLE_START_Y + VARIABLE_SPACING_Y * i,
			true,
			"variable"
		);

		variable.instVars.id = name;
		variable.animationFrame = variableIconMap[name] ?? 0;

		const variableText = variable.getChildAt(0);
		variableText.text = value.toString();
		variableText.instVars.id = name;
	}
}

/**
 * 
 * @param {string} name 
 * @returns {number}
 */
function getVariableByName(name) {
	const variable = state.variables[name];

	if (variable == null) {
		throw new Error(`Variable ${name} does not exist.`);
	}

	return variable;
}

/**
 * 
 * @param {IRuntime} runtime 
 * @param {{
 * level: number,
 * page: number,
 * pageSize: number,
 * sortBy: "actions" | "codeBlocks" | "timeMs",
 * order: "asc" | "desc"
 * }} options 
 */
async function showLeaderboard(runtime, options) {
	const {
		page,
		maxPage,
		count,
		items,
	} = await leaderboard.getLeaderboard(options);

	const PAGE_SIZE = 5;

	const rankTexts = [];
	const nameTexts = [];
	const timeTexts = [];
	const actionTexts = [];
	const codeBlockTexts = [];
	const dateTexts = [];

	for (const text of runtime.objects.UIText.getAllInstances()) {
		const id = text.instVars.id;

		if (id != "rank" && id.startsWith("rank")) {
			rankTexts.push(text);
		} else if (id != "name" && id.startsWith("name")) {
			nameTexts.push(text);
		} else if (id != "time" && id.startsWith("time")) {
			timeTexts.push(text);
		} else if (id != "actions" && id.startsWith("actions")) {
			actionTexts.push(text);
		} else if (id != "code-count" && id.startsWith("code-count")) {
			codeBlockTexts.push(text);
		} else if (id != "datetime" && id.startsWith("datetime")) {
			dateTexts.push(text);
		}
	}

	rankTexts.sort();
	nameTexts.sort();
	timeTexts.sort();
	actionTexts.sort();
	codeBlockTexts.sort();
	dateTexts.sort();

	let i = 0;

	for (; i < count; i++) {
		const {
			username,
			actions,
			codeBlocks,
			timeMs,
			createdAt,
		} = items[i];

		rankTexts[i].text = `${(page - 1) * PAGE_SIZE + i + 1}`;
		nameTexts[i].text = username;
		timeTexts[i].text = runtime.callFunction("FormatTime", timeMs / 1000);
		actionTexts[i].text = `${actions}`;
		codeBlockTexts[i].text = `${codeBlocks}`;
		dateTexts[i].text = new Date(createdAt).toLocaleString();
	}

	for (; i < PAGE_SIZE; i++) {
		rankTexts[i].text = "";
		nameTexts[i].text = "";
		timeTexts[i].text = "";
		actionTexts[i].text = "";
		codeBlockTexts[i].text = "";
		dateTexts[i].text = "";
	}

	for (const button of runtime.objects.Button.getAllInstances()) {
		if (button.instVars.id == "prev-board") {
			button.isVisible = page > 1;
			button.instVars.isDisabled = page <= 1;
		} else if (button.instVars.id == "next-board") {
			button.isVisible = page < maxPage;
			button.instVars.isDisabled = page >= maxPage;
		}
	}
}