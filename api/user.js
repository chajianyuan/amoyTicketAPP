import fly from '../utils/fly.js'
// 登录
export function login(data) {
	return fly.post("/user/login", data)
}
// 注册
export function regist(data) {
	return fly.post("/user/regist", data)
}

// 修改用户信息
export function updateUser(data) {
	return fly.post('/user/updateUser', data)
}
// 根据Id查找用户
export function findUserById(data) {
	return fly.post('/user/findUserById', data)
}
// 微信登录
export function wechatLogin(data) {
	return fly.post('/user/wechatLogin', data)
}
