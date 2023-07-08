import BaseExpression from "./base-expression.js";

const operators = [
    "+", "-", "x", "/", 
    "%", "(", ")", "=", 
    "!=", ">", ">=", "<", 
    "<=", "&", "|", "!",
];

/**
 * @extends BaseExpression
 */
export default class OperatorExpression extends BaseExpression {
    constructor() {
        super("OperatorExpression");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return ` ${operators[this.animationFrame]} `;
    }
}
