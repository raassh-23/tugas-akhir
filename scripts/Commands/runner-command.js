import ContainerCommand from "./container-command.js";

/**
 * @extends ContainerCommand
 */
export default class RunnerCommand extends ContainerCommand {
    parent = null;

    constructor() {
        super("Runner");
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        console.log("before ", this.runtime.globalVars.isRunning);
        if (!this.runtime.globalVars.isRunning) {
            this.runtime.globalVars.isRunning = true;

            await super.run(player);

            this.runtime.globalVars.isRunning = false;
        }
    }

    expand(width) {
        if (this.parent == null) {
            this.parent = this.getParent();
        }

        const newWidth = 2 * this.runtime.globalVars.ACTIVE_COMMAND_MARGIN
            + this.parent.instVars.initialLength / 2 + this.width + width
            + this.commands.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this.parent.instVars.initialLength) {
            this.parent.width = this.parent.instVars.initialLength;
            this.parent.instVars.min = this.parent.instVars.initialMin;
        } else {
            this.parent.width = newWidth;
            this.parent.instVars.min =
                (this.parent.instVars.initialMin + this.parent.instVars.initialLength) - newWidth;
        }
    }

    logCommands() {
        console.log(this.commands);
    }
}