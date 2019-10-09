<template xlang="wxml">
	<view class="container bg-orange">
		<view class="cu-card bg-white shadow margin-top" style="width: 90%;margin-left: 20px;margin-right: 10px;border-radius: 10px;">
			<view class="cu-list menu margin-top">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view></view>
						<view class="text-black text-xxl">{{ ticketRecord.filmName }}</view>
						<view class="text-gray text-sm">{{ ticketRecord.playTime }}~{{ ticketRecord.endTime }}</view>
						<view class="text-gray text-sm">{{ ticketRecord.cinemaName }}{{ ticketRecord.hallName }}</view>
						<view class="text-gray text-sm">
							<text v-for="(item, index) in ticketRecord.seats" :key="index"> {{ item.row }}排{{ item.coloum }}座 </text>
						</view>
					</view>
					<view class="action text-xxl" @click="goMap(cinema.lng, cinema.lat)">
						<image style="width: 50px;height: 70px;top: 10px;" :src="ticketRecord.pictures"></image>
					</view>
				</view>
				<view class="cu-item margin-top">
					<view class="content padding-tb-sm">
						<view class="text-black text-xxl">取电影票</view>
						<view class="text-center" style="margin-bottom: 30px;">
							<text class="text-sm text-gray">{{ num }}张电影票</text>
						</view>
						<view class="qrimg" style="margin-top: 30px; margin-bottom: 20px;">
							<tki-qrcode
								v-if="ifShow"
								ref="qrcode"
								:val="val"
								:size="size"
								:unit="unit"
								:background="background"
								:foreground="foreground"
								:pdground="pdground"
								:icon="icon"
								:iconSize="iconsize"
								:lv="lv"
								:onval="onval"
								:loadMake="loadMake"
								:usingComponents="true"
								@result="qrR"
							/>
						</view>
						<view class="text-center" style="margin-bottom: 30px;">
							<text class="text-sm text-gray">取票号:{{ ticketRecord._id }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import { findTicketRecordById } from '../../api/ticketRecord.js';
import { findSessionById } from '../../api/session.js';
import { findFilmById } from '../../api/film.js';
import { findHallById } from '../../api/hall.js';
import { findCinemaById } from '../../api/cinema.js';
export default {
	data() {
		return {
			ifShow: true,
			val: '二维码', // 要生成的二维码值
			size: 400, // 二维码大小
			unit: 'upx', // 单位
			background: 'white', // 背景色
			foreground: '#309286', // 前景色
			pdground: '#32dbc6', // 角标色
			icon: '', // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '', // 二维码生成后的图片地址或base64
			num: 0,
			ticketRecord: {}
		};
	},
	onShow() {
		console.log('dddddddddddddddddddddddddd');
	},
	onLoad(option) {
		console.log('option' + JSON.stringify(option));
		this.val = option.ticketRecordId;
		this.getTicketRecord();
	},
	methods: {
		sliderchange(e) {
			this.size = e.detail.value;
		},
		creatQrcode() {
			this.$refs.qrcode._makeCode();
		},
		saveQrcode() {
			this.$refs.qrcode._saveCode();
		},
		qrR(res) {
			this.src = res;
		},
		clearQrcode() {
			this.$refs.qrcode._clearCode();
			this.val = '';
		},
		ifQrcode() {
			this.ifShow = !this.ifShow;
		},
		selectIcon() {
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					that.icon = res.tempFilePaths[0];
					setTimeout(() => {
						that.creatQrcode();
					}, 100);
					// console.log(res.tempFilePaths);
				}
			});
		},
		getTicketRecord() {
			findTicketRecordById({ id: this.val }).then(
				res => {
					if (res.errno === 0) {
						console.log('res' + JSON.stringify(res.data));
						this.num = res.data.seats.length;
						findSessionById({ sessionId: res.data.sessionId }).then(
							res1 => {
								console.log('res1' + JSON.stringify(res1));
								let arr = res1.data.playTime.split(' ');
								res.data.playTime = arr[arr.length - 1];
								let arr1 = res1.data.endTime.split(' ');
								res.data.endTime = arr1[arr1.length - 1];
								if (res1.errno === 0) {
									findFilmById({ id: res1.data.filmId }).then(
										res2 => {
											if (res2.errno === 0) {
												res.data.filmName = res2.data.filmName;
												res.data.pictures = 'http://' + res2.data.pictures;
												// this.ticketRecord = res.data;
												console.log('this.ticketRecord' + JSON.stringify(this.ticketRecord));
											}
										},
										err2 => {
											console.log('err2' + JSON.stringify(err2));
										}
									);
									findHallById({ id: res1.data.hallId }).then(
										res2 => {
											if (res2.errno === 0) {
												res.data.hallName = res2.data.hallName;
												// this.ticketRecord = res.data;
												console.log('this.ticketRecord' + JSON.stringify(this.ticketRecord));
											}
										},
										err2 => {
											console.log('err2' + JSON.stringify(err2));
										}
									);
									findCinemaById({ id: res1.data.cinemaId }).then(
										res2 => {
											if (res2.errno === 0) {
												res.data.cinemaName = res2.data.cinemaName;
												// this.ticketRecord = res.data;
												console.log('this.ticketRecord' + JSON.stringify(this.ticketRecord));
											}
										},
										err2 => {
											console.log('err2' + JSON.stringify(err2));
										}
									);
									this.ticketRecord = res.data;
								}
							},
							err1 => {
								console.log('err1' + JSON.stringify(err1));
							}
						);
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		}
	},
	components: {
		tkiQrcode
	}
};
</script>

<style>
/* @import "../../../common/icon.css"; */
.container {
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
}

.qrimg {
	display: flex;
	justify-content: center;
}

slider {
	width: 100%;
}

input {
	width: 100%;
	margin-bottom: 20upx;
}

.btns {
	display: flex;
	flex-direction: column;
	width: 100%;
}

button {
	width: 100%;
	margin-top: 10upx;
}
</style>
