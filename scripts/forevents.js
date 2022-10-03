// Construct 3 quirk
// All subfolders for scripts are flattened
import BaseCommand from "./BaseCommand.js";
import MoveLeftCommand from "./MoveLeftCommand.js";

const commands = []

/**
 * 
 * @param {BaseCommand} command 
 */
function addToCommands(command) {
	commands.push(command);
}

/**
 * 
 */
function emptyCommands() {
	commands.length = 0
}

/**
 * 
 * @param {IPlayer} player 
 */
async function runCommands(player) {
	for (const command of commands) {
		await command.run(player);
	}
}