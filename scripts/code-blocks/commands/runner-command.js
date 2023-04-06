import CommandsContainer from "./commands-container.js";

/**
 * @extends CommandsContainer
 */
export default class RunnerCommand extends CommandsContainer {
    /**
     * @type {?ISpriteInstance}
     */
    parent = null;

    constructor() {
        super("Runner");
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        if (!this.runtime.globalVars.isRunning) {
            this.runtime.globalVars.isRunning = true;

            await super.run(player);

            this.runtime.globalVars.isRunning = false;
        }
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width) {
        if (this.parent == null) {
            this.parent = this.getParent();
        }

        const newWidth = 2 * this.runtime.globalVars.ACTIVE_COMMAND_MARGIN
            + this.parent.instVars.initialLength / 2 + this.width + width
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
}
