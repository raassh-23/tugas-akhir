import { waitForMilisecond } from "../../utils/misc.js";
import { CHECK_INTERVAL, DURATION, ERROR, FINISHED, STOPPED } from "../code-block-constants.js";
import BaseCommand from "./base-command.js";

const directionToAngle = {
    "right": 0,
    "down": 90,
    "left": 180,
    "up": 270,
}

/**
 * @extends CodeBlock
 */
export default class ShootCommand extends BaseCommand {
    constructor() {
        super("Shoot");
    }

    /**
     * 
     * @param {IPlayer} player 
     * @param {import("../../for-events.js").GameState} state
     * 
     * @returns {Promise<number>}
     */
    async run(player, state) {
        if (state.variables.ammo != undefined) {
            if (state.variables.ammo <= 0) {
                state.isError = true;
                this.showError(true);
                return ERROR;
            }

            state.variables.ammo--;
        }

        const dir = player.animationName;
        const angle = directionToAngle[dir] ?? 0;
        
        this.runtime.callFunction("PlayerShoot", angle);

        let totalDuration = 0;
        do {
            if (state.isStopped) {
                return STOPPED;
            }

            totalDuration += CHECK_INTERVAL;
            await waitForMilisecond(CHECK_INTERVAL);
        } while (totalDuration < DURATION);

        return FINISHED;
    }
}
