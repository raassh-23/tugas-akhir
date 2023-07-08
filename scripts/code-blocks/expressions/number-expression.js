import BaseExpression from "./base-expression.js";

/**
 * @extends BaseExpression
 */
export default class NumberExpression extends BaseExpression {
    constructor() {
        super("NumberExpression");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return this.animationFrame;
    }
}
