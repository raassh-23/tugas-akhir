import BaseCommand from "./base-command.js";
import CodeBlocksContainer from "../code-blocks-container.js";
import { clamp } from "../../utils/misc.js";
import { FINISHED } from "../code-block-constants.js";

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
     * 
     * @param {string} name 
     */
    constructor(name) {
        super(name);
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {{isStopped: boolean, variables: {[variable: string]: number}}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        for (const command of this.container.codeBlocks) {
            command.showHighlight(true);

            const result = await command.run(player, state);

            command.showHighlight(false);

            if (state.isStopped) {
                return result;
            }
        }

        return FINISHED;
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0) {
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
        this.container.codeBlocks
            .forEach((command) => command.updateLevel(level + 1));

        super.updateLevel(level);

        const colorValue = clamp(1 - Math.log10(level) + 0.15, 0.2, 1);

        this.setColor([colorValue, colorValue, colorValue]);

        console.log(this.name, level, colorValue, this.codeBlockShadows);
    }

    reset() {
        super.reset();

        this.container.codeBlocks.forEach((command) => command.reset());
    }
}
