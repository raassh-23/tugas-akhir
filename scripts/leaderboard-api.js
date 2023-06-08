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
 *   actions: number,
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
     * @param {number} actions 
     * @param {number} codeBlocks 
     * @param {number} timeMs 
     * @returns {Promise<AddToLeaderboardData>}
     */
    async addToLeaderboard(level, username, actions, codeBlocks, timeMs) {
        const url = this._getUrl("leaderboard");
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                level,
                username,
                actions,
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
     * @param {number} level 
     * @param {number} page 
     * @param {number} pageSize 
     * @param {"actions" | "codeBlocks" | "timeMs"} sortBy 
     * @param {"asc" | "desc"} order 
     * @returns {Promise<GetLeaderboardData>}
     */
    async getLeaderboard(level, page, pageSize, sortBy, order) {
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
