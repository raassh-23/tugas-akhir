import BaseExpression from "./base-expression.js";

const operators = ["+", "-", "*", "/", "%", "(", ")"];

/**
 * @extends CodeBlock
 */
export default class OperatorBlock extends BaseExpression {
    constructor() {
        super("OperatorBlock");
    }

    evaluate() {
        return operators[this.animationFrame];
    }
}
