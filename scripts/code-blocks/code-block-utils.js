import { setPlayerSurrounding, waitForMilisecond } from "../utils/misc.js";
import {
    CHECK_INTERVAL, CONTINUE, DURATION,
    ERROR, FINISHED, STOPPED,
} from "./code-block-constants.js";

/**
 * @typedef {import("../for-events").GameState} GameState
 */

/**
 * 
 * @param {GameState} state 
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

/**
 * 
 * @param {import("./commands/base-command.js").default} command 
 * @param {string} lastName 
 * @param {number} lastResult 
 * @returns {number}
 */
export function checkElseValid(command, lastName, lastResult) {
    if (command.name !== "Else" && command.name !== "Elif") {
        return FINISHED;
    }

    if ((lastName !== "If" && lastName !== "Elif") || lastName === "Else") {
        command.showError(true);

        return ERROR;
    }

    if (lastResult === FINISHED) {
        return CONTINUE;
    }

    return FINISHED;
}

/**
 * 
 * @param {IRuntime} runtime
 * @param {IPlayer} player 
 * @param {GameState} state
 */
export function startCommmand(runtime, player, state) {
    state.actionCount++;

    runtime.callFunction("OnCommandStart");

    setPlayerSurrounding(player, state);
}
