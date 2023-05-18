import BaseExpression from "./base-expression.js";

/**
 * @extends BaseExpression
 */
export default class NumberBlock extends BaseExpression {
    constructor() {
        super("NumberBlock");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return this.animationFrame;
    }
}
