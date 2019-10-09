<template>
	<view>
		<view class="cu-bar bg-white search fixed">
			<view class="search-form round">
				<text class="icon-search"></text>
				<input type="text" v-model="key" placeholder="搜影片、影院" confirm-type="search" />
			</view>
			<view class="action" @click="search"><button class="cu-btn bg-gradual-red shadow-blur round">搜索</button></view>
		</view>
		<scroll-view scroll-y class="indexes" scroll-into-view="indexes-item" style="height:100vh;margin-top: 40px;" scroll-with-animation="true" enable-back-to-top="true">
			<block v-if="films.length !== 0">
				<view class="indexItem-index bg-white solid-bottom" style="padding-left: 10px;padding-top: 20px;">电影</view>
				<view class="cu-card article padding bg-white">
					<view class="cu-item solid-bottom" v-for="(item, index) in films" :key="index" @click="goFilm(item)">
						<view class="content margin-top">
							<image :src="item.pictures" mode="aspectFill"></image>
							<view class="desc">
								<view>
									<text>{{ item.filmName }}</text>
								</view>
								<view class="text-gray text-sm">
									评分
									<text class="text-orange">{{ item.score }}</text>
								</view>
								<view class="text-gray text-sm">
									<text>{{ item.director }} {{ item.performer }}</text>
								</view>
								<view class="text-gray text-sm">
									<text>{{ item.showTime }}</text>
								</view>
							</view>
							<view class="buttonStyle action" @click="gofindCinema(item)"><button class="cu-btn round bg-pink shashadow sm">购票</button></view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="cinemas.length !== 0">
				<view class="indexItem-index bg-white solid-bottom" style="padding-left: 10px;padding-top: 20px;">影院</view>
				<view class="cu-card article padding bg-white">
					<view class="cu-item solid-bottom" v-for="(item, index) in cinemas" :key="index" @click="goCinema(item)">
						<view class="content">
							<view class="desc">
								<view>
									<text>{{ item.cinemaName }}</text>
								</view>
								<view class="text-gray text-sm">
									<text class="text-gray">{{ item.address }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="films.length === 0 && cinemas.length === 0">
				<view class="text-center"><text class="text-gray"></text></view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import { findCinemaOrFilmByKey, findFilmById } from '../../api/film.js';
// import bus from '../../../utils/bus.js'
export default {
	data() {
		return {
			films: [],
			cinemas: [],
			key: '',
			nothing: false
		};
	},
	onShow() {},
	methods: {
		search() {
			console.log('key' + JSON.stringify(this.key));
			findCinemaOrFilmByKey({ key: this.key }).then(
				res => {
					console.log('res' + JSON.stringify(res.data.film.length !== 0 || res.data.cinema.length !== 0));
					if (res.errno === 0 && (res.data.film.length !== 0 || res.data.cinema.length !== 0)) {
						this.films = res.data.film;
						this.films.forEach(item => {
							item.pictures = 'http://' + item.pictures;
						});
						this.cinemas = res.data.cinema;
					} else {
						console.log('eeeeeeeeeee');
						this.nothing = true;
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
			// this.city = e[0]
			// bus.$emit('city', this.city);
			// uni.navigateBack({
			// 	delta:1
			// })
		},
		goCinema(data) {
			console.log('data' + JSON.stringify(data));
			uni.navigateTo({
				url: './movieSession?cinemaId=' + data._id
			});
		},
		foFilm(data) {
			console.log('data' + JSON.stringify(data));
		},
		goFilm(data) {
			console.log('datta',JSON.stringify(data))
			uni.navigateTo({
				url: './filmDetail?filmId=' + data._id
			});
		},
		gofindCinema(data){
			uni.navigateTo({
				url: '../films/findCinema?id=' + data._id + '&filmName=' + data.filmName
			});
		}
	}
};
</script>

<style>
.indexBar {
	position: fixed;
	right: 0px;
	bottom: 0px;
	padding: 20rpx 20rpx 20rpx 60rpx;
	display: flex;
	align-items: center;
}

.indexBar .indexBar-box {
	width: 40rpx;
	height: auto;
	background: #fff;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
}

.indexBar-item {
	flex: 1;
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	color: #888;
}
.buttonStyle {
	line-height: 100px;
}
</style>
