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
function getTopCommandContainer(codeBlockShadow) {
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
function addCommand(codeBlock, codeBlockShadow) {
	const top = getTopCommandContainer(codeBlockShadow);
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
function removeCommand(command) {
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
