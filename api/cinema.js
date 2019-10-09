import fly from '../utils/fly.js'
// 根据电影院Id查找电影院
export function findCinemaById(data) {
	return fly.post("/cinema/findCinemaById", data)
}
// 根据城市Id查找影院
export function findCinemaByCityId(data){
	return fly .post("/cinema/findCinemaByCityId",data)
}