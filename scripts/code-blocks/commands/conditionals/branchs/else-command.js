import { FINISHED, ERROR } from "../../../code-block-constants.js";
import { startCommmand, waitUnlessStopped } from "../../../code-block-utils.js";
import ConditionalCommand from "../conditional-command.js";

/**
 * @extends ConditionalCommand
 */
export default class ElseCommand extends ConditionalCommand {
    constructor() {
        super("Else", "true");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        this.showHighlight(true);
        startCommmand(this.runtime, player, state);

        const waitResult = await waitUnlessStopped(state, {
            afterWait: () => {
                state.actionCount++;
                this.showHighlight(false);

                return this.checkCollisions(player, state);
            },
        });

        if (waitResult !== FINISHED) {
            return waitResult;
        }

        const result = await super.run(player, state);

        if (result !== FINISHED) {
            return result;
        }

        return FINISHED;
    }
}
