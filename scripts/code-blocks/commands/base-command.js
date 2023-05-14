import { ERROR, FINISHED } from "../code-block-constants.js";
import CodeBlock from "../code-block.js";

/**
 * @extends CodeBlock
 */
export default class BaseCommand extends CodeBlock {
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
        throw new Error("Abstract Method");
    }

    /**
     * 
     * @param {import("../../for-events.js").GameState} state 
     * @returns 
     */
    checkCollisions(state) {
        this.runtime.callFunction("CheckCollisions");

        if (state.isError) {
            this.showError(true);
            return ERROR;
        }

        return FINISHED;
    }
}
