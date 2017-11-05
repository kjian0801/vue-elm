export function formatDate (time, fmt) {
	let date = new Date(time);
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}

	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};

	for (let k in o) {
		if ((new RegExp('(' + k + ')')).test(fmt)) {
			let str = o[k];
			fmt = fmt.replace(RegExp.$1, str > 10 ? str : '0' + str);
			// fmt = fmt.replace(RegExp.$1, str > 10 ? str : padLeftZero(str));
		}
	};

	return fmt;
};

// function padLeftZero(str) {
// 	return ('00' + str).substr(str.length);
// }
