import BaseCommand from "./base-command.js";
import CodeBlocksContainer from "../code-blocks-container.js";
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
     * @param {number} level 
     */
    updateLevel(level) {
        this.container.codeBlocks
            .forEach((command) => command.updateLevel(level + 1));

        super.updateLevel(level);
    }

    /**
     * 
     * @param {boolean} withError 
     */
    reset(withError) {
        super.reset(withError);

        this.container.codeBlocks.forEach((command) => command.reset(withError));
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
