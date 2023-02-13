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
        throw new Error("Not implemented");
    }
}