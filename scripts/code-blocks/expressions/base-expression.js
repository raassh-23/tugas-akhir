import CodeBlock from "../code-block.js";

/**
 * @extends CodeBlock
 */
export default class BaseExpression extends CodeBlock {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super(name);
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        throw new Error("Abstract Method");
    }
}
