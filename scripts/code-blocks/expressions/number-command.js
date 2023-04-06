import BaseExpression from "./base-expression.js";

/**
 * @extends CodeBlock
 */
export default class NumberBlock extends BaseExpression {
    constructor() {
        super("NumberBlock");
    }

    evaluate() {
        return this.animationFrame;
    }
}