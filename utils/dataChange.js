export function getTodayTom(num, str) {
	var today = new Date();
	var nowTime = today.getTime();
	var ms = 24 * 3600 * 1000 * num;
	today.setTime(parseInt(nowTime + ms));
	var oYear = today.getFullYear();
	var oMoth = (today.getMonth() + 1).toString();
	if (oMoth.length <= 1) oMoth = '0' + oMoth;
	var oDay = today.getDate().toString();
	if (oDay.length <= 1) oDay = '0' + oDay;
	return oMoth + str + oDay;
}

export function compare(date) {
	let current = new Date()
	console.log('current', JSON.stringify(current))
	date = date.replace(/-/g, '/');
	let time = new Date(date);
	console.log('time', JSON.stringify(time))
	return time > current
}
