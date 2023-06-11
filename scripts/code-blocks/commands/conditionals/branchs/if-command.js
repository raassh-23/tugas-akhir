import { FINISHED, ERROR, CONDITION_NOT_MET } from "../../../code-block-constants.js";
import { startCommmand, waitUnlessStopped } from "../../../code-block-utils.js";
import ConditionalCommand from "../conditional-command.js";

/**
 * @extends ConditionalCommand
 */
export default class IfCommand extends ConditionalCommand {
    /**
     * 
     * @param {string} name 
     */
    constructor(name = "If") {
        super(name, "false");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const cleanedCondition = this._condition
            .replace(/&/g, 'and')
            .replace(/\|/g, 'or')
            .replace(/ ! /g, ' not ')
            .replace(/ = /g, ' == ')
            .replace(/%/g, 'mod')
            .replace(/x/g, '*');

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
                this._text.text = this._condition;

                return this.checkCollisions(player, state);
            },
        });

        if (waitResult !== FINISHED) {
            return waitResult;
        }

        if (!evaluatedCondition) {
            return CONDITION_NOT_MET;
        }

        const result = await super.run(player, state);

        if (result !== FINISHED) {
            return result;
        }

        return FINISHED;
    }
}
