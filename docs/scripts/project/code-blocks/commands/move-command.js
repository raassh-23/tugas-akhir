import {waitForMillisecond} from "../../utils/misc.js";
import { STOPPED } from "../code-block-constants.js";
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
     * @param {{isStopped: boolean}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
		player.behaviors.TileMovement.simulateControl(this.direction);
        player.angleDegrees = dirToAngle[this.direction] ?? player.angleDegrees;

        let totalDuration = 0;

        do {
            if (state.isStopped) {
                return STOPPED;
            }

            totalDuration += 50;
            await waitForMillisecond(50);
        } while (player.behaviors.TileMovement.isMoving() || totalDuration < maxDuration);

        return 0;
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
