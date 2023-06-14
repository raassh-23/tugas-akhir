import BaseExpression from "./base-expression.js";

const variableName = ["♥", "⁍", "◆"];

/**
 * @extends BaseExpression
 */
export default class VariableBlock extends BaseExpression {
    constructor() {
        super("VariableBlock");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return ` ${variableName[this.animationFrame]} `;
    }
}
