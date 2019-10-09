import fly from '../utils/fly.js'
// 根据日期和电影查找场次
export function findSessionByDate(data) {
	return fly.post("/session/findSessionByDate", data)
}
// 根据日期、影院Id和电影Id查找场次
export function findSessionByDateCineFilm(data) {
	return fly.post("/session/findSessionByDateCineFilm", data)
}

export function findSessionById(data) {
	return fly.post("/session/findSessionById", data)
}

// 根据影院Id查找场次
export function findSessionByCieamId(data) {
	return fly.post('/session/findSessionByCieamId', data)
}
