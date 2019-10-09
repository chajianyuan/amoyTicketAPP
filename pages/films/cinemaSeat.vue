<template>
	<view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>{{ film.filmName }}</view>
					<view class="text-gray text-sm">{{currentDate}} {{ session.playTime }}~{{session.endTime}}({{film.dimensional}})</view>
				</view>
				<!-- <view class="action text-xxl" @click="goMap(cinema.lng, cinema.lat)"><text class="text-blue icon-location text-xsl"></text></view> -->
			</view>
			<view class="cu-item">
				<view class="content text-center">
					<view class="text-gray text-sm text-xxl">
						<image src="../../static/noseat.png" style="width: 30px;height: 30px;"></image>
						<!-- <radio class="margin-left-sm radio bg-white" :checked="false"></radio> -->
						<text class="text-sm" style="margin-top: -10px;">可选</text>
						<image src="../../static/otherseat.png" style="width: 30px;height: 30px;"></image>
						<text class="text-sm">已售</text>
						<image src="../../static/myseat.png" style="width: 30px;height: 30px;"></image>
						<text class="text-sm">自己</text>
					</view>
				</view>
			</view>
		</view>

		<view>
			<view class="grid col-3 margin-left-sm">
				<view class="bg-gray"></view>
				<view class="bg-grey text-center" style="border-radius: 5px;">
					<text class="text-sm">{{ hall.hallName }}屏幕</text>
				</view>
				<view class="bg-gray"></view>
			</view>
			<view class="text-sl text-center padding">
				<t-table border="0" class="bg-white">
					<t-tr class="bg-gray" v-for="index in hall.row" :key="index">
						<text class="text-gray text-sm">{{ index + 1 }}</text>
						<t-td v-for="index1 in hall.column" :key="index1">
							<image :src="seatInfo[index][index1]" style="width: 35px;height: 35px;" @click="chooseSeat([index + 1, index1 + 1])"></image>
						</t-td>
						<br />
					</t-tr>
				</t-table>
			</view>
		</view>

		<view class="cu-item bg-white" v-if="seats.length !== 0">
			<view class="content">
				<view class="grid col-6 grid-square margin-left-sm">
					<view class="margin-top bg-orange align-center" v-for="(item, index) in seats" :key="index">
						<view>
							<text>{{ item.row }}排{{ item.coloum }}座</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="button padding flex flex-direction">
			<button v-if="seats.length !== 0" class="cu-btn bg-red margin-tb-sm lg" @click="confirmSeat">{{ money }}确认选座</button>
			<button v-else class="cu-btn bg-red margin-tb-sm lg" disabled>请先选座</button>
		</view>
	</view>
</template>

