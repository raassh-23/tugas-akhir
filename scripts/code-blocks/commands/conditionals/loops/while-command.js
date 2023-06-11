import { FINISHED, ERROR } from "../../../code-block-constants.js";
import { startCommmand, waitUnlessStopped } from "../../../code-block-utils.js";
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
                const symbols = { ...state.variables, ...state.surrounding };
                evaluatedCondition = math.evaluate(cleanedCondition, symbols);
                evaluatedCondition = !!evaluatedCondition; // convert to boolean
            } catch (error) {
                console.error(error);
                state.isError = true;
                this.showError(true);
                this.runtime.callFunction("ShowError", "Penulisan kondisi salah", 2);
    
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
