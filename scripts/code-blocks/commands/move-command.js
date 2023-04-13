import {waitForMillisecond} from "../../utils/misc.js";
import BaseCommand from "./base-command.js";

const maxDuration = 750;
const dirToAngle = {
    "right": 0,
    "down": 90,
    "left": 180,
    "up": 270,
};

/**
 * @extends CodeBlock
 */
export default class MoveCommand extends BaseCommand {
    constructor() {
        super("Move");
        this.setDirection();
    }

    /**
     * 
     * @param {IPlayer} player 
     */
    async run(player) {
		player.behaviors.TileMovement.simulateControl(this.direction);
        player.angleDegrees = dirToAngle[this.direction] ?? player.angleDegrees;

        let totalDuration = 0;

        do {
            totalDuration += 50;
            await waitForMillisecond(50);
        } while (player.behaviors.TileMovement.isMoving());

        while (totalDuration < maxDuration) {
            totalDuration += 50;
            await waitForMillisecond(50);
        }
    }

    setDirection() {
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
}
