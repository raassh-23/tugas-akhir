import BaseExpression from "./base-expression.js";

const variableName = ["♥", "⁍", "◆"];

/**
 * @extends BaseExpression
 */
export default class VariableExpression extends BaseExpression {
    constructor() {
        super("VariableExpression");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return ` ${variableName[this.animationFrame]} `;
    }
}
