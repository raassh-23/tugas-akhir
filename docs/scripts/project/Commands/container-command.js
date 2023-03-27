import BaseCommand from "./base-command.js";
import { insertToSortedArray, removeFromArray, emptyArray } from "../utils/array.js";

/**
 * @extends BaseCommand
 */
export default class ContainerCommand extends BaseCommand {
    /**
     * @type {BaseCommand[]}
     */
    commands = [];

    constructor(name) {
        super(name);
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        for (const command of this.commands) {
            await command.run(player);
        }
    }

    /**
     * 
     * @param {BaseCommand} command 
     */
    addCommand(command) {
        if (!(command instanceof BaseCommand)) {
            throw new Error("command must be an instance of BaseCommand");
        }

        insertToSortedArray(command, this.commands, (a, b) => {
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
     */
    removeCommand(command) {
        removeFromArray(command, this.commands);
    }

    emptyCommands() {
        emptyArray(this.commands);
    }
}