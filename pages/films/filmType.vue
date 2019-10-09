<template>
	<view>
		<view class="cu-item padding" v-if="hotMovies.length !== 0"><text class="text-black text-xl">正在热映</text></view>
		<view class="cu-card article" v-for="(item, index) in hotMovies" :key="index" @click="goFilmDetail(item)">
			<view class="cu-item shadow">
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
						<view class="text-gray text-sm margin-top">
							评分
							<text class="text-orange">{{ item.score }}</text>
						</view>
						<view class="text-gray text-sm margin-top">
							导演：
							<text>{{ item.director }}</text>
						</view>
						<view class="text-gray text-sm margin-top">
							主演：
							<text>{{ item.performer }}</text>
						</view>
					</view>
					<view class="buttonStyle action" @click="gofindCinema(item)"><button class="cu-btn round bg-gradual-red shashadow sm">购票</button></view>
				</view>
			</view>
		</view>
		<view class="cu-item" v-if="commingMovies.length !== 0"><text class="text-black text-xl">即将上映</text></view>
		<view class="cu-card article" v-for="(item, index) in commingMovies" :key="index">
			<view class="cu-item shadow">
				<view class="content">
					<image :src="item.pictures" mode="aspectFill"></image>
					<view class="desc">
						<view>
							<text>{{ item.filmName }}</text>
						</view>
						<view class="text-gray text-sm margin-top">
							<text class="text-orange">{{ item.wantSeeNum }}</text>
							人想看
						</view>
						<view class="text-gray text-sm margin-top">
							导演：
							<text>宫崎骏</text>
						</view>
						<view class="text-gray text-sm margin-top">
							主演：
							<text>周冬雨 井柏然</text>
						</view>
					</view>
					<view class="buttonStyle action" @click="gofindCinema"><button class="cu-btn round bg-pink shashadow sm">想看</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { findFilmByType, findFilmById } from '../../api/film.js';
export default {
	data() {
		return {
			type: '',
			films: [],
			hotMovies: [],
			commingMovies: []
		};
	},
	onLoad(option) {
		console.log('type', JSON.stringify(option));
		this.type = option.type;
		this.getFilms();
		this.cityId = uni.getStorageSync('city')._id;
	},
	methods: {
		getFilms() {
			findFilmByType({ type: this.type }).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						this.films = res.data;
						res.data.films.forEach(item => {
							console.log('item' + JSON.stringify(item));
							findFilmById({ id: item }).then(
								res1 => {
									if (res1.errno === 0) {
										res1.data.pictures = 'http://' + res1.data.pictures;
										if (res1.data.dimensional === 0) {
											res1.data.dimensional = '3D';
										} else {
											res1.data.dimensional = '2D';
										}
										console.log('res1' + JSON.stringify(res1));
										if (res1.data.status === 0) {
											this.hotMovies.push(res1.data);
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
					console.log('err');
				}
			);
		},
		gofindCinema(data) {
			console.log('data', JSON.stringify(data));
			uni.navigateTo({
				url: './findCinema?id=' + data._id + '&filmName=' + data.filmName + '&cityId=' + this.cityId
			});
		},
		goFilmDetail(data) {
			uni.navigateTo({
				url: './filmDetail?filmId=' + data._id
			});
		}
	}
};
</script>

<style>
.buttonStyle {
	line-height: 100px;
}
</style>
