import fly from '../utils/fly.js'
// 查询全部城市
export function getAllCity() {
	return fly.get("/city/getAllCity")
}

// 根据关键字查找城市
export function findCityByKey(data) {
	return fly.post('/city/findCityByKey', data)
}
