import BaseCommand from "./base-command.js";
import CodeBlock from "../code-block.js";
import { insertToSortedArray, removeFromArray, emptyArray } from "../../utils/array.js";
import { clamp } from "../../utils/misc.js";

/**
 * @extends BaseCommand
 */
export default class ContainerCommand extends BaseCommand {
    /**
     * @type {CodeBlock[]}
     */
    commands = [];

    /**
     * @type {[number, number, number]}
     */
    #color = [0, 0, 0];

    /**
     * @type {number}
     */
    level = 0;

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super(name);
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        for (const command of this.commands) {
            command.showHighlight(true);
            await command.run(player);
            command.showHighlight(false);
        }
    }

    /**
     * 
     * @param {CodeBlock} command 
     */
    addCommand(command) {
        if (!(command instanceof CodeBlock)) {
            throw new Error("command must be an instance of BaseCommand");
        }

        insertToSortedArray(command, this.commands, (a, b) => a.x - b.x);
    }

    /**
     * 
     * @param {CodeBlock} command
     */
    removeCommand(command) {
        removeFromArray(command, this.commands);
    }

    emptyCommands() {
        emptyArray(this.commands);
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width) {
        throw new Error("Abstract Method");
    }

    /**
     * 
     * @param {[number, number, number]} color 
     */
    setColor(color) {
        this.#color = color;
    }

    getColor() {
        return [...this.#color];
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.level = level;

        this.commands.filter(command => command instanceof ContainerCommand)
            .forEach(command => command.updateLevel(level + 1));

        const colorValue = clamp(1 - Math.log10(level) + 0.15, 0.2, 1);

        this.setColor([colorValue, colorValue, colorValue]);
    }

    logCommands() {
        console.log(this.commands);
    }
}