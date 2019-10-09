import fly from '../utils/fly.js'
// 根据电影Id查找电影
export function findFilmById(data) {
	return fly.post("/film/findFilmById", data)
}

// 根据城市和状态查找电影
export function findFilmsByCity(data) {
	return fly.post("/film/findFilmsByCity", data)
}

// 根据关键字查找电影和影院
export function findCinemaOrFilmByKey(data) {
	return fly.post('/film/findCinemaOrFilmByKey', data)
}

// 查找所有电影
export function findAllFilms() {
	return fly.get('/film/findAllFilms')
}

// 根据电影类型查找电影
export function findFilmByType(data) {
	return fly.post('/film/findFilmByType', data)
}

// 修改电影
export function updateFilm(data) {
	return fly.post('/film/updateFilm', data)
}
