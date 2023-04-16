import {
	CodeBlock,
	CommandsContainer,
	RunnerCommand,
} from "./code-blocks/index.js";
import { 
	getSquaredDistance,
	getContainerParent,
	getTopCodeBlockContainer,
} from "./utils/misc.js";

/**
 * @type {RunnerCommand?}
 */
let runner = null;

/**
 * @type {CodeBlock?}
 */
let pickedCommand = null;

/**
 * @type {{isStopped: boolean}}
 */
const state = {
	isStopped: false,
}

/**
 * 
 * @param {IRuntime} runtime 
 */
function setRunner(runtime) {
	runner = runtime.objects.StartCommand.getFirstInstance();

	if (runner == null) {
		throw new Error("cannot find runner");
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



const scriptsInEvents = {

	async Game_es_Event2_Act1(runtime, localVars)
	{
		setRunner(runtime);
	},

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

	async Game_es_Event25_Act1(runtime, localVars)
	{
		console.log("running commands")
		
		state.isStopped = false;
		
		runner.run(runtime.objects.Player.getFirstInstance(), state)
	},

	async Game_es_Event26_Act1(runtime, localVars)
	{
		console.log("stopping commands")
		
		state.isStopped = true;
	},

	async Game_es_Event32_Act1(runtime, localVars)
	{
		runtime.objects.MoveCommand.getFirstPickedInstance().setDirection();
	},

	async Game_es_Event34_Act1(runtime, localVars)
	{
		const pickedUid = pickCodeBlockShadowToShow(
			runtime.objects.CodeBlock.getFirstPickedInstance(), 
			runtime.objects.CodeBlockShadow.getPickedInstances()
		);
		
		runtime.setReturnValue(pickedUid);
	},

	async Game_es_Event36_Act4(runtime, localVars)
	{
		expandCodeBlockShadowContainer(
			runtime.objects.CodeBlockShadow.getFirstPickedInstance()
		);
	},

	async Game_es_Event45_Act1(runtime, localVars)
	{
		runtime.objects.CodeBlock.getFirstPickedInstance().setActive(localVars.active);
	},

	async Game_es_Event49_Act1(runtime, localVars)
	{
		pickedCommand = runtime.objects.CodeBlock.getFirstPickedInstance();
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event52_Act1(runtime, localVars)
	{
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event54_Act1(runtime, localVars)
	{
		const count = runtime.objects.RepeatCommandCondition
			.getFirstPickedInstance().evaluate();
		pickedCommand.setRepeatCount(count);
	},

	async Game_es_Event55_Act1(runtime, localVars)
	{
		pickedCommand = null;
	},

	async Game_es_Event56_Act1(runtime, localVars)
	{
		runtime.setReturnValue(
			runtime.objects.CodeBlock
				.getFirstPickedInstance()
				.getWidthOnLevel(localVars.level)
		);
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

