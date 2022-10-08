import {waitForMillisecond} from "./utils.js";

export class BaseCommand {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        this.name = name
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
        throw new Error("Not implemented")
    }
}

export class MoveCommand extends BaseCommand {
    /**
     * 
     * @param {"left" | "right" | "up" | "down"} direction 
     */
    constructor(direction) {
        super("Move")
		this.direction = direction
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