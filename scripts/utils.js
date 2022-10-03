export function waitForMillisecond(ms) { 
	console.log("waiting");
	return new Promise(res => setTimeout(res, ms)); 
}