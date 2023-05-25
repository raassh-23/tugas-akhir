import { insertToSortedArray, removeFromArray, emptyArray } from "../utils/array.js";
import BaseCommand from "./commands/base-command.js";
import BaseExpression from "./expressions/base-expression.js";

/**
 * @typedef {import("./code-block.js").default} CodeBlock
 */

export default class CodeBlocksContainer {
    /**
     * 
     * @param {"command" | "expression"} type 
     */
    constructor(type) {
        this._type = type;

        /**
         * @type {CodeBlock[]}
         */
        this.codeBlocks = []
    }

    /**
     * 
     * @param {CodeBlock} codeBlock 
     */
    addCodeBlock(codeBlock) {
        if (this._type === "command" && !(codeBlock instanceof BaseCommand)) {
            throw new Error("codeBlock must be instance of BaseCommand");
        } else if (this._type === "expression" && !(codeBlock instanceof BaseExpression)) {
            throw new Error("codeBlock must be instance of BaseExpression");
        }

        insertToSortedArray(codeBlock, this.codeBlocks, (a, b) => a.x - b.x);
    }

    /**
     * 
     * @param {CodeBlock} codeBlock
     */
    removeCodeBlock(codeBlock) {
        removeFromArray(codeBlock, this.codeBlocks);
    }

    emptyCodeBlocks() {
        emptyArray(this.codeBlocks);
    }

    logCodeBlocks() {
        console.log(this.codeBlocks);
    }

    isLeaf() {
        for (const block of this.codeBlocks) {
            if (block.container != null) {
                return false;
            }
        }

        return true;
    }
}
