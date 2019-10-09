import fly from '../utils/fly.js'
// 根据用户和电影查看记录
export function findMyFilmByFilmIdUserId(data) {
	return fly.post('/myFilm/findMyFilmByFilmIdUserId', data)
}

// 添加
export function addMyFilm(data) {
	return fly.post('/myFilm/addMyFilm', data)
}

// 删除记录
export function deleteMyFilm(data) {
	return fly.post('/myFilm/deleteMyFilm', data)
}

// 根据用户Id查找
export function findFilmByUserId(data) {
	return fly.post('/myFilm/findFilmByUserId', data)
}

// 修改记录
export function updateMyFilm(data) {
	return fly.post('/myFilm/updateMyFilm', data)
}
