import BaseCommand from "./base-command.js";
import CodeBlocksContainer from "../code-blocks-container.js";
import { CONDITION_NOT_MET, ERROR, FINISHED, GAME_OVER } from "../code-block-constants.js";

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
        let skip = false;
        let lastCommandName = "";

        for (const command of this.container.codeBlocks) {
            if (command.name === "Else") {
                if (lastCommandName !== "If") {
                    command.showError(true);

                    return ERROR;
                }

                if (skip) {
                    skip = false;
                    
                    continue;
                }
            }

            command.showHighlight(true);

            const result = await command.run(player, state);

            command.showHighlight(false);

            if (command.name === "If" && result === FINISHED) {
                skip = true;
            }

            if (result !== FINISHED && result !== CONDITION_NOT_MET) {
                return result;
            }

            if (state.isGameOver) {
                return GAME_OVER;
            }

            lastCommandName = command.name;
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

    /**
     * 
     * @param {boolean} withError 
     */
    reset(withError) {
        super.reset(withError);

        this.container.codeBlocks.forEach((command) => command.reset(withError));
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
