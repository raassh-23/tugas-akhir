/**
 * @extends ISpriteInstance
 */
export default class BaseCommand extends ISpriteInstance {
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

        children.sort((a, b) => {
            if (a.zIndex < b.zIndex) {
                return -1;
            } else if (a.zIndex > b.zIndex) {
                return 1;
            } else {
                return 0;
            }
        });

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