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

	count += runtime.objects.RepeatCommandCondition.getAllInstances()
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

const AVAILABLE_REPEAT_EXPRESSION_MARGIN = 16;
const REPEAT_EXPRESSION_WIDTH = 72;
const REPEAT_EXPRESSION_HEIGHT = 72;

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

	const minLength = scrollable.instVars.initialLength;
	const x1 = scrollable.x + (scrollable.width - 2 * REPEAT_EXPRESSION_WIDTH - AVAILABLE_REPEAT_EXPRESSION_MARGIN)/2;
	const x2 = x1 + REPEAT_EXPRESSION_WIDTH + AVAILABLE_REPEAT_EXPRESSION_MARGIN;

	let x = x1;
	let y = scrollable.y + 3 * AVAILABLE_REPEAT_EXPRESSION_MARGIN + REPEAT_EXPRESSION_HEIGHT/2;

	for (const repeatExpression of availableRepeatExpressions) {
		createCodeBlockButton(
			runtime.objects.CodeBlockButton,
			"RepeatPopUpCodeBlocks",
			x,
			y,
			repeatExpression,
			scrollable,
		);

		if (x === x1) {
			x = x2;
		} else {
			x = x1;
			y += REPEAT_EXPRESSION_HEIGHT + AVAILABLE_REPEAT_EXPRESSION_MARGIN;
		}
	}

	console.log(`y ${y} scrollable.y ${scrollable.y}`);

	scrollable.height = Math.max(minLength, y - scrollable.y + 5 * AVAILABLE_REPEAT_EXPRESSION_MARGIN);
	scrollable.instVars.min = scrollable.y - (scrollable.height - minLength);
}
