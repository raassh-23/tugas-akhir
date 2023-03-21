import ContainerCommand from "./container-command.js";

/**
 * @extends ContainerCommand
 */
export default class RunnerCommand extends ContainerCommand {
    #isRunning = false;

    constructor() {
        super("Runner");
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        if (!this.#isRunning) {
            this.#isRunning = true;

            super.run(player);

            this.#isRunning = false;
        }
    }

    logCommands() {
        console.log(this.commands);
    }
}