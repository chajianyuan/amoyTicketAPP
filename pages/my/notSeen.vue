<template>
	<view>
		<view class="margin-left-sm margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="text-black">共{{ num }}部影片</text>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-card article" v-for="(item, index) in records" :key="index">
				<view class="cu-item shadow padding" @click="goComPay(item)">
					<view class="content margin-top">
						<image :src="item.film.pictures" mode="aspectFill"></image>
						<view class="desc">
							<view><text>{{item.film.filmName}}</text></view>
							<view class="text-gray text-sm"><text>{{item.film.director}} {{item.film.performer}}</text></view>
							<view class="text-gray text-sm"><text>{{item.film.showTime}}在中国大陆上映</text></view>
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
export default {
	data() {
		return {
			num: 0,
			myScore: 0,
			userInfo: {},
			records: []
		};
	},
	components: {
		uniRate
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userinfo');
		console.log('this.userInfo' + JSON.stringify(this.userInfo));
		this.getRecord();
	},
	methods: {
		// 拿到订单
		getRecord() {
			this.records = [];
			let postData = {
				userId: this.userInfo._id
			};
			findTicketRecordBySessionOrUser(postData).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						if (res.data.length !== 0) {
							res.data.forEach(item => {
								if (item.status === 0) {
									findSessionById({ sessionId: item.sessionId }).then(
										res1 => {
											console.log('res1' + JSON.stringify(res1));
											if (res1.errno === 0) {
												// item.session = res1.data;
												findFilmById({ id: res1.data.filmId }).then(
													res2 => {
														if (res2.errno === 0) {
															res2.data.pictures = 'http://'+res2.data.pictures
															item.film = res2.data;
															this.records.push(item);
															this.records = [...new Set(this.records)];
															this.num = this.records.length;
															console.log('this.records'+JSON.stringify(this.records))
														}
													},
													err2 => {
														console.log('err2' + JSON.stringify(err2));
													}
												);
											}
										},
										err1 => {
											console.log('err1' + JSON.stringify(err1));
										}
									);
								}
							});
						}
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		},
		goComPay(data){
			uni.navigateTo({
				url:'../films/comPay?ticketRecordId='+data._id
			})
		}
	}
};
</script>

<style></style>
