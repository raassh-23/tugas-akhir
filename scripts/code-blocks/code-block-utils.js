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

        if (!state.isPaused) {
            totalDuration += checkInterval;
        }

        await waitForMilisecond(checkInterval);
    } while (totalDuration < duration || extraCondition() || state.isPaused);

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
    state.stepCount++;

    runtime.callFunction("OnCommandStart");

    setPlayerSurrounding(player, state);
}

/**
 * 
 * @param {MathExpression} expression 
 * @param {object} scope 
 * 
 * @returns {number}
 */
export function evaluateExpression(expression, scope = {}) {
	const node = math.parse(expression);

	node.traverse((node, path, parent) => {
		if ((node.type === 'OperatorNode')) {
			if ((node.op === '*') && (node['implicit'])) {
				throw new Error('Invalid syntax: Implicit multiplication found');
			}
		}
	});

	const code = node.compile();
	
	return code.evaluate(scope);
}
