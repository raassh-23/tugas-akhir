import { clamp } from "../utils/misc.js";
import { MAX_LEVEL, SHRINK_FACTOR } from "./code-block-constants.js";

/**
 * @extends ISpriteInstance
 */
export default class CodeBlock extends ISpriteInstance {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super();

        /**
         * @type {string}
         */
        this.name = name;

        /**
         * @type {number}
         */
        this.savedWidth = this.width;

        /**
         * @type {number}
         */
        this.savedHeight = this.height;

        /**
         * @type {ICodeBlockShadow[]}
         */
        this._codeBlockShadows = [];

        /**
         * @type {ICodeBlockProtrusion[]}
         */
        this._codeBlockProtrusions = [];

        /**
         * @type {IWorldInstance[]}
         */
        this._highlightedObjects = [];

        for (const child of this.children()) {
            if (child.objectType.name === "CodeBlockShadow") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this._codeBlockShadows.push(child);
            } else if (child.objectType.name === "CodeBlockProtrusion") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this._codeBlockProtrusions.push(child);
            }
        }

        this._codeBlockShadows.sort((a, b) => a.x - b.x);
        this._codeBlockProtrusions.sort((a, b) => a.x - b.x);

        /**
         * @type {number}
         */
        this.level = 0;

        /**
         * @type {string}
         */
        this.originalAnimation = this.animationName;

        /** @type {import("./code-blocks-container.js").default} */
        this.containerParent = null;
    }

    /**
     * 
     * @param {boolean} show 
     */
    showHighlight(show) {
        this.effects.forEach((effect) => effect.isActive = show);

        this._highlightedObjects.forEach((object) => {
            object.effects.forEach((effect) => effect.isActive = show);
        });

        const protrusion0 = this._codeBlockProtrusions[0];
        const protrusion1 = this._codeBlockProtrusions[1];

        protrusion1?.effects?.forEach((effect) => effect.isActive = show);

        if (show) {
            if (!this.containerParent.isCodeBlockFirst(this)) {
                protrusion0?.moveToTop()
            }

            protrusion1?.moveToTop()
        } else {
            this.setActive(this.instVars?.isActive ?? false);
        }
    }

    /**
     * 
     * @param {boolean} isActive 
     */
    setActive(isActive) {
        const layer = this.runtime.layout.getLayer(isActive ? this.instVars.activeLayer : this.instVars.inactiveLayer);
        const blendMode = isActive ? "source-atop" : "normal";

        this.instVars.isActive = isActive;
        this.moveToLayer(layer);
        this.moveToTop();
        this.blendMode = blendMode;

        const children = [];
        for (const child of this.allChildren()) {
            children.push(child);
        }

        children.sort((a, b) => a.zIndex - b.zIndex);

        children.forEach((child) => {
            child.blendMode = blendMode;
            child.moveToLayer(layer);
            child.moveToTop();

            if (child instanceof CodeBlock) {
                child.instVars.isActive = isActive;
            }
        });

        if (!isActive) {
            this._codeBlockProtrusions[0].blendMode = "destination-out";
            this._codeBlockProtrusions[0].moveToTop();
        } else {
            this._codeBlockProtrusions[0].moveToBottom();
        }
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.level = level;
        this._codeBlockShadows.forEach((shadow) => {
            shadow.instVars.level = level + shadow.instVars.relativeLevelToParent;
        });

        this.setSizeBasedOnLevel();
    }

    setSizeBasedOnLevel() {
        const multiplier = this.getMultiplier(this.level);

        this.width = this.savedWidth * multiplier;
        this.height = this.savedHeight * multiplier;

        this._codeBlockShadows[0].x = this.x + this.width;

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
        const multiplier = this.getMultiplier(level);

        return this.savedWidth * multiplier;
    }

    /**
     * 
     * @param {boolean} show 
     */
    showError(show) {
        const newAnimationName = show ?
            `${this.originalAnimation}Error` :
            this.originalAnimation;

        if (this.animation.name === newAnimationName) {
            return
        }

        if (this.getAnimation(newAnimationName) === null) {
            return;
        }

        this.setAnimation(newAnimationName, "current-frame");

        this._codeBlockProtrusions?.[1]?.setAnimation(
            show ? "Error" : "Normal",
            "current-frame",
        );
    }

    /**
     * 
     */
    reset() {
        this.showHighlight(false);
        this.showError(false);
    }

    /**
     * 
     * @returns {number}
     */
    getCount() {
        return 1;
    }

    /**
     * 
     * @param {number} level 
     * @returns {number}
     */
    getMultiplier(level) {
        return clamp(
            1 - (level < MAX_LEVEL ?
                SHRINK_FACTOR * (level - 1) :
                SHRINK_FACTOR * (MAX_LEVEL - 1)),
            0,
            1,
        );
    }
}
