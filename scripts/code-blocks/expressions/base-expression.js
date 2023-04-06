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

    evaluate() {
        throw new Error("Abstract Method");
    }
}
