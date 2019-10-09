<template>
	<view>
		<view class="cu-bar search bg-white">
			<!-- <view class="grid col-{{index+1}} margin-bottom text-center" wx:for="{{5}}" wx:key>
			  <view class="{{index%2==0?'bg-cyan':'bg-blue'}} padding" wx:for="{{(index+1)*2}}" wx:key>{{index+1}}</view>
			</view> -->

			<view class="grid col-3 ">
				<view class="uni-padding-wrap uni-common-mt tabHead justify-center" style="width: 130px;margin-left: 120px;">
					<uni-segmented-control
						:current="current"
						:values="['电影', '影院']"
						@clickItem="onClickItem"
						style-type="text"
						active-color="rgb(254,76,98)"
					></uni-segmented-control>
				</view>
			</view>
			<view class="grid col-3 ">
				<view class="search-form round" @click="inputFocus"><text class="icon-search"></text></view>
			</view>
		</view>
		<view class="bg-white margin" v-if="current === 0">
			<view class="uni-common-mt tabHead">
				<uni-segmented-control
					:current="current1"
					:values="['正在热映', '即将上映']"
					@clickItem="onClickItem1"
					style-type="text"
					active-color="rgb(254,76,98)"
				></uni-segmented-control>
			</view>
			<view v-if="current1 === 0">
				<view class="cu-card article margin-top-0" v-for="(item, index) in hotMovies" :key="index">
					<view class="cu-item shadow" @click="goFilmDetail(item)">
						<view class="content margin-top">
							<image :src="item.pictures" mode="aspectFill"></image>
							<view class="desc">
								<view>
									<text>{{ item.filmName }}</text>
									<view class="cu-capsule round sm">
										<view class="cu-tag bg-grey sm">{{ item.dimensional }}</view>
										<view class="cu-tag line-grey sm" v-if="item.dimensional === '2D'">中国巨幕</view>
										<view class="cu-tag line-grey sm" v-else-if="item.dimensional === '3D'">MAX</view>
									</view>
								</view>
								<view class="text-gray text-sm">
									评分
									<text class="text-orange">{{ item.score }}</text>
								</view>
								<view class="text-gray text-sm">
									导演：
									<text>{{ item.director }}</text>
								</view>
								<view class="text-gray text-sm">
									主演：
									<text>{{ item.performer }}</text>
								</view>
							</view>
							<view class="buttonStyle action" @click="gofindCinema(item)"><button class="cu-btn round bg-gradual-red shashadow sm">购票</button></view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="current1 === 1">
				<view class="cu-card article margin-top-0" v-for="(item, index) in commingMovies" :key="index">
					<view class="cu-item shadow " @click="goFilmDetail(item)">
						<view class="content margin-top">
							<image :src="item.pictures" mode="aspectFill"></image>
							<view class="desc">
								<view>
									<text>{{ item.filmName }}</text>
								</view>
								<view class="text-gray text-sm">
									<text class="text-orange">{{ item.wantSeeNum }}</text>
									人想看
								</view>
								<view class="text-gray text-sm">
									导演：
									<text>宫崎骏</text>
								</view>
								<view class="text-gray text-sm">
									主演：
									<text>周冬雨 井柏然</text>
								</view>
							</view>
							<!-- <view class="buttonStyle action" @click="gofindCinema"><button class="cu-btn round bg-pink shashadow sm">想看</button></view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white margin" v-if="current === 1">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item, index) in cinemas" :key="index">
					<view class="content padding-tb-sm" @click="goMovieSession(item)">
						<view>{{ item.cinemaName }}</view>
						<view class="text-gray text-sm">{{ item.address }}</view>
						<view class="text-gray text-sm">
							<!-- <text class="text-orange icon-favorfill margin-right-xs"></text> -->
							<!-- {{ filmName }}特惠 -->
						</view>
						<!-- <view>
							<view class="grid col-4 grid-square margin-left-sm">
								<view class="timeGrid bg-gray align-center" v-for="(item1, index1) in item.sessions" :key="index1">
									<view>
										<text>{{ item1.playTime }}</text>
										<br />
										<text class="text-red text-sm">{{ item1.price }}元</text>
									</view>
								</view>
							</view>
							<view v-if="item.sessions.length > 4">dddddddd</view>
						</view> -->
					</view>
					<view class="lowPrice action" v-if="item.minPrice">
						<text class="text-red">{{ item.minPrice }}元起</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import bus from '../../utils/bus.js';

