import fly from '../utils/fly.js'
// 根据Id查找厅
export function findHallById(data) {
	return fly.post("/hall/findHallById", data)
}
