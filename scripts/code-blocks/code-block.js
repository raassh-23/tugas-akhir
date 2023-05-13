import { clamp } from "../utils/misc.js";
import { MAX_LEVEL, SHRINK_FACTOR } from "./code-block-constants.js";

/**
 * @extends ISpriteInstance
 */
export default class CodeBlock extends ISpriteInstance {
    /**
     * @type {ISpriteInstance[]}
     */
    highlightedObjects = [];

    /**
     * @type {ICodeBlockShadow[]}
     */
    codeBlockShadows = [];

    /**
     * @type {number}
     */
    level = 0;

    /**
     * @type {number}
     */
    savedWidth = 0;

    /**
     * @type {number}
     */
    savedHeight = 0;

    /**
     * @type {string}
     */
    originalAnimationName = "";

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super();
        this.name = name;
        this.savedWidth = this.width;
        this.savedHeight = this.height;

        // TODO: bug https://github.com/Scirra/Construct-bugs/issues/6997
        // wait for the next stable release
        for (const child of this.children()) {
            if (child.objectType.name === "CodeBlockShadow") {
                child.savedWidth = child.width;
                child.savedHeight = child.height;
                this.codeBlockShadows.push(child);
            }
        }

        this.originalAnimation = this.animationName;
    }

    /**
     * 
     * @param {boolean} show 
     */
    showHighlight(show) {
        this.effects.forEach((effect) => effect.isActive = show);

        this.highlightedObjects.forEach((object) => {
            object.effects.forEach((effect) => effect.isActive = show);
        });
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
    }

    /**
     * 
     * @param {number} level 
     */
    updateLevel(level) {
        this.level = level;
        this.codeBlockShadows.forEach((shadow) => {
            shadow.instVars.level = level + shadow.instVars.relativeLevelToParent;
        });

        this.setSizeBasedOnLevel();
    }

    setSizeBasedOnLevel() {
        const multiplier = this.getMultiplier(this.level);

        this.width = this.savedWidth * multiplier;
        this.height = this.savedHeight * multiplier;

        this.codeBlockShadows[0].x = this.x + this.width;
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
    }

    /**
     * 
     * @param {boolean} withError 
     */
    reset(withError) {
        this.showHighlight(false);

        if (withError) {
            this.showError(false);
        }
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
