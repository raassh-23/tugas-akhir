/**
 * 
 * @param {Number} ms 
 * @returns {Promise} Promise that resolves after ms milliseconds
 */
export function waitForMillisecond(ms) { 
	console.log("waiting");
	return new Promise(res => setTimeout(res, ms)); 
}
