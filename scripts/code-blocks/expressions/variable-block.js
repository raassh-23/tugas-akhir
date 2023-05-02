import BaseExpression from "./base-expression.js";

const variableName = ["health", "ammo"];

/**
 * @extends CodeBlock
 */
export default class VariableBlock extends BaseExpression {
    constructor() {
        super("VariableBlock");
    }

    evaluate() {
        return variableName[this.animationFrame];
    }
}
