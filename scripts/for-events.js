import {BaseCommand, MoveCommand} from "./Commands/index.js";

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
	if (command instanceof BaseCommand) {
		commands.push(command);
	}
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