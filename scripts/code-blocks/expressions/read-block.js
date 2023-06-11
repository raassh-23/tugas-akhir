import BaseExpression from "./base-expression.js";

const directions = [
    "←", "↑", "→", "↓",
    "↖", "↗", "↘", "↙", 
    "·",
];

/**
 * @extends BaseExpression
 */
export default class ReadBlock extends BaseExpression {
    constructor() {
        super("ReadBlock");
    }

    /**
     * 
     * @returns {string}
     */
    evaluate() {
        return ` ${directions[this.animationFrame]} `;
    }
}
