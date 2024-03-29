import {
	CodeBlock,
	CommandsContainer,
	RunnerCommand,
} from "./code-blocks/index.js";
import {
	levelVariables,
	levelAvailableCodeBlocks,
	levelTarget,
} from "./level-data/level-data.js";
import {
	getSquaredDistance,
	getContainerParent,
	getTopCodeBlockContainer,
	getInstanceById,
	setupCommands,
	setupExpressions,
	waitForMilisecond,
} from "./utils/misc.js";
import LeaderboardAPI from "./leaderboard-api.js";
import { CHECK_INTERVAL, ERROR, PLAYER_REACHED_GOAL, STOPPED } from "./code-blocks/code-block-constants.js";
import { checkPrompt, installGame } from "./installation.js";
import { translate, changeLanguage } from "./translations/translations.js";

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
 * isPaused: boolean,
 * playerCount: number,
 * stepCount: number,
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
	isPaused: false,
	playerCount: 0,
	stepCount: 0,
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
// const leaderboard = new LeaderboardAPI("http://localhost:3000");
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

	resetState(runtime);

	setupAvailableCommands(runtime);
	setupAvailableRepeatExpressions(runtime);
	setupAvailableConditionalExpressions(runtime);
	setupVariablesList(runtime);

	const { steps, codeBlocks } = levelTarget[runtime.globalVars.level];

	runtime.globalVars.targetSteps = steps ?? 0;
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

		players.sort((a, b) => a.instVars.id - b.instVars.id);

		let previousShownPlayer = runtime.globalVars.showPlayerId;

		for (const player of players) {
			runner.reset();

			player.moveToTop();

			runtime.globalVars.currentPlayerId = player.instVars.id;

			runtime.callFunction("SetShownPlayer", player.instVars.id);

			const result = await runner.run(player, state);

			if (result === STOPPED || result === ERROR) {
				break;
			} else if (result === PLAYER_REACHED_GOAL && state.playerCount === 0) {
				runtime.callFunction("GameOver");
				return;
			}
		}

		while (!state.isStopped) {
			await waitForMilisecond(CHECK_INTERVAL);
		}

		runtime.globalVars.isRunning = false;
		runtime.globalVars.showPlayerId = previousShownPlayer;
		runtime.callFunction("ResetGame");
	}
}

/**
 * 
 * @param {IRuntime} runtime 
 * @param {boolean} shouldResetVariables
 */
function resetState(runtime) {
	const playerCount = runtime.objects.Player.getAllInstances().length;

	state.isStopped = false;
	state.isError = false;
	state.isPaused = false;
	state.playerCount = playerCount;
	state.stepCount = 0;
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
		.map((shadow) => ({ uid: shadow.uid, distance: getSquaredDistance(codeBlock, shadow) }))
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
const VARIABLE_START_Y = 224;
const VARIABLE_SPACING_Y = 64;

const variableIconFrameMap = {
	"health": 0,
	"ammo": 2,
	"gem": 6,
}

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupVariablesList(runtime) {
	const variables = levelVariables[runtime.globalVars.level];

	if (variables.length === 0) {
		return;
	}

	runtime.globalVars.variableNames = variables
		.map((name) => name)
		.join("|");

	for (let i = 0; i < variables.length; i++) {
		const name = variables[i];

		const variable = runtime.objects.Icon.createInstance(
			"UI",
			VARIABLE_X,
			VARIABLE_START_Y + VARIABLE_SPACING_Y * i,
			true,
			"variable"
		);

		variable.instVars.id = name;
		variable.animationFrame = variableIconFrameMap[name] ?? 0;

		const variableText = variable.getChildAt(0);
		variableText.instVars.id = name;
	}
}

/**
 * 
 * @param {string} name 
 * @returns {number}
 */
function getVariableValue(player, name) {
	const variable = player.instVars[name] ?? 0;

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
 * sortBy: "steps" | "codeBlocks" | "timeMs",
 * order: "asc" | "desc"
 * }} options 
 * 
 * @returns {boolean} true if the leaderboard is not empty, false otherwise
 */
async function showLeaderboard(runtime, options) {
	const {
		page,
		maxPage,
		count,
		items,
	} = await leaderboard.getLeaderboard(options);

	const PAGE_SIZE = 5;

	const texts = {
		rank: [],
		name: [],
		time: [],
		steps: [],
		codeCount: [],
		datetime: []
	};

	for (const text of runtime.objects.UIText.getAllInstances()) {
		const id = text.instVars.id;

		if (id != "rank" && id.startsWith("rank")) {
			texts.rank.push(text);
		} else if (id != "name" && id.startsWith("name")) {
			texts.name.push(text);
		} else if (id != "time" && id.startsWith("time")) {
			texts.time.push(text);
		} else if (id != "steps" && id.startsWith("steps")) {
			texts.steps.push(text);
		} else if (id != "code-count" && id.startsWith("code-count")) {
			texts.codeCount.push(text);
		} else if (id != "datetime" && id.startsWith("datetime")) {
			texts.datetime.push(text);
		}
	}

	Object.values(texts).forEach(texts => texts.sort());

	for (let i = 0; i < count; i++) {
		const {
			username,
			steps,
			codeBlocks,
			timeMs,
			createdAt,
		} = items[i];

		texts.rank[i].text = `${(page - 1) * PAGE_SIZE + i + 1}`;
		texts.name[i].text = username;
		texts.time[i].text = runtime.callFunction("FormatTime", timeMs / 1000);
		texts.steps[i].text = `${steps}`;
		texts.codeCount[i].text = `${codeBlocks}`;
		texts.datetime[i].text = new Date(createdAt).toLocaleString();
	}

	for (let i = count; i < PAGE_SIZE; i++) {
		texts.rank[i].text = "";
		texts.name[i].text = "";
		texts.time[i].text = "";
		texts.steps[i].text = "";
		texts.codeCount[i].text = "";
		texts.datetime[i].text = "";
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

	return count > 0;
}

/**
 * 
 * @param {ICodeBlockButton | ICodeBlock} block 
 * @returns {string}
 */
function getBlockHelp(block) {
	let name;

	if (block.objectType.name === 'CodeBlockButton') {
		name = /** @type {ICodeBlockButton} */ block.animationName;
	} else {
		name = /** @type {ICodeBlock} */ block.objectType.name;
	}

	const frame = block.animationFrame;

	const match = RegExp(/(.+)(Command|Expression)/).exec(name);

	if (!match) {
		throw Error(`"${name}" is not a valid CodeBlock name`);
	}

	const key = `game.blocks.${match[1].toLowerCase()}.${frame}`;
	const titleKey = `${key}.title`;
	const contentKey = `${key}.content`;
	const exampleKey = `${key}.example`;
	const exampleTitleKey = `game.blocks.example-title`;

	return [translate(titleKey), translate(contentKey), translate(exampleTitleKey), translate(exampleKey)];
}