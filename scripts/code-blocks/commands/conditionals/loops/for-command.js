import { translate } from "../../../../translations/translations.js";
import { setPlayerSurrounding } from "../../../../utils/misc.js";
import { FINISHED, ERROR } from "../../../code-block-constants.js";
import { evaluateExpression, startCommmand, waitUnlessStopped } from "../../../code-block-utils.js";
import ConditionalCommand from "../conditional-command.js";

/**
 * @extends ConditionalCommand
 */
export default class ForCommand extends ConditionalCommand {
    constructor() {
        super("For", "0");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        let forCount = 0;
        const cleanedForCondition = this.getCleanedCondition();

        try {
            setPlayerSurrounding(player, state);
            const symbols = this.getSymbols(player, state);
            forCount = evaluateExpression(cleanedForCondition, symbols);

            if (forCount < 0) {
                throw new Error("For condition must be positive");
            }
        } catch (error) {
            state.isError = true;
            this.showError(true);
            this.runtime.callFunction("ShowError", translate("game.error.invalid-condition"), 2);

            return ERROR
        }

        this._text.text = forCount.toString();

        let i = 0;
        while (true) {
            this.showHighlight(true);
            startCommmand(this.runtime, player, state);
            this._text.text = (forCount - i).toString();

            const waitResult = await waitUnlessStopped(state, {
                afterWait: () => {
                    this.showHighlight(false);

                    return this.checkCollisions(player, state);
                },
            });

            if (waitResult !== FINISHED) {
                return waitResult;
            }

            if (forCount <= i++) {
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
