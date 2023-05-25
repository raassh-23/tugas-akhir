import CommandsContainer from "./commands-container.js";
import { MARGIN, FINISHED, PLAYER_REACHED_GOAL } from "../code-block-constants.js";
import { waitUnlessStopped } from "../code-block-utils.js";

/**
 * @extends CommandsContainer
 */
export default class RunnerCommand extends CommandsContainer {
    constructor() {
        super("Runner");

        /**
         * @type {IWorldInstance?}
         */
        this._parent = null;
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const result = await super.run(player, state);

        if (result !== FINISHED && result !== PLAYER_REACHED_GOAL) {
            return result;
        }

        await waitUnlessStopped(state);

        return result;
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0) {
        if (this._parent == null) {
            this._parent = this.getParent();
        }

        const newWidth = 2 * MARGIN + this.width + width
            + this._parent.instVars.initialLength / 2
            + this.container.codeBlocks.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this._parent.instVars.initialLength) {
            this._parent.width = this._parent.instVars.initialLength;
            this._parent.instVars.min = this._parent.instVars.initialMin;
        } else {
            this._parent.width = newWidth;
            this._parent.instVars.min =
                (this._parent.instVars.initialMin + this._parent.instVars.initialLength) - newWidth;
        }
    }

    setSizeBasedOnLevel() {
        let currentX = this.x + this.width;
        this.container.codeBlocks.forEach((command) => {
            command.x = currentX;
            currentX += command.width;
        });
    }

    getWidthOnLevel(level) {
        return this._parent.width;
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.container.codeBlocks
            .forEach((expression) => expression.updateLevel(level + 1));
    }

    /**
     * 
     * @returns {number}
     */
    getCount() {
        return this.container.codeBlocks
            .reduce((acc, command) => acc + command.getCount(), 0);
    }
}
