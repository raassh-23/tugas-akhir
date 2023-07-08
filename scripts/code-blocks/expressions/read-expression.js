import BaseExpression from "./base-expression.js";

const directions = [
    "←", "↑", "→", "↓",
    "↖", "↗", "↘", "↙", 
    "·",
];

/**
 * @extends BaseExpression
 */
export default class ReadExpression extends BaseExpression {
    constructor() {
        super("ReadExpression");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return ` ${directions[this.animationFrame]} `;
    }
}