import { findFilmById, findFilmsByCity, findAllFilms } from '../../api/film.js';
import { findCinemaByCityId } from '../../api/cinema.js';
import { findSessionByCieamId } from '../../api/session.js';
export default {
	data() {
		return {
			city: '邯郸',
			current: 0,
			current1: 0,
			hotMovies: [],
			commingMovies: [],
			cityId: '5d15b318eb5fb64a702bb2e0',
			cinemas: []
		};
	},
	components: {
		uniSegmentedControl
	},
	onShow() {
		console.log('333333333');
		// bus.$on('city', value => {
		// 	this.city = value;
		// });
		// console.log('sssss');
		// bus.$on('zhuangtai', value => {
		// 	console.log('value' + JSON.stringify(value));
		// 	this.current1 = value.e;
		// 	// this.cityId = value.cityId;
		// });
		if (uni.getStorageSync('city')) {
			this.city = uni.getStorageSync('city').cityName;
			this.cityId = uni.getStorageSync('city')._id;
		}
		if (uni.getStorageSync('zhuangtai')) {
			this.current1 = uni.getStorageSync('zhuangtai');
			console.log('this.current1' + JSON.stringify(this.current1));
		}
		this.getFilms();
		// this.findCinemaByCity();
	},
	onLoad() {},
	methods: {
		//获得电影信息
		getFilms() {
			this.hotMovies = [];
			this.commingMovies = [];
			findAllFilms().then(
				res => {
					if (res.errno === 0) {
						res.data = [...new Set(res.data)];
						console.log('res.data' + JSON.stringify(res.data));
						res.data.forEach(item => {
							findFilmById({ id: item }).then(
								res1 => {
									if (res1.errno === 0) {
										console.log('res1' + JSON.stringify(res1));
										res1.data.pictures = 'http://' + res1.data.pictures;
										if (res1.data.dimensional === 0) {
											res1.data.dimensional = '3D';
										} else {
											res1.data.dimensional = '2D';
										}
										if (res1.data.status === 0) {
											this.hotMovies.push(res1.data);
											this.hotMovies = [...new Set(this.hotMovies)];
											console.log('this.hotMovies' + JSON.stringify(this.hotMovies));
										}
										if (res1.data.status === 1) {
											this.commingMovies.push(res1.data);
											console.log('this.commingMovies' + JSON.stringify(this.commingMovies));
										}
									}
								},
								err1 => {
									console.log('err1' + JSON.stringify(err1));
								}
							);
						});
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		},
		tabSelect(e) {
			console.log('e11111' + JSON.stringify(e));
		},
		onClickItem(e) {
			console.log('e' + JSON.stringify(e));
			this.current = e;
			this.findCinemaByCity();
			// this.getFilms();
		},
		onClickItem1(e) {
			console.log('e' + JSON.stringify(e));
			this.current1 = e;
			this.getFilms();
		},
		selectCity() {
			uni.navigateTo({
				url: '../index/searchAddr/index'
			});
		},
		gofindCinema(data) {
			uni.navigateTo({
				url: './findCinema?id=' + data._id + '&filmName=' + data.filmName + '&cityId=' + this.cityId
			});
		},
		goFilmDetail(data) {
			console.log('data' + JSON.stringify(data));
			uni.navigateTo({
				url: '../films/filmDetail?filmId=' + data._id
			});
		},
		findCinemaByCity() {
			this.cinemas = []
			console.log('fffffffffffffffffffffffffffffffffffffffffffffffff')
			findCinemaByCityId({ cityId: this.cityId }).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						// this.cinemas = res.data;
						res.data.forEach(item => {
							console.log('item', JSON.stringify(item));
							findSessionByCieamId({ cinemaId: item._id }).then(
								res1 => {
									// console.log('res1', JSON.stringify(res1));
									if (res1.errno === 0 && res1.data.length !== 0) {
										let prices = [];
										res1.data.forEach(item2 => {
											prices.push(parseFloat(item2.price));
										});
										// console.log('prices', JSON.stringify(prices));
										item.minPrice = Math.min.apply({}, prices);
										// console.log('item', JSON.stringify(item));
									}
									
									let ids = [];
									console.log('ids',JSON.stringify(ids))
									console.log('ids.indexOf(item._id)=========',JSON.stringify(ids.indexOf(item._id)===-1))
									if (ids.indexOf(item._id) === -1) {
										ids.push(item._id);
										this.cinemas.push(item);
										this.cinemas = [...new Set(this.cinemas)];
									}
								},
								err1 => {
									console.log('err1', JSON.stringify(err1));
								}
							);
						});
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		},
		inputFocus() {
			console.log('wwwww');
			uni.navigateTo({
				url: '../films/searchFilmCinema'
			});
		},
		goMovieSession(data) {
			console.log('data' + JSON.stringify(data));
			uni.navigateTo({
				url: './movieSession?cinemaId=' + data._id
			});
		}
	}
};
</script>

<style>
.buttonStyle {
	line-height: 100px;
}
.lowPrice {
	position: fixed;
	right: 5px;
	top: 5px;
}
</style>
