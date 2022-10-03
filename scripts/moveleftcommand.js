import BaseCommand from "./BaseCommand.js";
import {waitForMillisecond} from "./utils.js";

export default class MoveLeftCommand extends BaseCommand {
    /**
     * 
     * @param {string} name 
     */
    constructor() {
        super("MoveLeft")
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
		player.behaviors.TileMovement.simulateControl("left");

        do {
            await waitForMillisecond(100);
        } while (player.behaviors.TileMovement.isMoving());
    }
}