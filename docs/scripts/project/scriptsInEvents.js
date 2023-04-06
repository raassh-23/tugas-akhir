import { BaseCommand, ContainerCommand, RunnerCommand } from "./Commands/index.js";
import { insertToSortedArray, emptyArray, removeFromArray } from "./utils/array.js";
import { getSquaredDistance, getContainerParent } from "./utils/misc.js";

/**
 * @type {?RunnerCommand}
 */
let runner = null;

/**
 * @type {?BaseCommand}
 */
let pickedCommand = null;

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
 * @param {ICodeBlockShadow} codeBlockShadow 
 */
function getTopCodeBlockContainer(codeBlockShadow) {
	let parent = getContainerParent(codeBlockShadow);
	let grandParent = getContainerParent(parent);

	while (grandParent != null) {
		parent = grandParent;
		grandParent = getContainerParent(parent);
	}

	return parent;
}

/**
 * 
 * @param {BaseCommand} codeBlock 
 * @param {ICodeBlockShadow} codeBlockShadow
 */
function addCodeBlock(codeBlock, codeBlockShadow) {
	const top = getTopCodeBlockContainer(codeBlockShadow);
	const addToGrandParent = codeBlockShadow.instVars.addToGrandParent;
	let parent = getContainerParent(codeBlockShadow);

	if (addToGrandParent) {
		parent = getContainerParent(parent);
	}

	parent.addCommand(codeBlock);
	parent.addChild(codeBlock, {
		transformX: true,
		transformY: true,
		destroyWithParent: true,
	});

	top.updateLevel(0);
	top.logCommands();
}

/**
 * 
 * @param {BaseCommand} command 
 */
function removeCodeBlock(command) {
	const parent = getContainerParent(command);

	parent.removeCommand(command);
	command.removeFromParent();

	runner.updateLevel(0);
}

/**
 * 
 * @param {BaseCommand} codeBlock 
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
 * @param {ContainerCommand} containers 
 */
function resetContainerLength(containers) {
	containers.filter((c) => c.layer.isSelfAndParentsInteractive)
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



const scriptsInEvents = {

	async Game_es_Event7_Act1(runtime, localVars)
	{
		setRunner(runtime);
	},

	async Game_es_Event14_Act2(runtime, localVars)
	{
		removeCodeBlock(
			runtime.objects.CodeBlock.getFirstPickedInstance()
		);
	},

	async Game_es_Event15_Act1(runtime, localVars)
	{
		resetContainerLength(
			runtime.objects.CodeBlockContainer.getAllInstances()
		);
	},

	async Game_es_Event19_Act1(runtime, localVars)
	{
		addCodeBlock(
			runtime.objects.CodeBlock.getFirstPickedInstance(), 
			runtime.objects.CodeBlockShadow.getFirstPickedInstance()
		);
	},

	async Game_es_Event27_Act1(runtime, localVars)
	{
		console.log("running commands")
		
		runner.run(runtime.objects.Player.getFirstInstance())
	},

	async Game_es_Event33_Act1(runtime, localVars)
	{
		runtime.objects.MoveCommand.getFirstPickedInstance().setDirection();
	},

	async Game_es_Event35_Act1(runtime, localVars)
	{
		const pickedUid = pickCodeBlockShadowToShow(
			runtime.objects.CodeBlock.getFirstPickedInstance(), 
			runtime.objects.CodeBlockShadow.getPickedInstances()
		);
		
		runtime.setReturnValue(pickedUid);
	},

	async Game_es_Event37_Act4(runtime, localVars)
	{
		expandCodeBlockShadowContainer(
			runtime.objects.CodeBlockShadow.getFirstPickedInstance()
		);
	},

	async Game_es_Event48_Act1(runtime, localVars)
	{
		runtime.objects.CodeBlock.getFirstPickedInstance().setActive(localVars.active);
	},

	async Game_es_Event52_Act1(runtime, localVars)
	{
		pickedCommand = runtime.objects.CodeBlock.getFirstPickedInstance();
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event55_Act1(runtime, localVars)
	{
		localVars.commandUID = pickedCommand.uid;
	},

	async Game_es_Event57_Act1(runtime, localVars)
	{
		const count = runtime.objects.RepeatConditionCommand.getFirstPickedInstance().evaluate();
		pickedCommand.setRepeatCount(count);
	},

	async Game_es_Event58_Act1(runtime, localVars)
	{
		pickedCommand = null;
	},

	async Game_es_Event94_Act1(runtime, localVars)
	{
		logParent(runtime.objects.CodeBlock.getFirstPickedInstance())
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

