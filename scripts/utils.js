/**
 * 
 * @param {Number} ms 
 * @returns {Promise} Promise that resolves after ms milliseconds
 */
export function waitForMillisecond(ms) { 
	console.log("waiting");
	return new Promise(res => setTimeout(res, ms)); 
}

/**
 * 
 * 
 * @callback CompareFunction
 * @param {*} a
 * @param {*} b
 * @returns {Number} -1 if a < b, 0 if a == b, 1 if a > b
 */

/**
 * 
 * @param {*} item 
 * @param {Array} array 
 * @param {CompareFunction} comparer 
 * @returns index of the first element in array that is greater than or equal to item
 */
function findLocationToInsert(item, array, comparer) {
	let low = 0;
	let high = array.length;

	while(low < high) {
		const mid = (low + high) >>> 1;
		if(comparer(array[mid], item) < 0) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

/**
 * 
 * @param {*} item 
 * @param {Array} array 
 * @param {CompareFunction} comparer 
 */
export function insertToSortedArray(item, array, comparer) {
	array.splice(findLocationToInsert(item, array, comparer), 0, item);
}
