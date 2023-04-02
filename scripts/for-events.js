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
 * @param {BaseCommand} command 
 * @param {ICommandShadow} commandShadow
 */
function addCommand(command, commandShadow) {
	const addToGrandParent = commandShadow.instVars.addToGrandParent;
	let parent = getContainerParent(commandShadow);

	if (addToGrandParent) {
		parent = getContainerParent(parent);
	}

	parent.addCommand(command);
	parent.addChild(command, {
		transformX: true,
		transformY: true,
		destroyWithParent: true,
	});

	runner.updateLevel(0);
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
 * @param {BaseCommand} command 
 * @param {ICommandShadow[]} commandShadows 
 * @returns {number} uid of command shadow to show, 0 if no command shadow to show
 */
function pickCommandShadowToShow(command, commandShadows) {
	const excludedShadows = []

	for (const shadowChild of command.children()) {
		excludedShadows.push(shadowChild.uid);
	}

	commandShadows.sort((a, b) => {
		const squaredDistanceA = getSquaredDistance(command, a);
		const squaredDistanceB = getSquaredDistance(command, b);

		if (squaredDistanceA < squaredDistanceB) {
			return -1;
		} else if (squaredDistanceA > squaredDistanceB) {
			return 1;
		} else {
			return 0;
		}
	});

	const pickedShadow = commandShadows.find(shadow => !excludedShadows.includes(shadow.uid));

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
	containers.forEach(container => {
		container.expand(0);
	});
}

/**
 * 
 * @param {ICommandShadow} commandShadow 
 */
function expandCommandShadow(commandShadow) {
	const addToGrandParent = commandShadow.instVars.addToGrandParent;
	
	let parent = getContainerParent(commandShadow);

	if (addToGrandParent) {
		parent = getContainerParent(parent);
	}

	parent.expand(commandShadow.width);
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
