import { MARGIN } from "../code-block-constants.js";
import CodeBlocksContainer from "../code-blocks-container.js";
import BaseExpression from "./base-expression.js";

/**
 * @extends BaseExpression
 */
export default class ExpressionsContainer extends BaseExpression {
    constructor() {
        super("ExpressionContainer");

        /**
         * @type {IWorldInstance?}
         */
        this._parent = null;

        /**
        * @type {CodeBlocksContainer}
        */
        this.container = new CodeBlocksContainer("expression");
    }

    /**
     * 
     * @returns {string}
     */
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
        if (this._parent == null) {
            this._parent = this.getParent();
        }

        const newWidth = 2 * MARGIN + this.width + width
            + this._parent.instVars.initialLength / 2
            + this.container.codeBlocks.reduce((acc, expression) => acc + expression.width, 0);

        if (newWidth <= this._parent.instVars.initialLength) {
            this._parent.width = this._parent.instVars.initialLength;
            this._parent.instVars.min = this._parent.instVars.initialMin;
        } else {
            this._parent.width = newWidth;
            this._parent.instVars.min =
                (this._parent.instVars.initialMin + this._parent.instVars.initialLength) - newWidth;
        }
    }

    setSizeBasedOnLevel() {
        // do nothing
    }

    getWidthOnLevel(level) {
        return this._parent.width;
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.container.codeBlocks
            .forEach((expression) => expression.updateLevel(level + 1));
    }

    /**
     * 
     * @returns {number}
     */
    getCount() {
        return this.container.codeBlocks
                .reduce((acc, expression) => acc + expression.getCount(), 0);
    }
}
