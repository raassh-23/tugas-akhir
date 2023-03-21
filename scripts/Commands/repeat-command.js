import ContainerCommand from "./container-command.js";

/**
 * @extends ContainerCommand
 */
export default class RepeatCommand extends ContainerCommand {
    repeatCount = 1;

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