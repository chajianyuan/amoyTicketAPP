<template>
	<view>
		<view class="margin-left-sm margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="text-black">共{{ nums }}部影片</text>
					<text class="text-grey text-sm">(购过票或写影评标记看过)</text>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-card article" v-for="(item, index) in films" :key="index">
				<view class="cu-item shadow padding" @click="goFilmDetail(item)">
					<view class="content margin-top">
						<image :src="item.film.pictures" mode="aspectFill"></image>
						<view class="desc">
							<view><text>{{item.film.filmName}}</text></view>
							<view class="text-gray text-sm">
								<text class="text-orange">3333</text>
								人想看
							</view>
							<view class="text-gray text-sm"><text>{{item.film.director}} {{item.film.performer}}</text></view>
							<view class="text-gray text-sm"><text>{{item.film.showTime}}在中国大陆上映</text></view>
						</view>
					</view>
					<view class="bg-gray">
						<view class="cu-list menu">
							<view class="cu-item">
								<view class="content">
									<text class="icon-likefill text-orange" v-for="index in item.num" :key="index"></text>
									<text class="icon-like text-orange" v-for="index in item.last" :key="index"></text>
									</view>
								<view class="action" v-if="!item.score"><button class="cu-btn round bg-gradual-orange shadow" @click="goScore(item)">评分</button></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
import { findTicketRecordBySessionOrUser } from '../../api/ticketRecord.js';
import { findFilmById } from '../../api/film.js';
import { findSessionById } from '../../api/session.js';
import { findFilmByUserId } from '../../api/myFim.js';
export default {
	data() {
		return {
			nums: 0,
			myScore: 0,
			userInfo: {},
			films: []
		};
	},
	components: {
		uniRate
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userinfo');
		console.log('this.userInfo' + JSON.stringify(this.userInfo));
		this.getMyFilm();
	},
	methods: {
		// 拿到订单
		// getRecord() {
			// this.records = [];
			// let postData = {
			// 	userId: this.userInfo._id
			// };
			// findTicketRecordBySessionOrUser(postData).then(
			// 	res => {
			// 		console.log('res' + JSON.stringify(res));
			// 		if (res.errno === 0) {
			// 			if (res.data.length !== 0) {
			// 				res.data.forEach(item => {
			// 					if (item.status === 1) {
			// 						findSessionById({ sessionId: item.sessionId }).then(
			// 							res1 => {
			// 								console.log('res1' + JSON.stringify(res1));
			// 								if (res1.errno === 0) {
			// 									// item.session = res1.data;
			// 									findFilmById({ id: res1.data.filmId }).then(
			// 										res2 => {
			// 											if (res2.errno === 0) {
			// 												item.film = res2.data;
			// 												this.records.push(item);
			// 												this.records = [...new Set(this.records)];
			// 												this.num = this.records.length;
			// 												console.log('this.records'+JSON.stringify(this.records))
			// 											}
			// 										},
			// 										err2 => {
			// 											console.log('err2' + JSON.stringify(err2));
			// 										}
			// 									);
			// 								}
			// 							},
			// 							err1 => {
			// 								console.log('err1' + JSON.stringify(err1));
			// 							}
			// 						);
			// 					}
			// 				});
			// 			}
			// 		}
			// 	},
			// 	err => {
			// 		console.log('err' + JSON.stringify(err));
			// 	}
			// );
		// },
		// 评分
		goScore(data) {
			uni.navigateTo({
				url: './score?filmId='+data.filmId+'&_id='+data._id+'&status='+data.status
			});
		},
		getMyFilm() {
			this.films = [];
			console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
			findFilmByUserId({ userId: this.userInfo._id }).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						// this.films = res.data
						res.data.forEach(item => {
							item.num = 0;
							item.last = 5
							if (item.score) {
								if (parseInt(item.score) == 10 ) {
									console.log('1');
									item.num = 5;
									item.last = 0
								} else if (8 <= parseInt(item.score) < 10 ) {
									console.log('2');
									item.num = 4;
									item.last = 1;
								} else if (6 <= parseInt(item.score) < 8 ) {
									console.log('3');
									item.num = 3;
									item.last = 2;
								} else if (4 <= parseInt(item.score) < 6) {
									console.log('4');
									item.num = 2;
									item.last = 3;
								} else if (0 < parseInt(item.score) < 4 ) {
									console.log('5');
									item.num = 1;
									item.last = 4;
								}
							}
							if (item.status === 0) {
								findFilmById({ id: item.filmId }).then(
									res1 => {
										console.log('res1', JSON.stringify(res1));
										if (res1.errno === 0) {
											res1.data.pictures = 'http://' + res1.data.pictures;
											item.film = res1.data
											this.films.push(item);
											console.log('this.films', JSON.stringify(this.films));
		
											this.nums = this.films.length;
										}
									},
									err1 => {
										console.log('err1', JSON.stringify(err1));
									}
								);
							}
						});
					}
				},
				err => {
					console.log('err', JSON.stringify(err));
				}
			);
		}
	}
};
</script>

<style></style>
