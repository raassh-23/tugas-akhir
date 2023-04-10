/**
 * @extends ISpriteInstance
 */
export default class CodeBlock extends ISpriteInstance {
    /**
     * @type {ISpriteInstance[]}
     */
    highlightedObjects = [];

    codeBlockShadows = [];

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super();
        this.name = name;
        this.highlightedObjects.push(this);

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
    setCommandShadowsLevel(level) {
        this.codeBlockShadows.forEach((shadow) => {
            shadow.instVars.level = level + shadow.instVars.relativeLevelToParent;
        });
    }
}
