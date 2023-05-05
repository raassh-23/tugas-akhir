import BaseCommand from "./base-command.js";
import CodeBlocksContainer from "../code-blocks-container.js";
import { clamp } from "../../utils/misc.js";
import { FINISHED, GAME_OVER } from "../code-block-constants.js";

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
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        for (const command of this.container.codeBlocks) {
            command.showHighlight(true);

            const result = await command.run(player, state);

            command.showHighlight(false);

            if (result !== FINISHED) {
                return result;
            }

            if (state.isGameOver) {
                return GAME_OVER;
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

    /**
     * 
     * @returns {number}
     */
    getCount() {
        return 1 + this.container.codeBlocks
                .reduce((acc, command) => acc + command.getCount(), 0);
    }
}
