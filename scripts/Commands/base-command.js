export default class BaseCommand {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
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