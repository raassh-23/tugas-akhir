import CommandsContainer from "../commands-container.js";
import { MARGIN } from "../../code-block-constants.js";
import { getContainerParent, waitForMilisecond } from "../../../utils/misc.js";

const iconMap = new Map([
    [/♥/g, "health"],
    [/⁍/g, "ammo"],
    [/◆/g, "gem"],
    [/→/g, "right"],
    [/←/g, "left"],
    [/↑/g, "up"],
    [/↓/g, "down"],
    [/↘/g, "lowerright"],
    [/↙/g, "lowerleft"],
    [/↖/g, "upperleft"],
    [/↗/g, "upperright"],
    [/·/g, "center"],
]);

/**
 * @extends CommandsContainer
 */
export default class ConditionalCommand extends CommandsContainer {
    /**
     * 
     * @param {string} name 
     * @param {string} defaultCondition 
     */
    constructor(name, defaultCondition) {
        super(name);

        /**
         * @type {string}
         */
        this._condition = defaultCondition;

        /**
         * @type {string}
         */
        this._defaultCondition = defaultCondition;

        /**
         * @type {IWorldInstance?}
         */
        this._background = null;

        /**
         * @type {ITextInstance?}
         */
        this._text = null;

        /**
         * @type {ISpriteInstance?}
         */
        this._icon = null;

        /**
         * @type {IWorldInstance?}
         */
        this._popUpButton = null;

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
                this._text.text = this.getCondition();
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
    expand(width = 0) {
        this.width = this.getWidthOnLevel(this.level) + width;

        // FIXME: This is really hacky, but it works for now.
        // the properties of child in a hierarchy is not updated immediately
        // so we need to wait for a milisecond before we can update the shadow
        // to be able to shift blocks correctly 
        waitForMilisecond(1).then(() => {
            this._codeBlockShadows[1].x = this.x + this.width;
        }).catch((error) => { console.log(error); });

        this._codeBlockProtrusions[1].x = this.x + this.width;

        const parent = getContainerParent(this);

        if (parent != null) {
            parent.expand(width);
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

        this.setText({ text: this.getCondition() });
    }

    getCondition() {
        return this._condition.replace(/\s+/g, '');
    }

    getCleanedCondition() {
        let replacedIcon = this._condition;

        for (const [regex, value] of iconMap) {
            replacedIcon = replacedIcon.replace(regex, value);
        }

        return replacedIcon
            .replace(/&/g, 'and')
            .replace(/\|/g, 'or')
            .replace(/ ! /g, ' not ')
            .replace(/ = /g, ' == ')
            .replace(/%/g, 'mod')
            .replace(/x/g, '*');
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../../for-events.js").GameState} state 
     */
    getSymbols(player, state) {
        const variableNames = this.runtime.globalVars.variableNames.split("|");
        const variables = {};

        for (const variableName of variableNames) {
            variables[variableName] = player.instVars[variableName];
        }

        return { ...variables, ...state.surrounding };
    }

    setSizeBasedOnLevel() {
        const multiplier = this.getMultiplier(this.level);

        this._icon.width = this._icon.savedWidth * multiplier;
        this._icon.height = this._icon.savedHeight * multiplier;

        this.height = this.savedHeight * multiplier;
        this.width = this.getWidthOnLevel(this.level);

        this.setPopUpButton({
            x: this.x + this._icon.width - this._popUpButton?.width / 2 - 10 * multiplier,
            y: this.y + 45 * multiplier,
        });

        this.setText({
            x: this._popUpButton?.x ?? this.x + this._icon.width + MARGIN,
            y: this._popUpButton?.y ?? this.y + 45 * multiplier,
        });

        let currentX = this.x + this._icon.width + MARGIN;
        this.container.codeBlocks.forEach((command) => {
            command.x = currentX;
            currentX += command.width;
        });

        this._codeBlockShadows[0].x = this.x + this._icon.width + MARGIN;
        this._codeBlockShadows[0].height = this.savedHeight * this.getMultiplier(this.level + 1);

        this._codeBlockShadows[1].x = this.x + this.width;
        this._codeBlockShadows[1].height = this.savedHeight * this.getMultiplier(this.level);

        this._codeBlockProtrusions.forEach((protrusion) => {
            protrusion.width = protrusion.savedWidth * multiplier;
            protrusion.height = protrusion.savedHeight * multiplier;
        });

        this._codeBlockProtrusions[0].x = this.x;
        this._codeBlockProtrusions[1].x = this.x + this.width;
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

        if (this._popUpButton != null) {
            this._popUpButton.animationFrame = show ? 3 : 2;
        }
    }

    reset() {
        this.setText({ text: this._condition.replace(/\s+/g, '') });

        super.reset();
    }

    /**
     * 
     * @param {{ text: string, x: number, y: number }} parameter 
     */
    setText({ text, x, y } = {}) {
        if (this._text != null) {
            this._text.text = text ?? this._text.text;
            this._text.x = x ?? this._text.x;
            this._text.y = y ?? this._text.y;
        }
    }

    /**
     * 
     * @param {{x: number, y: number}} param0 
     */
    setPopUpButton({ x, y } = {}) {
        if (this._popUpButton != null) {
            this._popUpButton.x = x ?? this._popUpButton.x;
            this._popUpButton.y = y ?? this._popUpButton.y;
        }
    }

    /**
     * 
     * @param {boolean} show 
     */
    showHighlight(show) {
        super.showHighlight(show);

        this._codeBlockProtrusions?.[1]?.effects?.forEach((effect) => effect.isActive = false);
    }
}
