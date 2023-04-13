import CommandsContainer from "./commands-container.js";
import { MARGIN, MAX_LEVEL, SHRINK_FACTOR } from "../code-block-constants.js";

/**
 * @extends CommandsContainer
 */
export default class RepeatCommand extends CommandsContainer {
    /**
     * @type {number}
     */
    #repeatCount = 0;

    /**
     * @type {number}
     */
    minLength = 0;

    /**
     * @type {number}
     */
    offsetStart = 96;

    /**
     * @type {?IWorldInstance}
     */
    background = null;

    /**
     * @type {?ITextInstance}
     */
    text = null;

    constructor() {
        super("Repeat");

        this.minLength = this.width;

        for (const child of this.children()) {
            if (child.objectType.name === "NestedCodeBlockBackground") {
                this.background = child;
                continue;
            }

            if (child.objectType.name === "CodeBlockText") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.text = child;
                this.text.text = this.#repeatCount.toString();
                continue;
            }

            if (child.objectType.name === "CodeBlockDecoration") {
                if (child.instVars.id === "repeat-icon") {
                    this.offsetStart = child.width;
                }
                
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.highlightedObjects.push(child);
            }
        }
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        for (let i = 0; i < this.#repeatCount; i++) {
            this.text.text = (this.#repeatCount - i - 1).toString();

            await super.run(player);
        }

        this.text.text = this.#repeatCount.toString();
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width) {
        const oldWidth = this.width;
        const commands = this.container.codeBlocks;

        const newWidth = 2 * MARGIN + this.offsetStart + width
            + commands.reduce((acc, command) => acc + command.width, 0);

        if (newWidth <= this.minLength) {
            this.width = this.minLength;
        } else {
            this.width = newWidth;
        }

        this.codeBlockShadows[1].x = this.x + this.width;

        if (this.width < oldWidth) {
            const lastCommand = commands[commands.length - 1];
            if (lastCommand != null) {
                lastCommand.x = this.x + this.width - lastCommand.width - MARGIN;
                lastCommand.instVars.savedX = lastCommand.x;
            }
        }
    }

    /**
     * 
     * @param {number} count must be greater or equal than 0, float will be rounded down
     */
    setRepeatCount(count) {
        if (isNaN(count)) {
            throw new Error("count must be number");
        }

        if (count < 0) {
            throw new Error("count must be greater or equal than 0");
        }

        this.#repeatCount = Math.floor(count);
        this.text.text = this.#repeatCount.toString();
    }

    getRepeatCount() {
        return this.#repeatCount;
    }

    /**
     * 
     * @param {[number, number, number]} color 
     */
    setColor(color) {
        super.setColor(color);
        this.background.colorRgb = color;
    }

    setSizeBasedOnLevel() {
        const multiplier = 1 - (this.level < MAX_LEVEL ?
            SHRINK_FACTOR * (this.level - 1) :
            SHRINK_FACTOR * (MAX_LEVEL - 1));

        this.height = this.savedHeight * multiplier;

        this.highlightedObjects.forEach((object) => {
            object.width = object.savedWidth * multiplier;
            object.height = object.savedHeight * multiplier;

            if (object.instVars.id === "repeat-icon") {
                this.offsetStart = object.width;
            }
        });

        this.text.width = this.text.savedWidth * multiplier;
        this.text.height = this.text.savedHeight * multiplier;

        let currentX = this.x + this.offsetStart + MARGIN;
        this.container.codeBlocks.forEach((command) => {
            command.x = currentX;
            currentX += command.width;
        });

        this.codeBlockShadows[0].x = this.x + this.offsetStart + MARGIN;
        this.codeBlockShadows[1].x = this.x + this.width;
    }

    getWidthOnLevel(level) {
        const childWidth = this.container.codeBlocks.reduce((acc, command) => {
            return acc + command.getWidthOnLevel(level + 1);
        }, 0);

        const finalWidth = 2 * MARGIN + this.offsetStart + childWidth;

        return finalWidth <= this.minLength ? this.minLength : finalWidth;
    }
}
