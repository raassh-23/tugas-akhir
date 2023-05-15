import { waitForMilisecond } from "../utils/misc.js";
import { CHECK_INTERVAL, DURATION, FINISHED, STOPPED } from "./code-block-constants.js";

/**
 * 
 * @param {import("../for-events").GameState} state 
 * @param {{
 *  extraCondition?: () => boolean,
 *  duration?: number,
 *  checkInterval?: number,
 *  afterWait?: () => number,
 * }} options 
 * @returns {Promise<number>}
 */
export async function waitUnlessStopped(state, {
    extraCondition = () => false,
    duration = DURATION,
    checkInterval = CHECK_INTERVAL,
    afterWait = () => FINISHED,
} = {}) {
    let totalDuration = 0;
    do {
        if (state.isStopped) {
            return STOPPED;
        }

        totalDuration += checkInterval;
        await waitForMilisecond(checkInterval);
    } while (totalDuration < duration || extraCondition());

    return afterWait();
}
