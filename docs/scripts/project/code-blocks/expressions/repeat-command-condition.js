import { MARGIN } from "../code-block-constants.js";
import CodeBlocksContainer from "../code-blocks-container.js";
import BaseExpression from "./base-expression.js";

/**
 * @extends BaseExpression
 */
export default class RepeatCommandCondition extends BaseExpression {
    /**
     * @type {ISpriteInstance?}
     */
    parent = null;

    /**
     * @type {CodeBlocksContainer}
     */
    container = new CodeBlocksContainer("expression");

    constructor() {
        super("RepeatConditionCommand");
    }

    evaluate() {
        let result = '';

        this.container.codeBlocks.forEach((c) => {
            result += c.evaluate();
        });

        return result;
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0) {
        if (this.parent == null) {
            this.parent = this.getParent();
        }

        const newWidth = 2 * MARGIN + this.width + width
            + this.parent.instVars.initialLength / 2
            + this.container.codeBlocks.reduce((acc, expression) => acc + expression.width, 0);

        if (newWidth <= this.parent.instVars.initialLength) {
            this.parent.width = this.parent.instVars.initialLength;
            this.parent.instVars.min = this.parent.instVars.initialMin;
        } else {
            this.parent.width = newWidth;
            this.parent.instVars.min =
                (this.parent.instVars.initialMin + this.parent.instVars.initialLength) - newWidth;
        }
    }

    setSizeBasedOnLevel() {
        // do nothing
    }

    getWidthOnLevel(level) {
        return this.parent.width;
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.container.codeBlocks
            .forEach((expression) => expression.updateLevel(level + 1));
    }
}
