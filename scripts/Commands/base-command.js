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

    setActive(isActive) {
        const layer = this.runtime.layout.getLayer(isActive ? "ActiveCommandList" : "UI");
        const blendMode = isActive ? "source-atop" : "normal";

        this.instVars.isActive = isActive;
        this.moveToLayer(layer);
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

            if (child instanceof BaseCommand) {
                child.instVars.isActive = isActive;
            }
        });
    }
}