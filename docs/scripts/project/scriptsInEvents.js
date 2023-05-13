import {
	CodeBlock,
	CommandsContainer,
	RunnerCommand,
} from "./code-blocks/index.js";
import levelVariables from "./level-variables.js";
import { 
	getSquaredDistance,
	getContainerParent,
	getTopCodeBlockContainer,
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

	resetState(runtime.globalVars.level);
}

/**
 * 
 * @param {number} level 
 */
function resetState(level) {
	state.isStopped = false;
	state.isGameOver = false;
	state.actionCount = 0;
	state.variables = levelVariables[level] ?? {};
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

	async Game_es_Event28_Act1(runtime, localVars)
	{
		const pickedUid = pickCodeBlockShadowToShow(
			runtime.objects.CodeBlock.getFirstPickedInstance(), 
			runtime.objects.CodeBlockShadow.getPickedInstances()
		);
		
		runtime.setReturnValue(pickedUid);
	},

	async Game_es_Event30_Act4(runtime, localVars)
	{
		expandCodeBlockShadowContainer(
			runtime.objects.CodeBlockShadow.getFirstPickedInstance()
		);
	},

	async Game_es_Event33_Act2(runtime, localVars)
	{
		resetContainerLength(
			runtime.objects.CodeBlockContainer.getAllInstances()
		);
	},

	async Game_es_Event39_Act1(runtime, localVars)
	{
		runtime.objects.CodeBlock.getFirstPickedInstance().setActive(localVars.active);
	},

	async Game_es_Event48_Act1(runtime, localVars)
	{
		pickedCommand = runtime.objects.CodeBlock.getFirstPickedInstance();
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event51_Act1(runtime, localVars)
	{
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event53_Act1(runtime, localVars)
	{
		const condition = runtime.objects.RepeatCommandCondition
			.getFirstPickedInstance().evaluate();
		pickedCommand.setRepeatCondition(condition);
	},

	async Game_es_Event54_Act1(runtime, localVars)
	{
		pickedCommand = null;
	},

	async Game_es_Event55_Act1(runtime, localVars)
	{
		runtime.setReturnValue(
			runtime.objects.CodeBlock
				.getFirstPickedInstance()
				.getWidthOnLevel(localVars.blockLevel)
		);
	},

	async Game_es_Event105_Act1(runtime, localVars)
	{
		runtime.setReturnValue(getVariables());
	},

	async Game_es_Event109_Act6(runtime, localVars)
	{
		setupLevel(runtime);
	},

	async Game_es_Event117_Act1(runtime, localVars)
	{
		state.isGameOver = true;
	},

	async Game_es_Event121_Act1(runtime, localVars)
	{
		console.log("running commands")
		
		resetState(runtime.globalVars.level);
		
		runner.run(runtime.objects.Player.getFirstInstance(), state)
	},

	async Game_es_Event122_Act1(runtime, localVars)
	{
		console.log("stopping commands")
		
		state.isStopped = true;
	},

	async Game_es_Event129_Act6(runtime, localVars)
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

	async Game_es_Event130_Act1(runtime, localVars)
	{
		runtime.globalVars.codeBlockCount = 
			getCodeBlockCount(runtime);
		runtime.setReturnValue(runtime.globalVars.codeBlockCount);
	},

	async Game_es_Event131_Act1(runtime, localVars)
	{
		runtime.globalVars.actionCount = state.actionCount;
		runtime.setReturnValue(runtime.globalVars.actionCount);
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

