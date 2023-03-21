import { BaseCommand, ContainerCommand } from "./Commands/index.js";
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
	
	while (!(parent instanceof ContainerCommand)) {
		parent = parent.getParent();
	}

	parent.addCommand(command);
	parent.addChild(command, {
		transformX: true,
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
		const pickedUid = pickCommandShadowToShow(
			runtime.objects.Command.getFirstPickedInstance(), 
			runtime.objects.CommandShadow.getPickedInstances()
		);
		
		runtime.setReturnValue(pickedUid);
	},

	async Game_es_Event30_Act1(runtime, localVars)
	{
		removeCommand(runtime.objects.Command.getFirstPickedInstance());
		runner.logCommands();
	},

	async Game_es_Event36_Act1(runtime, localVars)
	{
		addCommand(
			runtime.objects.Command.getFirstPickedInstance(), 
			runtime.objects.CommandShadow.getFirstPickedInstance()
		);
		runner.logCommands();
	},

	async Game_es_Event49_Act1(runtime, localVars)
	{
		console.log("running commands")
		
		runner.run(runtime.objects.Player.getFirstInstance())
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

