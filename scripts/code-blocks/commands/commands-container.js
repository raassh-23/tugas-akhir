import BaseCommand from "./base-command.js";
import CodeBlocksContainer from "../code-blocks-container.js";
import { CONDITION_NOT_MET, CONTINUE, ERROR, FINISHED } from "../code-block-constants.js";
import { checkElseValid } from "../code-block-utils.js";
import { translate } from "../../translations/translations.js";

/**
 * @extends BaseCommand
 */
export default class CommandsContainer extends BaseCommand {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super(name);

        /**
         * @type {CodeBlocksContainer}
         */
        this.container = new CodeBlocksContainer("command");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        let lastCommandName = "";
        let lastResult = FINISHED;

        for (const command of this.container.codeBlocks) {
            const valid = checkElseValid(command, lastCommandName, lastResult);

            if (valid === ERROR) {
                state.isError = true;
                this.runtime.callFunction("ShowError", translate("game.error.else-placement"), 2);

                return ERROR;
            } else if (valid === CONTINUE) {
                lastCommandName = command.name;
                continue;
            }
            
            command.showHighlight(true);

            const result = await command.run(player, state);

            command.showHighlight(false);

            if (result !== FINISHED && result !== CONDITION_NOT_MET) {
                return result;
            }

            lastCommandName = command.name;
            lastResult = result;
        }

        return FINISHED;
    }

    /**
     * 
     * @param {number} width
     */
    expand(width = 0) {
        throw new Error("Abstract Method");
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.container.codeBlocks
            .forEach((command) => command.updateLevel(level + 1));

        super.updateLevel(level);
    }

    reset() {
        super.reset();

        this.container.codeBlocks.forEach((command) => command.reset());
    }

    /**
     * 
     * @returns {number}
     */
    getCount() {
        return 1 + this.container.codeBlocks
                .reduce((acc, command) => acc + command.getCount(), 0);
    }
}
