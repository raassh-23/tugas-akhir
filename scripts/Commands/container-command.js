import BaseCommand from "./base-command.js";
import { insertToSortedArray, removeFromArray, emptyArray } from "../utils/array.js";
import { clamp } from "../utils/misc.js";

/**
 * @extends BaseCommand
 */
export default class ContainerCommand extends BaseCommand {
    /**
     * @type {BaseCommand[]}
     */
    commands = [];
    #color = [0, 0, 0];
    level = 0;

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

    expand(width) {
        throw new Error("Abstract Method");
    }

    setColor(color) {
        this.#color = color;
    }

    getColor() {
        return [...this.#color];
    }

    updateLevel(level) {
        this.level = level;

        this.commands.filter(command => command instanceof ContainerCommand)
            .forEach(command => command.updateLevel(level + 1));

        // linear growth
        // const colorValue = clamp(1 - (level - 1) * 0.1, 0.2, 1);

        // logarithmic growth
        const colorValue = clamp(1 - Math.log10(level) + 0.15, 0.2, 1);

        this.setColor([colorValue, colorValue, colorValue]);
    }
}