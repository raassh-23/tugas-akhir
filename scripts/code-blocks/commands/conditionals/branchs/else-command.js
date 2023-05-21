import { FINISHED, ERROR } from "../../../code-block-constants.js";
import { waitUnlessStopped } from "../../../code-block-utils.js";
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
        this.runtime.callFunction("OnCommandStart")

        const waitResult = await waitUnlessStopped(state, {
            afterWait: () => {
                this.showHighlight(false);

                return this.checkCollisions(state);
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
