<template>
	<view class="content">
		<view class="header">
			<view class="cu-bar search bg-white">
				<view
					class="cu-avatar round"
					:style="{
						backgroundImage:
							userInfo && userInfo.photo
								? 'url(' + userInfo.photo + ')'
								: 'url(http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg)'
					}"
					@click="goMy"
				></view>
				<view class="search-form round">
					<text class="icon-search"></text>
					<input type="text" placeholder="搜影片、影院" disabled confirm-type="search" @click="inputFocus" />
				</view>
				<view class="action bg-white" @click="selectCity">
					<text>{{ cityName }}</text>
					<text class="icon-triangledownfill"></text>
				</view>
			</view>
			<view class="swiperStyle padding">
				<swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500" style="border-radius: 20px;">
					<swiper-item v-for="(item, index) in hotMovies" :key="index" style="border-radius: 20px;"><image :src="item.pictures" mode="aspectFill"></image></swiper-item>
				</swiper>
			</view>
			<view><uni-grid :options="options" column-num="4" :showBorder="false" @click="goFilmType"></uni-grid></view>
		</view>

		<view class="hotFilm margin-top bg-white" style="font: 'FangSong';">
			<view class="cu-form-group margin-top">
				<view class="title text-black text-sl text-bold">热映影片</view>
				<view class="text-gray action" @click="goAllFilms(0)">
					全部{{ hotMovies.length }}部
					<text class="icon-right xxxl text-grey margin-left-sm"></text>
				</view>
			</view>
			<view class="cu-item arrow grid margin-bottom text-center">
				<view v-for="(hot, index) in hotMovies1" :key="index">
					<view class="cu-card case">
						<view class="cu-item">
							<view class="image" @click="goFilmDetail(hot)">
								<image :src="hot.pictures" style="width: 140px;height: 120px;"></image>
								<view class="margin-top-xs margin-right-xs cu-tag gray sm radius text-xs" v-if="hot.dimensional === '3D'">{{ hot.dimensional }} IMAX</view>
								<view class="margin-top-xs margin-right-xs cu-tag gray sm radius" v-else-if="hot.dimensional === '2D'">{{ hot.dimensional }} 中国巨幕</view>
								<view class="cu-bar bg-shadeBottom text-orange">
									<text class=" text-sm">评分{{ hot.score }}</text>
								</view>
							</view>
							<view class="text-bold">
								<text class="text-cut sm text-sm">{{ hot.filmName }}</text>
							</view>
							<view class="button text-bold" @click="goBuyTicket(hot)"><button class="cu-btn round bg-gradual-red shashadow sm">购票</button></view>
						</view>
					</view>
				</view>
				<view v-if="hotMovies.length > 3" @click="goAllFilms(0)">
					<view class="cu-card case" style="width: 50px;height: 65%;writing-mode:vertical-rl">
						<view class="cu-item"><text class="text-cut text-xl text-gray">查看更多</text></view>
					</view>
				</view>
			</view>
		</view>

		<view class="hotFilm margin-top bg-white">
			<view class="cu-form-group margin-top">
				<view class="title text-black text-bold">即将上映</view>
				<view class="text-gray action" @click="goAllFilms(1)">
					全部{{ commingMovies.length }}部
					<text class="icon-right xxxl text-grey margin-left-sm"></text>
				</view>
			</view>
			<view class="grid margin-bottom text-center">
				<view v-for="(comming, index) in commingMovies1" :key="index">
					<view class="cu-card case">
						<view class="cu-item">
							<view class="image" @click="goFilmDetail(comming)">
								<image :src="comming.pictures" style="width: 100px;height: 120px;"></image>
								<view class="margin-top-xs margin-right-xs cu-tag gray sm radius text-xs" v-if="comming.dimensional === '3D'">{{ comming.dimensional }} IMAX</view>
								<view class="margin-top-xs margin-right-xs cu-tag gray sm radius" v-else-if="comming.dimensional === '2D'">{{ comming.dimensional }} 中国巨幕</view>
								<view class="cu-bar bg-shadeBottom text-orange text-sm">
									<text class="text-center">{{ comming.wantSeeNum }}人想看</text>
								</view>
							</view>
							<view class="text-bold">
								<text class="text-cut sm ">{{ comming.filmName }}</text>
							</view>
							<view class="text-gray">
								<text class="text-cut sm ">{{ comming.showTime }}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="commingMovies.length > 3" @click="goAllFilms(1)">
					<view class="cu-card case" style="width: 50px;height: 65%;writing-mode:vertical-rl">
						<view class="cu-item"><text class="text-cut text-xl text-gray">查看更多</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import { findFilmById, findFilmsByCity, findAllFilms, findFilmByType } from '../../api/film.js';
