import CodeBlock from "../code-block.js";

/**
 * @extends CodeBlock
 */
export default class BaseCommand extends CodeBlock {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super(name);
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {{isStopped: boolean, variables: {[variable: string]: number}}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        throw new Error("Abstract Method");
    }
}
