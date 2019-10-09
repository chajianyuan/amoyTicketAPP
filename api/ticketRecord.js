import fly from '../utils/fly.js'
// 根据条件查找买票记录
export function findTicketRecordBySessionOrUser(data) {
	return fly.post("/ticketRecord/findTicketRecordBySessionOrUser", data)
}
export function addTicketRecord(data) {
	return fly.post("/ticketRecord/addTicketRecord", data)
}
// 根据Id查找买票记录
export function findTicketRecordById(data) {
	return fly.post("/ticketRecord/findTicketRecordById", data)
}
