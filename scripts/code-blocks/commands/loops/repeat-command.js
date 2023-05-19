import { FINISHED, ERROR } from "../../code-block-constants.js";
import { waitUnlessStopped } from "../../code-block-utils.js";
import LoopCommand from "./loop-command.js";

/**
 * @extends LoopCommand
 */
export default class RepeatCommand extends LoopCommand {
    constructor() {
        super("Repeat", "0");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        let repeatCount = 0;
        const cleanedRepeatCondition = this._condition
            .replace(/%/g, 'mod')
            .replace(/x/g, '*');

        try {
            repeatCount = math.evaluate(cleanedRepeatCondition, state.variables);

            if (repeatCount < 0) {
                throw new Error("Repeat count must be positive");
            }
        } catch (error) {
            state.isError = true;
            this.showError(true);

            return ERROR
        }

        this._text.text = repeatCount.toString();

        let i = 0;
        while (true) {
            this.showHighlight(true);
            this.runtime.callFunction("OnCommandStart")
            this._text.text = (repeatCount - i).toString();

            const waitResult = await waitUnlessStopped(state, {
                afterWait: () => {
                    this.showHighlight(false);

                    return this.checkCollisions(state);
                },
            });

            if (waitResult !== FINISHED) {
                return waitResult;
            }

            if (repeatCount <= i++) {
                break;
            }

            const result = await super.run(player, state);

            if (result !== FINISHED) {
                return result;
            }
        }

        return FINISHED;
    }
}
