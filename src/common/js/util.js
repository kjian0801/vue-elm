/**
 * 解析URL
 * @example '?id=12345&name=sdkjf'
 * @return {object} {id: 12345, name: sdkjf}
 */
export function urlParse() {
	let object = {};
	let url = window.location.search;
	let reg = /[?&][^?&]+=[^?&]+/g;
	// arr = ['?id=12345', '&name=sdkjf']
	let arr = url.match(reg);
	if (arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			object[key] = val;
		});
	}
	return object;
}
