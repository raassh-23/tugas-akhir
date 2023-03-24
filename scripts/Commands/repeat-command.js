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

    constructor() {
        super("Repeat");

        this.minLength = this.width;

        for (const child of this.children()) {
            if (child?.instVars?.shouldShift) {
                this.childToBeShift = child;
                break;
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
        const newWidth = 2 * this.runtime.globalVars.ACTIVE_COMMAND_MARGIN + offsetLength + width
            + this.commands.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this.minLength) {
            this.width = this.minLength;
        } else {
            this.width = newWidth;
        }

        this.childToBeShift.x = this.x + this.width;
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
}