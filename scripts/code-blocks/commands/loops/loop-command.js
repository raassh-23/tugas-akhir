import CommandsContainer from "../commands-container.js";
import { MARGIN } from "../../code-block-constants.js";
import { getContainerParent } from "../../../utils/misc.js";
import RunnerCommand from "../runner-command.js";

/**
 * @extends CommandsContainer
 */
export default class LoopCommand extends CommandsContainer {
    /**
     * @type {string}
     */
    condition = "0";

    /**
     * @type {string}
     */
    #defaultCondition = "0";

    /**
     * @type {IWorldInstance?}
     */
    background = null;

    /**
     * @type {ITextInstance?}
     */
    text = null;

    /**
     * @type {ISpriteInstance}
     */
    icon = null;

    /**
     * @type {IWorldInstance}
     */
    popUpButton = null;

    /**
     * 
     * @param {string} name 
     * @param {string} defaultCondition 
     */
    constructor(name, defaultCondition) {
        super(name);

        this.#defaultCondition = defaultCondition;
        this.condition = defaultCondition;

        const lowercaseName = name.toLowerCase();

        for (const child of this.children()) {
            if (child.objectType.name === "NestedCodeBlockBackground") {
                this.background = child;
                continue;
            }

            if (child.objectType.name === "CodeBlockText") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.text = child;
                this.text.text = this.condition;
                continue;
            }

            if (child.objectType.name === "CodeBlockDecoration") {
                if (child.instVars.id === `${lowercaseName}-icon`) {
                    this.icon = child;
                }

                if (child.instVars.id === `${lowercaseName}-pop-up`) {
                    this.popUpButton = child;
                }

                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.highlightedObjects.push(child);
            }
        }
    }

    /**
     * 
     * @param {number} width 
     */
    expand(width = 0, shiftLastCommand = false) {
        const oldWidth = this.width;
        const commands = this.container.codeBlocks;

        this.width = this.getWidthOnLevel(this.level) + width;

        this.codeBlockShadows[1].x = this.x + this.width;

        if (this.width < oldWidth && shiftLastCommand) {
            const lastCommand = commands[commands.length - 1];
            if (lastCommand != null) {
                lastCommand.x = this.x + this.width - lastCommand.width - MARGIN;
                lastCommand.instVars.savedX = lastCommand.x;
            }
        }

        const parent = getContainerParent(this);

        if (parent != null && !(parent instanceof RunnerCommand)) {
            parent.expand(width, false);
        }
    }

    /**
     * 
     * @param {string} condition
     */
    setCondition(condition) {
        if (condition === this.condition) {
            return;
        } else if (condition.length === 0) {
            this.condition = this.#defaultCondition;
        } else {
            this.condition = condition;
        }

        this.showError(false);
        this.text.text = this.condition.replace(/ /g, '');
    }

    setSizeBasedOnLevel() {
        const multiplier = this.getMultiplier(this.level);

        this.icon.width = this.icon.savedWidth * multiplier;
        this.icon.height = this.icon.savedHeight * multiplier;

        this.height = this.savedHeight * multiplier;
        this.width = this.getWidthOnLevel(this.level);

        this.popUpButton.x = this.x + this.icon.width - this.popUpButton.width / 2 - 10 * multiplier;
        this.popUpButton.y = this.y + 45 * multiplier;

        this.text.x = this.popUpButton.x;
        this.text.y = this.popUpButton.y;

        let currentX = this.x + this.icon.width + MARGIN;
        this.container.codeBlocks.forEach((command) => {
            command.x = currentX;
            currentX += command.width;
        });

        this.codeBlockShadows[0].x = this.x + this.icon.width + MARGIN;
        this.codeBlockShadows[0].height = this.savedHeight * this.getMultiplier(this.level + 1);

        this.codeBlockShadows[1].x = this.x + this.width;
        this.codeBlockShadows[1].height = this.height;
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

        const multiplier = this.getMultiplier(level);

        const offsetStart = this.icon.savedWidth * multiplier;

        const finalWidth = 2 * MARGIN + offsetStart + childWidth;

        return finalWidth;
    }

    /**
     * 
     * @param {boolean} show 
     */
    showError(show) {
        this.icon.animationFrame = show ? 1 : 0;

        this.popUpButton.animationFrame = show ? 3 : 2;
    }

    reset(withError) {
        this.text.text = this.condition.replace(/ /g, '');

        super.reset(withError);
    }
}
