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
     * 
     * @param {string} name 
     */
    constructor(name) {
        super();
        this.name = name;
        this.savedWidth = this.width;
        this.savedHeight = this.height;

        for (const child of this.children()) {
            if (child.objectType.name === "CodeBlockShadow") {
                this.codeBlockShadows.push(child);
            }
        }
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
            shadow.instVars.level = level - 1 + shadow.instVars.relativeLevelToParent;
        });

        this.setSizeBasedOnLevel();
    }

    setSizeBasedOnLevel() {
        const multiplier = this.level < MAX_LEVEL ?
            SHRINK_FACTOR ** (this.level - 1) :
            SHRINK_FACTOR ** (MAX_LEVEL - 1);

        this.width = this.savedWidth * multiplier;
        this.height = this.savedHeight * multiplier;

        this.codeBlockShadows[0].x = this.x + this.width;
    }
}