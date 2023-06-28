/**
 * @template T
 * @typedef {{
 *   error: boolean,
 *   message: string,
 *   data?: T
 * }} APIResponse
 */

/**
 * @typedef {{
 *  id: number,
 * }} AddToLeaderboardData
 */

/**
 * @typedef {APIResponse<AddToLeaderboardData>} AddToLeaderboardResponse
 */

/**
 * @typedef {{
 *   id: number,
 *   level: number,
 *   username: string,
 *   steps: number,
 *   codeBlocks: number,
 *   timeMs: number,
 *   createdAt: string,
 * }} LeaderboardItem
 */

/**
 * @typedef {{
 *   page: number,
 *   maxPage: number,
 *   count: number,
 *   items: LeaderboardItem[]
 * }} GetLeaderboardData
 */

/**
 * @typedef {APIResponse<GetLeaderboardData>} GetLeaderboardResponse
 */

export default class LeaderboardAPI {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        /**
         * @type {string}
         */
        this._url = url;
    }

    /**
     * 
     * @param {string} path 
     * @param {{[key: string]: string | number}} params
     * @returns 
     */
    _getUrl(path, params = {}) {
        const url = new URL(path, this._url);

        for (const key in params) {
            url.searchParams.append(key, params[key]);
        }

        return url;
    }

    /**
     * 
     * @param {number} level 
     * @param {string} username 
     * @param {number} steps 
     * @param {number} codeBlocks 
     * @param {number} timeMs 
     * @returns {Promise<AddToLeaderboardData>}
     */
    async addToLeaderboard(level, username, steps, codeBlocks, timeMs) {
        const url = this._getUrl("leaderboard");
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                level,
                username,
                steps,
                codeBlocks,
                timeMs,
            })
        });

        if (!response.ok && response.status != 400) {
            throw new Error("Failed to add to leaderboard");
        }

        /** @type {AddToLeaderboardResponse} */
        const json = await response.json();

        if (json.error) {
            throw new Error(json.message);
        }

        return json.data;
    }

    /**
     * 
     * @param {{
     * level: number,
     * page: number,
     * pageSize: number,
     * sortBy: "steps" | "codeBlocks" | "timeMs",
     * order: "asc" | "desc"
     * }} options 
     * @returns {Promise<GetLeaderboardData>}
     */
    async getLeaderboard({
        level, page, pageSize = 5,
        sortBy = "timeMs", order = "asc",
    }) {
        const url = this._getUrl("leaderboard", {
            level,
            page,
            pageSize,
            sortBy,
            order,
        });

        const response = await fetch(url);

        if (!response.ok && response.status != 400) {
            throw new Error("Failed to get leaderboard");
        }

        /** @type {GetLeaderboardResponse} */
        const json = await response.json();

        if (json.error) {
            throw new Error(json.message);
        }

        return json.data;
    }
}
