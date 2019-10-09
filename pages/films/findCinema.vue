<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><view class="top_view"></view></view>
		<!-- #endif -->

		<view class="cu-list bg-white" style="padding: 10px 0;">
			<view class="cu-item border " style="padding-top: 5px;">
				<view class="content margin-left-sm text-xxl">
					<text class="icon-back text-blue" @click="goBack"></text>
					<text class="text-black text-xxl wenzi">{{ filmName }}</text>
				</view>
			</view>
		</view>
		<!-- <view class="cu-bar search bg-white solid-top" style="margin-top: -3px;"> -->
		<!-- <view class="action bg-white" @click="selectCity">
				<text>北京</text>
				<text class="icon-triangledownfill"></text>
			</view> -->
		<!-- <view class="search-form round">
				<text class="icon-search"></text>
				<input type="text" placeholder="搜影院" confirm-type="search" v-model="key"/>
			</view> -->
		<!-- </view> -->
		<view class="bg-white">
			<view class="uni-padding-wrap uni-common-mt tabHead">
				<uni-segmented-control :current="current" :values="days" @clickItem="onClickItem" style-type="text" active-color="#0081ff"></uni-segmented-control>
			</view>
		</view>

		<view class="">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item, index) in cinemas" :key="index">
					<view class="content padding-tb-sm" @click="goMovieSession(item)">
						<view>{{ item.cinemaDetail.cinemaName }}</view>
						<view class="text-gray text-sm">{{ item.cinemaDetail.address }}</view>
						<view class="text-gray text-sm">
							<text class="text-orange icon-favorfill margin-right-xs"></text>
							{{ filmName }}特惠
						</view>
						<view>
							<view class="grid col-4 grid-square margin-left-sm">
								<view class="timeGrid bg-gray align-center" v-for="(item1, index1) in item.sessions" :key="index1">
									<view>
										<text>{{ item1.playTime }}</text>
										<br />
										<text class="text-red text-sm">{{ item1.price }}元</text>
									</view>
								</view>
							</view>
							<!-- <view v-if="item.sessions.length > 4"></view> -->
						</view>
					</view>
					<view class="lowPrice action">
						<text class="text-red">{{ item.minPrice }}元起</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import { getTodayTom, compare } from '../../utils/dataChange.js';
import { findSessionByDate } from '../../api/session.js';
import { findCinemaById } from '../../api/cinema.js';
export default {
	data() {
		return {
			current: 0,
			days: [],
			filmId: '',
			filmName: '',
			cinemas: [],
			cityId: '',
			date: ''
		};
	},
	components: {
		uniSegmentedControl
	},
	onShow() {
		this.days = [];
		let today = getTodayTom(0, '-');
		today = '今天' + today;
		this.days.push(today);
		console.log('today' + JSON.stringify(today));
		let tomorrow = getTodayTom(1, '-');
		tomorrow = '明天' + tomorrow;
		this.days.push(tomorrow);
		let houtian = getTodayTom(2, '-');
		houtian = '后天' + houtian;
		this.days.push(houtian);
		this.findCinema(getTodayTom(0, '-'));
	},
	onLoad(option) {
		console.log('option' + JSON.stringify(option));
		this.filmId = option.id;
		this.filmName = option.filmName;
		this.cityId = uni.getStorageSync('city')._id;
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		onClickItem(e) {
			console.log('e' + JSON.stringify(e));
			if (e === 0) {
				this.findCinema(getTodayTom(0, '-'));
			} else if (e === 1) {
				this.findCinema(getTodayTom(1, '-'));
			} else if (e === 2) {
				this.findCinema(getTodayTom(2, '-'));
			}
		},
		goMovieSession(data) {
			console.log('data' + JSON.stringify(data));
			uni.navigateTo({
				url: './movieSession?cinemaId=' + data.id + '&filmId=' + this.filmId
			});
		},
		// 根据城市查找影院
		findCinema(date) {
			let postData = {
				date: date,
				filmId: this.filmId
			};
			findSessionByDate(postData).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						let cinemas = [];
						this.cinemas = [];
						let map = new Map();
						res.data.forEach(item1 => {
							console.log('item=========================' + JSON.stringify(item1));
							let boolen = compare(item1.playTime);
							console.log('boolen', JSON.stringify(boolen));
							let arr = item1.playTime.split(' ');
							item1.playTime = arr[arr.length - 1];
							if (!map[item1.cinemaId] && boolen) {
								item1.id = item1.cinemaId;
								cinemas.push(item1);
								map[item1.cinemaId] = cinemas;
								cinemas = [];
							} else if (boolen) {
								map[item1.cinemaId].push(item1);
							}
						});
						let cinema = [...new Set(map)];
						console.log('map' + JSON.stringify(map));
						for (var key in map) {
							let data = {};
							data.sessions = map[key];
							data.id = key;
							let postData1 = {
								id: key
							};
							findCinemaById(postData1).then(
								res1 => {
									console.log('res1' + JSON.stringify(res1));
									if (res1.errno === 0) {
										data.cinemaDetail = res1.data;
										console.log('this.cityId' + JSON.stringify(this.cityId));
										if (res1.data.cityId === this.cityId) {
											console.log('map[key]' + JSON.stringify(data));
											data.sessions.sort((a,b)=>{
												return a.playTime>b.playTime ? 1:-1
											})
											console.log('data.sessions===========>',JSON.stringify(data.sessions))
											let prices = [];
											data.sessions.forEach(item2 => {
												prices.push(parseFloat(item2.price));
											});
											console.log('prices', JSON.stringify(prices));
											data.minPrice = Math.min.apply({},prices);
											console.log('data.minPrice----------------------', JSON.stringify(data));
											
											this.cinemas.push(data);
											// console.log('this.cinemas', JSON.stringify(this.cinemas));
											// this.cinemas = this.cinemas.filter(a => !res.has(a.id) && res.set(a.id, 1));
										}
									}
								},
								err1 => {
									console.log('err1' + JSON.stringify(err1));
								}
							);
						}
						console.log('this.cinemas' + JSON.stringify(this.cinemas));
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		}
	}
};
</script>

<style>
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: #f8f8f8;
}
.top_view {
	height: var(--status-bar-height);
	width: 100%;
	position: fixed;
	background-color: #f8f8f8;
	top: 0;
	z-index: 999;
}
.lowPrice {
	position: fixed;
	right: 5px;
	top: 5px;
}
.timeGrid {
	/* max-height: 100px; */
	padding-top: 20px;
	text-align: center;
	border-radius: 30px;
}
.wenzi {
	font-family: 'Comic Sans MS';
}
</style>
