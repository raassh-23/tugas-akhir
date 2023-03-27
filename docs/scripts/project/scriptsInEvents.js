import { BaseCommand, ContainerCommand, RunnerCommand } from "./Commands/index.js";
import { insertToSortedArray, emptyArray, removeFromArray } from "./utils/array.js";
import { getSquaredDistance } from "./utils/misc.js";

let runner = null;
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
		destroyWithParent: true,
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

	async Game_es_Event10_Act1(runtime, localVars)
	{
		setRunner(runtime);
	},

	async Game_es_Event13_Act1(runtime, localVars)
	{
		runtime.objects.MoveCommand.getFirstPickedInstance().setDirection();
	},

	async Game_es_Event14_Act1(runtime, localVars)
	{
		runtime.objects.RepeatCommand.getFirstPickedInstance().setColor(getColor());
	},

	async Game_es_Event15_Act1(runtime, localVars)
	{
		const pickedUid = pickCommandShadowToShow(
			runtime.objects.Command.getFirstPickedInstance(), 
			runtime.objects.CommandShadow.getPickedInstances()
		);
		
		runtime.setReturnValue(pickedUid);
	},

	async Game_es_Event17_Act4(runtime, localVars)
	{
		expandCommandShadow(
			runtime.objects.CommandShadow.getFirstPickedInstance()
		);
	},

	async Game_es_Event31_Act2(runtime, localVars)
	{
		removeCommand(
			runtime.objects.Command.getFirstPickedInstance()
		);
		runner.logCommands();
	},

	async Game_es_Event33_Act1(runtime, localVars)
	{
		resetContainerLength(
			runtime.objects.ContainerCommand.getAllInstances()
		);
	},

	async Game_es_Event37_Act1(runtime, localVars)
	{
		addCommand(
			runtime.objects.Command.getFirstPickedInstance(), 
			runtime.objects.CommandShadow.getFirstPickedInstance()
		);
		runner.logCommands();
	},

	async Game_es_Event40_Act5(runtime, localVars)
	{
		const command = runtime.objects.Command.getFirstPickedInstance();
		const children = [];
		for (const child of command.allChildren()) {
			children.push(child);
		}
		
		children.sort((a, b) => {
			if (a.zIndex < b.zIndex) {
				return -1;
			} else if (a.zIndex > b.zIndex) {
				return 1;
			} else {
				return 0;
			}
		});
		
		children.forEach((child) => {
			child.blendMode = "source-atop";
			child.moveToLayer(
				runtime.layout.getLayer("ActiveCommandList")
			);
			
			if (child instanceof BaseCommand) {
				child.instVars.isActive = true;
			}
		});
	},

	async Game_es_Event41_Act4(runtime, localVars)
	{
		const command = runtime.objects.Command.getFirstPickedInstance();
		const children = [];
		for (const child of command.allChildren()) {
			children.push(child);
		}
		
		children.sort((a, b) => {
			if (a.zIndex < b.zIndex) {
				return -1;
			} else if (a.zIndex > b.zIndex) {
				return 1;
			} else {
				return 0;
			}
		});
		
		children.forEach((child) => {
			child.blendMode = "normal";
			child.moveToLayer(runtime.layout.getLayer("UI"));
			
			if (child instanceof BaseCommand) {
				child.instVars.isActive = false;
			}
		});
	},

	async Game_es_Event42_Act1(runtime, localVars)
	{
		console.log("running commands")
		
		runner.run(runtime.objects.Player.getFirstInstance())
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

