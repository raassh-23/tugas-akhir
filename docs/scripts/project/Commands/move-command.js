import BaseCommand from "./base-command.js";
import {waitForMillisecond} from "../utils.js";

export default class MoveCommand extends BaseCommand {
    constructor() {
        super("Move");
		
		switch (this.animationFrame) {
            case 0:
                this.direction = "left";
                break;
            case 1:
                this.direction = "up";
                break;
            case 2:
                this.direction = "right";
                break;
            case 3:
                this.direction = "down";
                break;
            default:
                throw new Error("Invalid frame");
        }
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