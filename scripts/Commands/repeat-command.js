import ContainerCommand from "./container-command.js";

/**
 * @extends ContainerCommand
 */
export default class RepeatCommand extends ContainerCommand {
	// TODO: temporaru value, should be set to 0 later
    repeatCount = 2;

    constructor() {
        super("Repeat");
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
        this.width = 2 * this.runtime.globalVars.ACTIVE_COMMAND_MARGIN + 96 + width;
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