import CommandsContainer from "./commands-container.js";
import { MARGIN, FINISHED } from "../code-block-constants.js";

/**
 * @extends CommandsContainer
 */
export default class RunnerCommand extends CommandsContainer {
    /**
     * @type {ISpriteInstance?}
     */
    parent = null;

    constructor() {
        super("Runner");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {{isStopped: boolean, variables: {[variable: string]: number}}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        if (!this.runtime.globalVars.isRunning) {
            this.runtime.globalVars.isRunning = true;

            this.reset();

            const result = await super.run(player, state);

            if (state.isStopped) {
                this.runtime.callFunction("ResetGame");
                return result;
            }

            this.runtime.globalVars.isRunning = false;
            // temp
            this.runtime.callFunction("ResetGame");
        }

        return FINISHED;
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0) {
        if (this.parent == null) {
            this.parent = this.getParent();
        }

        const newWidth = 2 * MARGIN + this.width + width
            + this.parent.instVars.initialLength / 2
            + this.container.codeBlocks.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this.parent.instVars.initialLength) {
            this.parent.width = this.parent.instVars.initialLength;
            this.parent.instVars.min = this.parent.instVars.initialMin;
        } else {
            this.parent.width = newWidth;
            this.parent.instVars.min =
                (this.parent.instVars.initialMin + this.parent.instVars.initialLength) - newWidth;
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
        return this.parent.width;
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.container.codeBlocks
            .forEach((expression) => expression.updateLevel(level + 1));
    }
}