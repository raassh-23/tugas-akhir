import { insertToSortedArray, removeFromArray, emptyArray } from "../utils/array.js";
import BaseCommand from "./commands/base-command.js";
import BaseExpression from "./expressions/base-expression.js";

/**
 * @typedef {import("./code-block.js").default} CodeBlock
 */

export default class CodeBlocksContainer {
    /**
     * @type {CodeBlock[]}
     */
    codeBlocks = [];

    /**
     * 
     * @param {"command" | "expression"} type 
     */
    constructor(type) {
        this.type = type;
    }

    /**
     * 
     * @param {CodeBlock} codeBlock 
     */
    addCodeBlock(codeBlock) {
        if (this.type === "command" && !(codeBlock instanceof BaseCommand)) {
            throw new Error("codeBlock must be instance of BaseCommand");
        } else if (this.type === "expression" && !(codeBlock instanceof BaseExpression)) {
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
}
