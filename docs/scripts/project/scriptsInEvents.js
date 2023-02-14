import {BaseCommand, MoveCommand} from "./Commands/index.js";
import {insertToSortedArray} from "./utils.js";

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


const scriptsInEvents = {

	async Game_es_Event12_Act1(runtime, localVars)
	{
		addToCommands(runtime.objects.Command.getFirstPickedInstance());
		console.log(commands);
		
	},

	async Game_es_Event16_Act4(runtime, localVars)
	{
		removeFromCommands(runtime.objects.Command.getFirstPickedInstance());
		console.log(commands);
	},

	async Game_es_Event19_Act1(runtime, localVars)
	{
		runtime.objects.MoveCommand.getFirstPickedInstance().setDirection();
	},

	async Game_es_Event20_Act1(runtime, localVars)
	{
		console.log("running commands")
		runCommands(runtime.objects.Player.getFirstInstance());
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

