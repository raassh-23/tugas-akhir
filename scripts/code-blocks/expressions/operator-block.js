import BaseExpression from "./base-expression.js";

const operators = [
    "+", "-", "x", "/", 
    "%", "(", ")", "==", 
    "!=", ">", ">=", "<", 
    "<=", "&", "|", "!",
];

/**
 * @extends BaseExpression
 */
export default class OperatorBlock extends BaseExpression {
    constructor() {
        super("OperatorBlock");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return ` ${operators[this.animationFrame]} `;
    }
}
