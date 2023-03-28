import { BaseCommand, ContainerCommand, RunnerCommand } from "./Commands/index.js";
import { insertToSortedArray, emptyArray, removeFromArray } from "./utils/array.js";
import { getSquaredDistance, getContainerParent } from "./utils/misc.js";

let runner = null;
let pickedCommand = null;

const colors = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 1],
];
let currentColorIndex = 0;

function getColor() {
	const color = colors[currentColorIndex];
	currentColorIndex = (currentColorIndex + 1) % colors.length;
	return color;
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
}

/**
 * 
 * @param {BaseCommand} command 
 */
function removeCommand(command) {
	const parent = getContainerParent(command);

	parent.removeCommand(command);
	command.removeFromParent();
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
