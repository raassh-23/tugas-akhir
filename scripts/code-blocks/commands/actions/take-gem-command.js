import { ERROR, FINISHED } from "../../code-block-constants.js";
import { startCommmand, waitUnlessStopped } from "../../code-block-utils.js";
import BaseCommand from "../base-command.js";

/**
 * @extends BaseCommand
 */
export default class TakeGemCommand extends BaseCommand {
    constructor() {
        super("TakeGem");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        startCommmand(this.runtime, player, state);

        const result = this.runtime.callFunction("CheckGemCollisions");

        if (result === FINISHED && state.variables.gem > 0) {
            state.variables.gem--;
        }

        return waitUnlessStopped(state, {
            afterWait: () => {
                return this.checkCollisions(player, state);
            },
        });
    }
}
