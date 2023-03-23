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
	const isChild = commandShadow.instVars.isChild;
	
	while (!(parent instanceof ContainerCommand)) {
		parent = parent.getParent();
	}

	if (!isChild && !(parent instanceof RunnerCommand)) {
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
		pickedShadow.width = command.width;

		console.log("test");

		for (const parent of pickedShadow.parents()) {
			if (!(parent instanceof ContainerCommand)) {
				continue;
			}

			parent.expand(pickedShadow.width);

			console.log(parent);
		}

		return pickedShadow.uid;
	} else {
		return 0;
	}
}
