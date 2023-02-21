import BaseCommand from "./base-command.js";
import { insertToSortedArray, removeFromArray, emptyArray } from "../utils/array.js";

/**
 * @extends BaseCommand
 */
export default class RepeatCommand extends BaseCommand {
    /**
     * @type {Array.<BaseCommand>}
     */
    commands = [];
    repeatCount = 0;

    constructor() {
        super("Repeat");
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        for (let i = 0; i < this.repeatCount; i++) {
            for (const command of this.commands) {
                await command.run(player);
            }
        }
    }

    /**
     * 
     * @param {number} count must be greater or equal than 0, float will be rounded down
     */
    setRepeatCount(count) {
        if (count < 0) {
            throw new Error("count must be greater or equal than 0");
        }

        this.repeatCount = Math.floor(count);
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