import { BaseCommand, MoveCommand } from "./Commands/index.js";
import { insertToSortedArray, getSquaredDistance } from "./utils.js";

/**
 *
 * @type {Array.<BaseCommand>}
 */
const commands = [];

/**
 * @type {boolean}
 */
let isRunning = false;

/**
 * 
 * @param {BaseCommand} command 
 */
function addToCommands(command) {
	if (!(command instanceof BaseCommand)) {
		throw new Error("command must be an instance of BaseCommand");
	}

	insertToSortedArray(command, commands, (a, b) => {
		if (a.x < b.x) {
			return -1;
		} else if (a.x > b.x) {
			return 1;
		} else {
			return 0;
		}
	});
}

/**
 * 
 * @param {BaseCommand} command
 * 
 */
function removeFromCommands(command) {
	const index = commands.indexOf(command);

	if (index > -1) {
		commands.splice(index, 1);
	}
}

function emptyCommands() {
	commands.length = 0;
}

/**
 * 
 * @param {IPlayer} player 
 */
async function runCommands(player) {
	if (!isRunning) {
		isRunning = true;

		for (const command of commands) {
			await command.run(player);
		}

		isRunning = false;
	}
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

	async Game_es_Event27_Act5(runtime, localVars)
	{
		removeFromCommands(runtime.objects.Command.getFirstPickedInstance());
		console.log(commands);
	},

	async Game_es_Event34_Act1(runtime, localVars)
	{
		addToCommands(runtime.objects.Command.getFirstPickedInstance());
		console.log(commands);
		
	},

	async Game_es_Event37_Act1(runtime, localVars)
	{
		console.log("running commands")
		runCommands(runtime.objects.Player.getFirstInstance());
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