<script>
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
import { findSessionById } from '../../api/session.js';
import { findCinemaById } from '../../api/cinema.js';
import { findFilmById } from '../../api/film.js';
import { findHallById } from '../../api/hall.js';
import { findTicketRecordBySessionOrUser, addTicketRecord } from '../../api/ticketRecord.js';
export default {
	data() {
		return {
			sessionId: '',
			cinemaId: '',
			cinema: {},
			filmId: '',
			film: {},
			session: {},
			checked: false,
			seats: [],
			money: '',
			hallId: '',
			hall: {},
			seatInfo: [[]],
			otherSeats: [],
			mySeats: [],
			userInfo: {},
			currentDate:''
		};
	},
	components: {
		tTable,
		tTh,
		tTr,
		tTd
	},
	onLoad(option) {
		(async () => {
			console.log('option' + JSON.stringify(option));
			this.sessionId = option.sessionId;
			this.filmId = option.filmId;
			this.cinemaId = option.cinemaId;
			this.hallId = option.hallId;
			this.currentDate = option.date
			this.getSessionDeatil();
			this.findOtherSeat();
			this.seats = [];
			this.userInfo = uni.getStorageSync('userinfo');
			console.log('this.userInfo: ' + JSON.stringify(this.userInfo));
			this.findMySeat();
		})();
	},
	onShow() {
		// this.getSessionDeatil();
	},
	methods: {
		getSessionDeatil() {
			let postData = {
				sessionId: this.sessionId
			};
			findSessionById(postData).then(
				res => {
					// console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						this.session = res.data;
						let arr = this.session.playTime.split(' ');
						this.session.playTime = arr[arr.length - 1];
						let arr1 = this.session.endTime.split(' ');
						this.session.endTime = arr1[arr1.length - 1];
						// this.cinemaId = res.data.cinemaId;
						// this.filmId = res.data.filmId;
					}
					// console.log('session' + JSON.stringify(this.session));
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
			findCinemaById({ id: this.cinemaId }).then(
				res1 => {
					// console.log('res1' + JSON.stringify(res1));
					if (res1.errno === 0) {
						this.cinema = res1.data;
					}
				},
				err1 => {
					console.log('err1' + JSON.stringify(err1));
				}
			);
			findFilmById({ id: this.filmId }).then(
				res2 => {
					// console.log('res2' + JSON.stringify(res2));
					if (res2.errno === 0) {
						this.film = res2.data;
						if (this.film.dimensional === 0) {
							this.film.dimensional = '3D'
						} else{
							this.film.dimensional = '2D'
						}
					}
				},
				err2 => {
					console.log('err2' + JSON.stringify(err2));
				}
			);

			findHallById({ id: this.hallId }).then(
				res3 => {
					console.log('res3' + JSON.stringify(res3));
					if (res3.errno === 0) {
						this.hall = res3.data;
						// console.log('item' + JSON.stringify(res3.data));
						console.log('this.hall.row' + JSON.stringify(this.hall.row));
						console.log('this.hall.coloum' + JSON.stringify(this.hall.column));
						for (let i = 1; i <= this.hall.row; i++) {
							this.seatInfo[i - 1] = [];
							for (let j = 1; j <= this.hall.column; j++) {
								// console.log('row' + JSON.stringify(i));
								// this.hall.seatInfo.push()
								this.seatInfo[i - 1][j - 1] = '../../static/noseat.png';
								// console.log('this.seatInfo[row1 - 1][ coloum1 - 1]' + JSON.stringify(this.seatInfo[i - 1][j - 1]));
							}
						}
					}
				},
				err3 => {
					console.log('err3' + JSON.stringify(err3));
				}
			);
		},
		findOtherSeat() {
			findTicketRecordBySessionOrUser({ sessionId: this.sessionId }).then(
				res4 => {
					if (res4.errno === 0) {
						console.log('res4' + JSON.stringify(res4.data));
						if (res4.data.length !== 0) {
							uni.setStorageSync('otherSeats',res4.data)
							this.otherSeats = uni.getStorageSync('otherSeats');
							console.log('this.seatInfo' + JSON.stringify(this.seatInfo));
							this.otherSeats.forEach(item => {
								if (item.seats.length !== 0) {
									item.seats.forEach(item1 => {
										console.log('other', JSON.stringify(item1));
										if (item.userId !== this.userInfo._id) {
											console.log('gggggggggg')
											this.seatInfo[item1.row - 1][item1.coloum - 1] = '../../static/otherseat.png';
										}
										console.log('this.seatInfo[item1.row - 1][item1.coloum - 1]', JSON.stringify(this.seatInfo[item1.row - 1][item1.coloum - 1]));
									});
								}
							});
						}
					}
				},
				err4 => {
					console.log('err4' + JSON.stringify(err4));
				}
			);
		},
		findMySeat() {
			findTicketRecordBySessionOrUser({ userId: this.userInfo._id }).then(
				res5 => {
					console.log('this.userInfo._id: ' + JSON.stringify(this.userInfo._id));
					if (res5.errno === 0) {
						console.log('res5' + JSON.stringify(res5));
						if (res5.data.length !== 0) {
							this.mySeats = res5.data;
							console.log('this.seatInfo' + JSON.stringify(this.seatInfo));
							this.mySeats.forEach(item => {
								if (item.seats.length !== 0) {
									item.seats.forEach(item1 => {
										console.log('item1', JSON.stringify(item1));
										if (this.userInfo._id === item.userId) {
											this.seatInfo[item1.row - 1][item1.coloum - 1] = '../../static/myseat.png';
										}
									});
								}
							});
						}
					}
				},
				err5 => {
					console.log('err5' + JSON.stringify(err5));
				}
			);
		},
		// 选择座位
		chooseSeat(e) {
			console.log('checked' + JSON.stringify(this.checked));
			console.log('e1' + JSON.stringify(e));
			let data = {
				row: e[0],
				coloum: e[1]
			};
			if (this.seatInfo[e[0] - 1][e[1] - 1] === '../../static/myseat.png') {
				console.log('888888888888888888888');
				this.seatInfo[e[0] - 1][e[1] - 1] = '../../static/noseat.png';
				this.seats.forEach((item, index) => {
					if (item.row === data.row && item.coloum === data.coloum) {
						console.log('index' + JSON.stringify(index));
						this.seats.splice(index, 1);
					}
				});
				console.log('this.seats' + JSON.stringify(this.seats));
			}
			// console.log('this.seatInfo[e[0] - 1][e[1] - 1] '+JSON.stringify(this.seatInfo[e[0] - 1][e[1] - 1] ))
			else if (this.seats.length <= 6 && this.seatInfo[e[0] - 1][e[1] - 1] !== '../../static/myseat.png') {
				this.seats.push(data);
				this.seatInfo[e[0] - 1][e[1] - 1] = '../../static/myseat.png';
			} else if (this.seats.length > 7) {
				uni.showToast({
					icon:'none',
					title:'最多只能选7个'
				})
				console.log('一次最多只能选7个');
			}
			this.money = parseFloat(this.session.price) * this.seats.length;
		},
		// 确认选座
		confirmSeat() {
			console.log('userinfo' + JSON.stringify(this.userInfo));
			if (this.userInfo) {
				console.log('前往支付');
				let postData = {
					sessionId: this.sessionId,
					userId: this.userInfo._id,
					seats: this.seats,
					allPrice: this.money,
					status: 0
				};
				addTicketRecord(postData).then(res => {
					if (res.errno === 0) {
						console.log('res.data' + JSON.stringify(res.data));
						uni.navigateTo({
							url: './comPay?ticketRecordId=' + res.data._id
						});
					}
				});
				// this.creatQrcode()
			} else {
				console.log('还未登录');
				uni.showToast({
					icon:'none',
					title:'还未登录'
				})
				uni.navigateTo({
					url: '../login/index'
				});
			}
		}
	}
};
</script>

<style>
.button {
	width: 100%;
	position: fixed;
	bottom: 0;
}
</style>
