import {waitForMillisecond} from "../../utils/misc.js";
import { STOPPED, FINISHED } from "../code-block-constants.js";
import BaseCommand from "./base-command.js";

const maxDuration = 750;
const directions = ["left", "up", "right", "down"];
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
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {{isStopped: boolean, variables: {[variable: string]: number}}} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        const direction = directions[this.animationFrame];

		player.behaviors.TileMovement.simulateControl(direction);
        player.angleDegrees = dirToAngle[direction] ?? player.angleDegrees;

        let totalDuration = 0;

        do {
            if (state.isStopped) {
                return STOPPED;
            }

            totalDuration += 50;
            await waitForMillisecond(50);
        } while (player.behaviors.TileMovement.isMoving() || totalDuration < maxDuration);

        return FINISHED;
    }
}
