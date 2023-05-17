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
    _condition = "0";

    /**
     * @type {string}
     */
    _defaultCondition = "0";

    /**
     * @type {IWorldInstance?}
     */
    _background = null;

    /**
     * @type {ITextInstance?}
     */
    _text = null;

    /**
     * @type {ISpriteInstance}
     */
    _icon = null;

    /**
     * @type {IWorldInstance}
     */
    _popUpButton = null;

    /**
     * 
     * @param {string} name 
     * @param {string} defaultCondition 
     */
    constructor(name, defaultCondition) {
        super(name);

        this._defaultCondition = defaultCondition;
        this._condition = defaultCondition;

        const lowercaseName = name.toLowerCase();

        for (const child of this.children()) {
            if (child.objectType.name === "NestedCodeBlockBackground") {
                this._background = child;
                continue;
            }

            if (child.objectType.name === "CodeBlockText") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this._text = child;
                this._text.text = this._condition;
                continue;
            }

            if (child.objectType.name === "CodeBlockDecoration") {
                if (child.instVars.id === `${lowercaseName}-icon`) {
                    this._icon = child;
                }

                if (child.instVars.id === `${lowercaseName}-pop-up`) {
                    this._popUpButton = child;
                }

                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this._highlightedObjects.push(child);
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

        this._codeBlockShadows[1].x = this.x + this.width;

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
        if (condition === this._condition) {
            return;
        } else if (condition.length === 0) {
            this._condition = this._defaultCondition;
        } else {
            this._condition = condition;
        }

        this.showError(false);
        this._text.text = this._condition.replace(/ /g, '');
    }

    setSizeBasedOnLevel() {
        const multiplier = this.getMultiplier(this.level);

        this._icon.width = this._icon.savedWidth * multiplier;
        this._icon.height = this._icon.savedHeight * multiplier;

        this.height = this.savedHeight * multiplier;
        this.width = this.getWidthOnLevel(this.level);

        this._popUpButton.x = this.x + this._icon.width - this._popUpButton.width / 2 - 10 * multiplier;
        this._popUpButton.y = this.y + 45 * multiplier;

        this._text.x = this._popUpButton.x;
        this._text.y = this._popUpButton.y;

        let currentX = this.x + this._icon.width + MARGIN;
        this.container.codeBlocks.forEach((command) => {
            command.x = currentX;
            currentX += command.width;
        });

        this._codeBlockShadows[0].x = this.x + this._icon.width + MARGIN;
        this._codeBlockShadows[0].height = this.savedHeight * this.getMultiplier(this.level + 1);

        this._codeBlockShadows[1].x = this.x + this.width;
        this._codeBlockShadows[1].height = this.height;
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

        const offsetStart = this._icon.savedWidth * multiplier;

        const finalWidth = 2 * MARGIN + offsetStart + childWidth;

        return finalWidth;
    }

    /**
     * 
     * @param {boolean} show 
     */
    showError(show) {
        this._icon.animationFrame = show ? 1 : 0;

        this._popUpButton.animationFrame = show ? 3 : 2;
    }

    reset(withError) {
        this._text.text = this._condition.replace(/ /g, '');

        super.reset(withError);
    }
}
