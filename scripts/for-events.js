import { BaseCommand, ContainerCommand, RunnerCommand } from "./Commands/index.js";
import { insertToSortedArray, emptyArray, removeFromArray } from "./utils/array.js";
import { getSquaredDistance } from "./utils/misc.js";

let runner = null;

/**
 * 
 * @param {IRuntime} runtime 
 */
function setRunner(runtime) {
	runner = runtime.objects.StartCommand.getFirstInstance();

	if (runner === null) {
		throw new Error("cannot find runner");
	}
}

/**
 * 
 * @param {BaseCommand} command 
 * @param {ICommandShadow} commandShadow
 */
function addCommand(command, commandShadow) {
	let parent = commandShadow.getParent();
	const addToGrandParent = commandShadow.instVars.addToGrandParent;
	
	while (!(parent instanceof ContainerCommand)) {
		parent = parent.getParent();
	}

	if (addToGrandParent) {
		do {
			parent = parent.getParent();
		} while (!(parent instanceof ContainerCommand));
	}

	parent.addCommand(command);
	parent.addChild(command, {
		transformX: true,
		transformY: true,
	});
}

/**
 * 
 * @param {BaseCommand} command 
 */
function removeCommand(command) {
	let parent = command.getParent();

	while (!(parent instanceof ContainerCommand)) {
		parent = parent.getParent();
	}

	parent.removeCommand(command);
	command.removeFromParent();
}

/**
 * 
 * @param {BaseCommand} command 
 * @param {Array.<ICommandShadow>} commandShadows 
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
		console.log(container);
		container.expand(0);
	});
}

/**
 * 
 * @param {ICommandShadow} commandShadow 
 */
function expandCommandShadow(commandShadow) {
	let parent = commandShadow.getParent();
	const addToGrandParent = commandShadow.instVars.addToGrandParent;
	
	while (!(parent instanceof ContainerCommand)) {
		parent = parent.getParent();
	}

	if (addToGrandParent) {
		do {
			parent = parent.getParent();
		} while (!(parent instanceof ContainerCommand));
	}

	parent.expand(commandShadow.width);
}

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
