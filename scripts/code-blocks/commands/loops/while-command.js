import {
    MARGIN,
    FINISHED,
    ERROR,
} from "../../code-block-constants.js";
import { getContainerParent } from "../../../utils/misc.js";
import RunnerCommand from "../runner-command.js";
import { waitUnlessStopped } from "../../code-block-utils.js";
import LoopCommand from "./loop-command.js";

/**
 * @extends LoopCommand
 */
export default class WhileCommand extends LoopCommand {
    constructor() {
        super("While", "false");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const cleanedCondition = this.condition
            .replace(/&/g, 'and')
            .replace(/\|/g, 'or')
            .replace(/ ! /g, ' not ')
            .replace(/%/g, 'mod')
            .replace(/x/g, '*');

        while (true) {
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
            
            this.showHighlight(true);
            this.text.text = evaluatedCondition.toString();

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
