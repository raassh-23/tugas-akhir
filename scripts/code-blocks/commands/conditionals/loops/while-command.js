import { translate } from "../../../../translations/translations.js";
import { FINISHED, ERROR } from "../../../code-block-constants.js";
import { evaluateExpression, startCommmand, waitUnlessStopped } from "../../../code-block-utils.js";
import ConditionalCommand from "../conditional-command.js";

/**
 * @extends ConditionalCommand
 */
export default class WhileCommand extends ConditionalCommand {
    constructor() {
        super("While", "false");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const cleanedCondition = this.getCleanedCondition();

        while (true) {
            this.showHighlight(true);
            startCommmand(this.runtime, player, state);

            let evaluatedCondition = false;

            try {
                const symbols = this.getSymbols(player, state);
                evaluatedCondition = evaluateExpression(cleanedCondition, symbols);
                evaluatedCondition = !!evaluatedCondition; // convert to boolean
            } catch (error) {
                state.isError = true;
                this.showError(true);
                this.runtime.callFunction("ShowError", translate("game.error.invalid-condition"), 2);
    
                return ERROR
            }
            
            this._text.text = evaluatedCondition.toString();

            const waitResult = await waitUnlessStopped(state, {
                afterWait: () => {
                    this.showHighlight(false);
                    this._text.text = this.getCondition();

                    return this.checkCollisions(player, state);
                },
            });

            if (waitResult !== FINISHED) {
                return waitResult;
            }

            if (!evaluatedCondition) {
                return FINISHED;
            }

            const result = await super.run(player, state);

            if (result !== FINISHED) {
                return result;
            }
        }
    }
}
