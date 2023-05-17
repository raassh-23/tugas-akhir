import {
	CodeBlock,
	CommandsContainer,
	RunnerCommand,
} from "./code-blocks/index.js";
import {levelVariables, levelAvailableCodeBlocks} from "./level-data.js";
import { 
	getSquaredDistance,
	getContainerParent,
	getTopCodeBlockContainer,
	getInstanceById,
	createCodeBlockButton,
} from "./utils/misc.js";
import LeaderboardAPI from "./leaderboard/leaderboard-api.js";

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
 * isGameOver: boolean,
 * isError: boolean,
 * actionCount: number,
 * variables: {[variable: string]: number}
 * }} GameState
 */

/**
 * @type {GameState}
 */
const state = {
	isStopped: false,
	isGameOver: false,
	isError: false,
	actionCount: 0,
	variables: {},
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

	resetState(runtime.globalVars.level, true);

	setupAvailableCommands(runtime);
	setupAvailableRepeatExpressions(runtime);
	setupAvailableWhileExpressions(runtime);
}

/**
 * 
 * @param {number} level 
 */
function resetState(level, resetVariables = true) {
	state.isStopped = false;
	state.isGameOver = false;
	state.isError = false;
	state.actionCount = 0;
	
	if (resetVariables) {
		state.variables = {...levelVariables[level]};
	}
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

	top.updateLevel(0);
	top.container.logCodeBlocks();
	top.expand();
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
	const excludedShadows = []

	for (const shadowChild of codeBlock.children()) {
		if (shadowChild.objectType.name === "CodeBlockShadow") {
			excludedShadows.push(shadowChild.uid);
		}
	}

	const pickedShadow = codeBlockShadows.filter((s) => s.layer.isSelfAndParentsInteractive)
		.sort((a, b) => {
			const squaredDistanceA = getSquaredDistance(codeBlock, a);
			const squaredDistanceB = getSquaredDistance(codeBlock, b);

			return squaredDistanceA - squaredDistanceB;
		})
		.find((s) => !excludedShadows.includes(s.uid));

	if (pickedShadow) {
		return pickedShadow.uid;
	} else {
		return 0;
	}
}

/**
 * 
 * @param {CommandsContainer} containers 
 */
