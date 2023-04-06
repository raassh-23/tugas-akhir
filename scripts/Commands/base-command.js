/**
 * @extends ISpriteInstance
 */
export default class BaseCommand extends ISpriteInstance {
    /**
     * @type {ISpriteInstance[]}
     */
    highlightedObjects = [];

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        super();
        this.name = name;
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        throw new Error("Abstract Method");
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

            if (child instanceof BaseCommand) {
                child.instVars.isActive = isActive;
            }
        });
    }
}