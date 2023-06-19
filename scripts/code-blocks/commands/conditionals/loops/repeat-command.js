import { FINISHED, ERROR } from "../../../code-block-constants.js";
import { startCommmand, waitUnlessStopped } from "../../../code-block-utils.js";
import ConditionalCommand from "../conditional-command.js";

/**
 * @extends ConditionalCommand
 */
export default class RepeatCommand extends ConditionalCommand {
    constructor() {
        super("Repeat", "0");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        let repeatCount = 0;
        const cleanedRepeatCondition = this.getCleanedCondition();

        try {
            const symbols = { ...state.variables, ...state.surrounding };
            repeatCount = math.evaluate(cleanedRepeatCondition, symbols);

            if (repeatCount < 0) {
                throw new Error("Repeat count must be positive");
            }
        } catch (error) {
            state.isError = true;
            this.showError(true);
            this.runtime.callFunction("ShowError", translate("game.error.invalid-condition"), 2);

            return ERROR
        }

        this._text.text = repeatCount.toString();

        let i = 0;
        while (true) {
            this.showHighlight(true);
            startCommmand(this.runtime, player, state);
            this._text.text = (repeatCount - i).toString();

            const waitResult = await waitUnlessStopped(state, {
                afterWait: () => {
                    this.showHighlight(false);

                    return this.checkCollisions(player, state);
                },
            });

            if (waitResult !== FINISHED) {
                return waitResult;
            }

            if (repeatCount <= i++) {
                this._text.text = this.getCondition();
                return FINISHED;
            }

            const result = await super.run(player, state);

            if (result !== FINISHED) {
                return result;
            }
        }
    }
}
