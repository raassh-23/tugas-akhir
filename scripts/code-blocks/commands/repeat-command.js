import CommandsContainer from "./commands-container.js";
import {
    MARGIN,
    MAX_LEVEL,
    SHRINK_FACTOR,
    FINISHED,
    ERROR
} from "../code-block-constants.js";

/**
 * @extends CommandsContainer
 */
export default class RepeatCommand extends CommandsContainer {
    /**
     * @type {string}
     */
    #repeatCondition = "0";

    /**
     * @type {number}
     */
    minLength = 0;

    /**
     * @type {number}
     */
    offsetStart = 96;

    /**
     * @type {IWorldInstance?}
     */
    background = null;

    /**
     * @type {ITextInstance?}
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
                this.text.text = this.#repeatCondition;
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
     * @param {import("../../for-events.js").GameState}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        try {
            const cleanedRepeatCondition = this.#repeatCondition
                .replace(/%/g, 'mod')
                .replace(/x/g, '*');
            const repeatCount = math.evaluate(cleanedRepeatCondition, state.variables);
            this.text.text = repeatCount.toString();

            for (let i = 0; i < repeatCount; i++) {
                this.text.text = (repeatCount - i).toString();

                const result = await super.run(player, state);

                if (result !== FINISHED) {
                    this.text.text = this.#repeatCondition.replace(/ /g, '');
                    return result;
                }
            }

            this.text.text = this.#repeatCondition.replace(/ /g, '');
        } catch (error) {
            console.log(error);
            super.showError(true);

            this.text.text = this.#repeatCondition.replace(/ /g, '');

            return ERROR
        }

        return FINISHED;
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0) {
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
     * @param {string} condition
     */
    setRepeatCondition(condition) {
        if (condition === this.#repeatCondition) {
            return;
        } else if (condition.length === 0) {
            this.#repeatCondition = "0";
        } else {
            this.#repeatCondition = condition;
        }

        super.showError(false);
        this.text.text = this.#repeatCondition.replace(/ /g, '');
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
        let repeatPopUPX = 0;

        this.height = this.savedHeight * multiplier;

        this.highlightedObjects.forEach((object) => {
            object.width = object.savedWidth * multiplier;
            object.height = object.savedHeight * multiplier;

            if (object.instVars.id === "repeat-icon") {
                this.offsetStart = object.width;
            }

            if (object.instVars.id === "repeat-pop-up") {
                object.x = this.x + this.offsetStart - object.width / 2 - 10 * multiplier;
                repeatPopUPX = object.x;
            }
        });

        this.text.width = this.text.savedWidth * multiplier;
        this.text.height = this.text.savedHeight * multiplier;
        this.text.x = repeatPopUPX;

        let currentX = this.x + this.offsetStart + MARGIN;
        this.container.codeBlocks.forEach((command) => {
            command.x = currentX;
            currentX += command.width;
        });

        this.codeBlockShadows[0].x = this.x + this.offsetStart + MARGIN;
        this.codeBlockShadows[1].x = this.x + this.width;
    }

    /**
     * 
     * @param {number} level 
     * @returns {number}
     */
    getWidthOnLevel(level) {
        const childWidth = this.container.codeBlocks.reduce((acc, command) => {
            return acc + command.getWidthOnLevel(level + 1);
        }, 0);

        const finalWidth = 2 * MARGIN + this.offsetStart + childWidth;

        return finalWidth <= this.minLength ? this.minLength : finalWidth;
    }
}
