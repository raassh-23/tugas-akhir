import CommandsContainer from "./commands-container.js";
import { MARGIN } from "../code-block-constants.js";

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
     * @param {{isStopped: boolean}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        if (!this.runtime.globalVars.isRunning) {
            this.runtime.globalVars.isRunning = true;

            const result = await super.run(player, state);

            if (state.isStopped) {
                this.runtime.globalVars.isRunning = false;
                return result;
            }

            this.runtime.globalVars.isRunning = false;
        }

        return 0;
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0) {
        if (this.parent == null) {
            this.parent = this.getParent();
        }

        const newWidth = 2 * MARGIN + this.parent.instVars.initialLength / 2 
            + this.width + width
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
}
