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
 * @param {ICommandShadow} commandShadow 
 */
function getTopCommandContainer(commandShadow) {
	let parent = getContainerParent(commandShadow);
	let grandParent = getContainerParent(parent);

	while (grandParent != null) {
		parent = grandParent;
		grandParent = getContainerParent(parent);
	}

	return parent;
}

/**
 * 
 * @param {BaseCommand} command 
 * @param {ICommandShadow} commandShadow
 */
function addCommand(command, commandShadow) {
	const top = getTopCommandContainer(commandShadow);
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
 * @param {BaseCommand} command 
 * @param {ICommandShadow[]} commandShadows 
 * @returns {number} uid of command shadow to show, 0 if no command shadow to show
 */
function pickCommandShadowToShow(command, commandShadows) {
	const excludedShadows = []

	for (const shadowChild of command.children()) {
		if (shadowChild.objectType.name === "CommandShadow") {
			excludedShadows.push(shadowChild.uid);
		}
	}

	const pickedShadow = commandShadows.filter((s) => s.layer.isSelfAndParentsInteractive)
		.sort((a, b) => {
			const squaredDistanceA = getSquaredDistance(command, a);
			const squaredDistanceB = getSquaredDistance(command, b);

			if (squaredDistanceA < squaredDistanceB) {
				return -1;
			} else if (squaredDistanceA > squaredDistanceB) {
				return 1;
			} else {
				return 0;
			}
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
 * @param {ICommandShadow} commandShadow 
 */
function expandCommandShadowContainer(commandShadow) {
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
