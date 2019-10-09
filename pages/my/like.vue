<template>
	<view>
		<view class="bg-white padding">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">共{{ num }}部影片</text>
				</view>
			</view>
		</view>
		<view class="padding">
			<!-- <view>2019-06-26 周三</view> -->
			<view class="cu-card article" style="margin-left: -15px;margin-right: -15px;" v-for="(item, index) in films" :key="index">
				<view class="cu-item shadow" @click="goFilmDetail(item)">
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
								<text>{{ item.director }}</text>
							</view>
							<view class="text-gray text-sm">
								<text>{{ item.showTime }}在中国大陆上映</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { findFilmByUserId } from '../../api/myFim.js';
import { findFilmById } from '../../api/film.js';
export default {
	data() {
		return {
			num: 0,
			films: [],
			userInfo: {}
		};
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userinfo');
		this.getMyFilm();
	},
	methods: {
		goFilmDetail(data) {
			uni.navigateTo({
				url: '../films/filmDetail?filmId=' + data._id
			});
		},
		getMyFilm() {
			this.films = [];
			findFilmByUserId({ userId: this.userInfo._id }).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						// this.films = res.data
						res.data.forEach(item => {
							if (item.status === 1) {
								findFilmById({ id: item.filmId }).then(
									res1 => {
										console.log('res1', JSON.stringify(res1));
										if (res1.errno === 0) {
											res1.data.pictures = 'http://' + res1.data.pictures;
											this.films.push(res1.data);
											console.log('this.films', JSON.stringify(this.films));

											this.num = this.films.length;
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