function resetContainerLength(containers) {
	containers.filter((c) => c.layer.isSelfAndParentsInteractive)
		.forEach((c) => {
			c.expand();
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

	parent.expand(codeBlockShadow.width, true);
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

function getVariables() {
	return Object.entries(state.variables)
			.map(([key, value]) => `${key}: ${value}`)
			.join("\n");
}

/**
 * 
 * @param {IRuntime} runtime 
 * @returns {number}
 */
function getCodeBlockCount(runtime) {
	let count = runner.getCount();

	count += runtime.objects.ExpressionsContainer.getAllInstances()
		.reduce((acc, curr) => acc + curr.getCount(), 0);

	return count;
}

const AVAILABLE_COMMANDS_MARGIN = 16;
const COMMAND_WIDTH = 96;
const COMMAND_HEIGHT = 96;

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupAvailableCommands(runtime) {
	const level = runtime.globalVars.level;
	
	const availableCommands = levelAvailableCodeBlocks[level].commands;

	const scrollable = getInstanceById(runtime.objects.ScrollablePanel, "available-commands")

	const minLength = scrollable.instVars.initialLength;
	const x = scrollable.x + (scrollable.width - COMMAND_WIDTH)/2;
	let y = scrollable.y + 3 * AVAILABLE_COMMANDS_MARGIN + COMMAND_HEIGHT/2;

	for (const command of availableCommands) {
		createCodeBlockButton(
			runtime.objects.CodeBlockButton,
			"AvailableCommandList",
			x,
			y,
			command,
			scrollable,
		);

		y += COMMAND_HEIGHT + AVAILABLE_COMMANDS_MARGIN;
	}

	scrollable.height = Math.max(minLength, y - scrollable.y - AVAILABLE_COMMANDS_MARGIN);
	scrollable.instVars.min = scrollable.y - (scrollable.height - minLength);
}

const AVAILABLE_EXPRESSION_MARGIN = 16;
const EXPRESSION_WIDTH = 72;
const EXPRESSION_HEIGHT = 72;

/**
 * 
 * @param {IObjectClass<ICodeBlockButton>} codeBlockButtonObject
 * @param {IWorldInstance} parent 
 * @param {string} layer 
 * @param {import("./level-data.js").CodeBlockDefinition[]} definitions 
 */
function setupExpressions(codeBlockButtonObject, parent, layer, definitions) {
	const minLength = parent.instVars.initialLength;
	const x1 = parent.x + (parent.width - 2 * EXPRESSION_WIDTH - AVAILABLE_EXPRESSION_MARGIN)/2;
	const x2 = x1 + EXPRESSION_WIDTH + AVAILABLE_EXPRESSION_MARGIN;

	let x = x1;
	let y = parent.y + 3 * AVAILABLE_EXPRESSION_MARGIN + EXPRESSION_HEIGHT/2;

	for (const expression of definitions) {
		createCodeBlockButton(
			codeBlockButtonObject,
			layer,
			x,
			y,
			expression,
			parent,
		);

		if (x === x1) {
			x = x2;
		} else {
			x = x1;
			y += EXPRESSION_HEIGHT + AVAILABLE_EXPRESSION_MARGIN;
		}
	}

	if (x === x2) {
		y += EXPRESSION_HEIGHT + AVAILABLE_EXPRESSION_MARGIN;
	}

	parent.height = Math.max(minLength, y - parent.y - AVAILABLE_EXPRESSION_MARGIN/2);
	parent.instVars.min = parent.y - (parent.height - minLength);
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
		"RepeatPopUpCodeBlocks",
		availableRepeatExpressions,
	);
}

/**
 * 
 * @param {IRuntime} runtime 
 */
function setupAvailableWhileExpressions(runtime) {
	const level = runtime.globalVars.level;

	const availableWhileExpressions = levelAvailableCodeBlocks[level].whileExpressions;

	if (availableWhileExpressions.length === 0) {
		return;
	}

	const scrollable = getInstanceById(runtime.objects.ScrollablePanel, "available-while-expressions");

	setupExpressions(
		runtime.objects.CodeBlockButton,
		scrollable,
		"WhilePopUpCodeBlocks",
		availableWhileExpressions,
	);
}



const scriptsInEvents = {

	async Game_es_Event9_Act2(runtime, localVars)
	{
		removeCodeBlock(
			runtime.objects.CodeBlock.getFirstPickedInstance()
		);
	},

	async Game_es_Event10_Act1(runtime, localVars)
	{
		resetContainerLength(
			runtime.objects.CodeBlockContainer.getAllInstances()
		);
	},

	async Game_es_Event14_Act1(runtime, localVars)
	{
		addCodeBlock(
			runtime.objects.CodeBlock.getFirstPickedInstance(), 
			runtime.objects.CodeBlockShadow.getFirstPickedInstance()
		);
	},

	async Game_es_Event31_Act1(runtime, localVars)
	{
		const pickedUid = pickCodeBlockShadowToShow(
			runtime.objects.CodeBlock.getFirstPickedInstance(), 
			runtime.objects.CodeBlockShadow.getPickedInstances()
		);
		
		runtime.setReturnValue(pickedUid);
	},

	async Game_es_Event33_Act4(runtime, localVars)
	{
		expandCodeBlockShadowContainer(
			runtime.objects.CodeBlockShadow.getFirstPickedInstance()
		);
	},

	async Game_es_Event36_Act2(runtime, localVars)
	{
		resetContainerLength(
			runtime.objects.CodeBlockContainer.getAllInstances()
		);
	},

	async Game_es_Event42_Act1(runtime, localVars)
	{
		runtime.objects.CodeBlock.getFirstPickedInstance().setActive(localVars.active);
	},

	async Game_es_Event51_Act1(runtime, localVars)
	{
		pickedCommand = runtime.objects.CodeBlock.getFirstPickedInstance();
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event54_Act1(runtime, localVars)
	{
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event56_Act1(runtime, localVars)
	{
		const condition = runtime.objects.ExpressionsContainer
			.getFirstPickedInstance().evaluate();
		pickedCommand.setCondition(condition);
	},

	async Game_es_Event57_Act1(runtime, localVars)
	{
		pickedCommand = null;
	},

	async Game_es_Event66_Act1(runtime, localVars)
	{
		pickedCommand = runtime.objects.CodeBlock.getFirstPickedInstance();
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event69_Act1(runtime, localVars)
	{
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event71_Act1(runtime, localVars)
	{
		const condition = runtime.objects.ExpressionsContainer
			.getFirstPickedInstance().evaluate();
		pickedCommand.setCondition(condition);
	},

	async Game_es_Event72_Act1(runtime, localVars)
	{
		pickedCommand = null;
	},

	async Game_es_Event73_Act1(runtime, localVars)
	{
		runtime.setReturnValue(
			runtime.objects.CodeBlock
				.getFirstPickedInstance()
				.getWidthOnLevel(localVars.blockLevel)
		);
	},

	async Game_es_Event123_Act1(runtime, localVars)
	{
		runtime.setReturnValue(getVariables());
	},

	async Game_es_Event133_Act1(runtime, localVars)
	{
		const collision = runtime.objects.MovingEnemyCollision
			.getFirstPickedInstance();
		const checkpoint = runtime.objects.MovingEnemyCheckpoint
			.getFirstPickedInstance();
		
		const id = checkpoint.instVars.id;
		const valid = collision.instVars.validIds
			.split("|").indexOf(id.toString());
		
		if (valid > -1) {
			collision.instVars.direction = 
				checkpoint.instVars.direction;
		}
	},

	async Game_es_Event137_Act6(runtime, localVars)
	{
		setupLevel(runtime);
	},

	async Game_es_Event139_Act4(runtime, localVars)
	{
		resetState(runtime.globalVars.level, !state.isError);
	},

	async Game_es_Event148_Act1(runtime, localVars)
	{
		console.log("running commands")
		
		resetState(runtime.globalVars.level, true);
		
		runner.run(runtime.objects.Player.getFirstInstance(), state)
	},

	async Game_es_Event149_Act1(runtime, localVars)
	{
		console.log("stopping commands")
		
		state.isStopped = true;
	},

	async Game_es_Event157_Act6(runtime, localVars)
	{
		const {
			level,
			username,
			actionCount,
			codeBlockCount,
			levelTimer,
		} = runtime.globalVars;
		
		try {
			console.log(await leaderboard.addToLeaderboard(
				level,
				username,
				actionCount,
				codeBlockCount,
				Math.round(levelTimer * 1000, 3),
			))
		} catch(error) {
			runtime.callFunction("AddToLeaderboardError")
		}
	},

	async Game_es_Event158_Act1(runtime, localVars)
	{
		runtime.globalVars.codeBlockCount = 
			getCodeBlockCount(runtime);
		runtime.setReturnValue(runtime.globalVars.codeBlockCount);
	},

	async Game_es_Event159_Act1(runtime, localVars)
	{
		runtime.globalVars.actionCount = state.actionCount;
		runtime.setReturnValue(runtime.globalVars.actionCount);
	},

	async Game_es_Event165_Act1(runtime, localVars)
	{
		state.isGameOver = true;
	},

	async Game_es_Event166_Act1(runtime, localVars)
	{
		if (state.variables.health === undefined) {
			return;
		}
		
		state.variables.health -= runtime.objects.Damaging
			.getFirstPickedInstance().instVars.damage;
			
		if (state.variables.health <= 0) {
			state.isError = true;
		}
		
	},

	async Game_es_Event170_Act1(runtime, localVars)
	{
		runtime.callFunction("PlayerShoot", 0);
		runtime.callFunction("PlayerShoot", 90);
		runtime.callFunction("PlayerShoot", 180);
		runtime.callFunction("PlayerShoot", 270);
	},

	async Menu_es_Event15_Act3(runtime, localVars)
	{
		parent.postMessage({
			name: "leaderboard-created",
		});
	},

	async Menu_es_Event18_Act1(runtime, localVars)
	{
		const {
			leaderboardLevel,
			page,
			sortBy,
			ascending,
		} = localVars;
		
		const data = await leaderboard.getLeaderboard(
			leaderboardLevel,
			page,
			5,
			sortBy,
			ascending ? "asc" : "desc",
		);
		
		parent.postMessage({
			name: "leaderboard-data",
			value: data,
		});
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