import bus from '../../utils/bus.js';
export default {
	data() {
		return {
			films: [
				{ url: 'http://5b0988e595225.cdn.sohucs.com/images/20190528/71f8031d24ec470f9f256d828528c299.jpeg' },
				{ url: 'http://5b0988e595225.cdn.sohucs.com/images/20190528/71f8031d24ec470f9f256d828528c299.jpeg' },
				{ url: 'http://5b0988e595225.cdn.sohucs.com/images/20190528/71f8031d24ec470f9f256d828528c299.jpeg' }
			],
			hotMovies: [],
			hotMovies1: [],
			commingMovies: [],
			commingMovies1: [],
			cityModel: false,
			userInfo: {},
			cityName: '邯郸',
			cityId: '5d15b318eb5fb64a702bb2e0',
			options: [
				{ image: '../../static/dongman.png' },
				{ image: '../../static/xiju.png'},
				{ image: '../../static/dongzuo.png'},
				{ image: '../../static/qihuan.png'}
			],
			type: ''
		};
	},
	components: {
		uniGrid
	},
	onShow() {
		console.log('1111');
		this.userInfo = uni.getStorageSync('userinfo');
		if (uni.getStorageSync('city')) {
			this.cityName = uni.getStorageSync('city').cityName;
			this.cityId = uni.getStorageSync('city')._id;
		}
		this.getFilms();
	},
	methods: {
		// 获得全部电影
		getFilms() {
			this.hotMovies = [];
			this.commingMovies = [];
			findAllFilms().then(
				res => {
					if (res.errno === 0) {
						console.log('res' + JSON.stringify(res));
						res.data = [...new Set(res.data)];
						res.data.forEach(item => {
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
											if (this.hotMovies.length > 3) {
												this.hotMovies1 = this.hotMovies.slice(0, 3);
											} else {
												this.hotMovies1 = this.hotMovies;
											}
										}
										if (res1.data.status === 1) {
											this.commingMovies.push(res1.data);
											if (this.commingMovies.length > 3) {
												this.commingMovies1 = this.commingMovies.slice(0, 3);
											} else {
												this.commingMovies1 = this.commingMovies;
											}
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
		selectCity() {
			uni.navigateTo({
				url: './searchAddr/index'
			});
		},
		// 跳转到电影页面
		goAllFilms(e) {
			console.log('wwwwwww' + JSON.stringify(e));
			// let data = {
			// 	status: e,
			// 	cityId: this.cityId
			// };
			uni.setStorageSync('zhuangtai', e);
			// bus.$emit('zhuangtai', data);
			uni.switchTab({
				url: '../films/index'
			});
		},
		// 跳转到买票页面
		goBuyTicket(data) {
			// bus.$emit('status',)
			uni.navigateTo({
				url: '../films/findCinema?id=' + data._id + '&filmName=' + data.filmName + '&cityId=' + this.cityId
			});
		},
		goMy() {
			uni.switchTab({
				url: '../my/index'
			});
		},
		inputFocus() {
			console.log('wwwww');
			uni.navigateTo({
				url: '../films/searchFilmCinema'
			});
		},
		goFilmDetail(data) {
			console.log('data' + JSON.stringify(data));
			uni.navigateTo({
				url: '../films/filmDetail?filmId=' + data._id
			});
		},
		goFilmType(e) {
			console.log('e' + JSON.stringify(e));
			if (e.index === 0) {
				this.type = '动画';
			} else if (e.index === 1) {
				this.type = '喜剧';
			} else if (e.index === 2) {
				this.type = '动作';
			} else if (e.index === 3) {
				this.type = '奇幻';
			}
			uni.navigateTo({
				url: '../films/filmType?type=' + this.type
			});
		}
	}
};
</script>

<style scoped>
.search {
	background: linear-gradient(rgb(254, 76, 98), rgb(254, 100, 120));
	border-radius: 10px;
}
.action {
	opacity: 0.8;
	height: 27px;
	padding-left: 2px;
	border-radius: 15px;
}
.search-form {
	opacity: 0.8;
}

.hotFilm {
	height: 240px;
	width: 100%;
}
.flex-sub {
	top: 0;
}
.cu-card {
	height: 100%;
	width: 100px;
}
.button {
	text-align: center;
	font-family: 'Times New Roman';
}
.tabbar {
	margin-bottom: 0px;
	position: fixed;
	bottom: 0;
	width: 100%;
}
.swiperStyle {
	margin-top: -15px;
	border-radius: 15px;
}
.header {
	background: linear-gradient(rgb(254, 76, 98), white);
}
page {
	background-image: var(--gradualBlue);
	width: 100vw;
	overflow: hidden;
}
.DrawerPage {
	position: fixed;
	width: 100vw;
	height: 100vh;
	left: 0vw;
	background-color: #f1f1f1;
	transition: all 0.4s;
}
.DrawerPage.show {
	transform: scale(0.9, 0.9);
	left: 85vw;
	box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
	transform-origin: 0;
}
.DrawerWindow {
	position: absolute;
	width: 85vw;
	height: 100vh;
	left: 0;
	top: 0;
	transform: scale(0.9, 0.9) translateX(-100%);
	opacity: 0;
	pointer-events: none;
	transition: all 0.4s;
	padding: 100upx 0;
}
.DrawerWindow.show {
	transform: scale(1, 1) translateX(0%);
	opacity: 1;
	pointer-events: all;
}
.DrawerClose {
	position: absolute;
	width: 40vw;
	height: 100vh;
	right: 0;
	top: 0;
	color: transparent;
	padding-bottom: 30upx;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
	letter-spacing: 5px;
	font-size: 50upx;
	opacity: 0;
	pointer-events: none;
	transition: all 0.4s;
}
.DrawerClose.show {
	opacity: 1;
	pointer-events: all;
	width: 15vw;
	color: #fff;
}
.DrawerPage .cu-bar.tabbar .action button.cuIcon {
	width: 64upx;
	height: 64upx;
	line-height: 64upx;
	margin: 0;
	display: inline-block;
}
.DrawerPage .cu-bar.tabbar .action .cu-avatar {
	margin: 0;
}
.DrawerPage .nav {
	flex: 1;
}
.DrawerPage .nav .cu-item.cur {
	border-bottom: 0;
	position: relative;
}
.DrawerPage .nav .cu-item.cur::after {
	content: '';
	width: 10upx;
	height: 10upx;
	background-color: currentColor;
	position: absolute;
	bottom: 10upx;
	border-radius: 10upx;
	left: 0;
	right: 0;
	margin: auto;
}
.DrawerPage .cu-bar.tabbar .action {
	flex: initial;
}
</style>
