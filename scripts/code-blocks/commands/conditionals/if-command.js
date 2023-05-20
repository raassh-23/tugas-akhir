import { FINISHED, ERROR } from "../../code-block-constants.js";
import { waitUnlessStopped } from "../../code-block-utils.js";
import ConditionalCommand from "./conditional-command.js";

/**
 * @extends ConditionalCommand
 */
export default class IfCommand extends ConditionalCommand {
    constructor() {
        super("If", "false");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const cleanedCondition = this._condition
            .replace(/&/g, 'and')
            .replace(/\|/g, 'or')
            .replace(/ ! /g, ' not ')
            .replace(/%/g, 'mod')
            .replace(/x/g, '*');

        this.showHighlight(true);
        this.runtime.callFunction("OnCommandStart")

        let evaluatedCondition = false;

        try {
            evaluatedCondition = math.evaluate(cleanedCondition, state.variables);
            evaluatedCondition = !!evaluatedCondition; // convert to boolean
        } catch (error) {
            console.error(error);
            state.isError = true;
            this.showError(true);

            return ERROR
        }

        this._text.text = evaluatedCondition.toString();

        const waitResult = await waitUnlessStopped(state, {
            afterWait: () => {
                this.showHighlight(false);

                return this.checkCollisions(state);
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

        return FINISHED;
    }
}
