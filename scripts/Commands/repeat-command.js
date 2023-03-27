import ContainerCommand from "./container-command.js";

const offsetLength = 96;

/**
 * @extends ContainerCommand
 */
export default class RepeatCommand extends ContainerCommand {
    // TODO: temporary value, should be set to 0 later
    repeatCount = 2;
    minLength = 0;

    childToBeShift = null;
    background = null;

    constructor() {
        super("Repeat");

        this.minLength = this.width;

        for (const child of this.children()) {
            if (child.instVars?.shouldShift) {
                this.childToBeShift = child;
                continue;
            }

            if (child.objectType.name === "NestedCommandBackground") {
                this.background = child;
            }
        }
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        for (let i = 0; i < this.repeatCount; i++) {
            await super.run(player);
        }
    }

    expand(width) {
        const oldWidth = this.width;

        const newWidth = 2 * this.runtime.globalVars.ACTIVE_COMMAND_MARGIN + offsetLength + width
            + this.commands.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this.minLength) {
            this.width = this.minLength;
        } else {
            this.width = newWidth;
        }

        this.childToBeShift.x = this.x + this.width;
        
        if (this.width < oldWidth) {
            const lastCommand = this.commands[this.commands.length - 1];
            if (lastCommand != null) {
                lastCommand.x = this.x + this.width - lastCommand.width - this.runtime.globalVars.ACTIVE_COMMAND_MARGIN;
                lastCommand.instVars.savedX = lastCommand.x;
            }
        }
    }

    /**
     * 
     * @param {number} count must be greater or equal than 0, float will be rounded down
     */
    setRepeatCount(count) {
        if (count < 0) {
                throw new Error("count must be greater or equal than 0");
        }

        this.repeatCount = Math.floor(count);
    }

    setColor(color) {
        super.setColor(color);
        this.background.colorRgb = color;
    }
}