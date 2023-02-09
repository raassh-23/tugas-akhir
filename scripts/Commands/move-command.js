import BaseCommand from "./base-command.js";
import {waitForMillisecond} from "../utils.js";

export default class MoveCommand extends BaseCommand {
    /**
     * 
     * @param {"left" | "right" | "up" | "down"} direction 
     */
    constructor(direction) {
        super("Move")
		this.direction = direction;
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
		player.behaviors.TileMovement.simulateControl(this.direction);

        do {
            await waitForMillisecond(100);
        } while (player.behaviors.TileMovement.isMoving());
    }
}