import BaseCommand from "./base-command.js";
import CodeBlocksContainer from "../code-blocks-container.js";
import { clamp } from "../../utils/misc.js";

/**
 * @extends BaseCommand
 */
export default class CommandsContainer extends BaseCommand {
    /**
     * @type {CodeBlocksContainer}
     */
    container = new CodeBlocksContainer("command");

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
        for (const command of this.container.codeBlocks) {
            command.showHighlight(true);
            await command.run(player);
            command.showHighlight(false);
        }
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

        this.container.codeBlocks.forEach((command) => {
                command.setCommandShadowsLevel(level);

                if (command instanceof CommandsContainer) {
                    command.updateLevel(level + 1)
                }
            });

        const colorValue = clamp(1 - Math.log10(level) + 0.15, 0.2, 1);

        this.setColor([colorValue, colorValue, colorValue]);
    }
}
