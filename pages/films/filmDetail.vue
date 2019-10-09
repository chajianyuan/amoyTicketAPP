<template>
	<view>
		<view class="cu-card radio case margin-top">
			<view class="cu-item shadow">
				<view class="image margin" style="width:130px">
					<image :src="film.pictures" mode="aspectFill" style="height: 200px;"></image>
					<view class="margin-top-xs margin-right-xs cu-tag gray sm radius text-xs" v-if="film.dimensional === '3D'">{{ film.dimensional }} IMAX</view>
					<view class="margin-top-xs margin-right-xs cu-tag gray sm radius" v-else-if="film.dimensional === '2D'">{{ film.dimensional }} 中国巨幕</view>
				</view>
				<view style="margin-left: 160px;margin-top: -210px;">
					<!-- <image :src="film.pictures"
					 mode="aspectFill" style="height: 200px;"></image>
					 <view class="margin-top-xs margin-right-xs cu-tag gray sm radius text-xs" v-if="film.dimensional === '3D'">{{ film.dimensional }} IMAX</view>
					 <view class="margin-top-xs margin-right-xs cu-tag gray sm radius" v-else-if="film.dimensional === '2D'">{{ film.dimensional }} 中国巨幕</view> -->
					<view class="desc">
						<view class="text-content text-bold">
							<text class="text-xxl">{{ film.filmName }}</text>
						</view>
						<view class="text-content">
							<text class="text-gray text-sm">{{ film.type }}/{{ film.duration }}</text>
						</view>
						<view class="text-content">
							<text class="text-gray text-sm">{{ film.showTime }}中国大陆上映</text>
						</view>
						<view class="text-content">
							<text class="text-black text-sm">{{ film.wantSeeNum }}人想看</text>
						</view>
						<view class="text-content">
							<view>
								<text class="text-xl">{{ film.score }}</text>
								<text class="icon-favorfill text-orange" v-for="index in num" :key="index"></text>
								<text class="icon-favor text-orange" v-for="index in last" :key="index"></text>
							</view>
							<view><text class="text-gray text-sm">淘影票评分</text></view>
						</view>
					</view>
				</view>
				<view style=" margin:80px 20px 0;" v-if="seen && seen.status !== 0">
					<button class="cu-btn round shadow bg-gray" style="width: 130px;" @click="wantSeen(1)" v-show="!btnShow">
						<text class="icon-likefill text-gray text-xl"></text>
						<text class="text-xl">想看</text>
					</button>
					<button class="cu-btn round shadow line-orange" style="width: 130px;" @click="wantSeen(2)" v-show="btnShow">
						<text class="icon-likefill text-red text-xl"></text>
						<text class="text-xl text-orange">我想看</text>
					</button>
					<button class="cu-btn round shadow bg-gray" style="margin-left: 30px;width: 130px;" v-if="!seen.status || seen.status !== 0" @click="wantSeen(0)">
						<text class="icon-favorfill text-gray text-xl"></text>
						<text class="text-xl">看过</text>
					</button>
				</view>
				<view style=" margin:80px 20px 0;" v-else-if="seen.status === 0">
					<button class="cu-btn radio shadow line-orange" style="width: 95%;height: 50px;">
						<text class="text-xl text-black">我看过</text>
						<text class="icon-favorfill text-orange" v-for="index in num1" :key="index"></text>
						<text class="icon-favor text-orange" v-for="index in last1" :key="index"></text>
						<text class="text-yellow" v-if="seen.score">{{ seen.score }}分</text>
					</button>
				</view>

				<view class="grid text-center margin-top">
					<view class="cu-card case">
						<view class="cu-item">
							<view class="image"><image src="../../static/people1.jpg" style="width: 70px;height: 100px;"></image></view>
							<view class="text-black">
								<text class="text-cut sm text-sm">导演 {{ film.director }}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case">
						<view class="cu-item">
							<view class="image"><image src="../../static/people2.jpg" style="width: 70px;height: 100px;"></image></view>
							<view class="text-black">
								<text class="text-cut sm text-sm">演员 {{ film.performer1 }}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case">
						<view class="cu-item">
							<view class="image"><image src="../../static/people3.jpg" style="width: 70px;height: 100px;"></image></view>
							<view class="text-black">
								<text class="text-cut sm text-sm">演员 {{ film.performer2 }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="bg-img">
					<image src="../../static/like.png" style="width: 100px;height: 100px;margin: 0 auto;"></image>
					<br />
					<text class="text-sm text-gray">成功添加至我想看的电影中</text>
				</view>
				<view class="cu-bar bg-white"><view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view></view>
			</view>
		</view>
		<view v-if="film.status === 0" style="bottom: 0;position: fixed;width: 100%;" @click="goFindCinema">
			<button class="bg-gradual-red" style="width: 100%;">选座购票</button>
		</view>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
import { findFilmById, updateFilm } from '../../api/film.js';
import { findMyFilmByFilmIdUserId, addMyFilm, deleteMyFilm, updateMyFilm, findFilmByUserId } from '../../api/myFim.js';
export default {
	data() {
		return {
			filmId: '',
			film: {},
			num: 0,
			last: 5,
			num1: 0,
			last1: 5,
			userInfo: {},
			seen: {},
			btnShow: false,
			status: 0,
			myFilmId: '',
			modalName: null,
			films: []
		};
	},
	onLoad(option) {
		console.log('option' + JSON.stringify(option));
		this.filmId = option.filmId;
		this.getFilm();
		this.userInfo = uni.getStorageSync('userinfo');
		this.getMyFilm();
		this.findFilms();
	},
	components: { uniRate },
	methods: {
		findFilms() {
			findFilmByUserId({ userId: this.userInfo._id }).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						this.films = res.data;
					}
				},
				err => {
					console.log('err', JSON.stringfy(err));
				}
			);
		},
		getFilm() {
			console.log('this.filmId', JSON.stringify(this.filmId));
			findFilmById({ id: this.filmId }).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						if (res.data.dimensional === 0) {
							res.data.dimensional = '3D';
						} else {
							res.data.dimensional = '2D';
						}
						console.log('parseInt(res.data.score)', JSON.stringify(parseInt(res.data.score)));
						if (parseInt(res.data.score) == 10 && res.data.score) {
							console.log('1');
							this.num = 5;
							this.last = 0;
						} else if (8 <= parseInt(res.data.score) < 10 && res.data.score) {
							console.log('2');
							this.num = 4;
							this.last = 1;
						} else if (6 <= parseInt(res.data.score) < 8 && res.data.score) {
							console.log('3');
							this.num = 3;
							this.last = 2;
						} else if (4 <= parseInt(res.data.score) < 6 && res.data.score) {
							console.log('4');
							this.num = 2;
							this.last = 3;
						} else if (0 < parseInt(res.data.score) < 4 && res.data.score) {
							console.log('5');
							this.num = 1;
							this.last = 4;
						}
						let arr = res.data.performer.trim().split(' ');
						res.data.performer1 = arr[0];
						res.data.performer2 = arr[1];
						this.film = res.data;
						this.film.pictures = 'http://' + this.film.pictures;
						console.log('this.film',JSON.stringify(this.film))
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		},
		getMyFilm() {
			let postData = {
				userId: this.userInfo._id,
				filmId: this.filmId
			};
			findMyFilmByFilmIdUserId(postData).then(
				res => {
					if (res.errno === 0) {
						console.log('res.data', JSON.stringify(res.data));
						this.seen = res.data;
						if (res.data.score) {
							if (parseInt(res.data.score) == 10 && res.data.score) {
								console.log('1');
								this.num1 = 5;
								this.last1 = 0;
							} else if (8 <= parseInt(res.data.score) < 10 && res.data.score) {
								console.log('2');
								this.num1 = 4;
								this.last1 = 1;
							} else if (6 <= parseInt(res.data.score) < 8 && res.data.score) {
								console.log('3');
								this.num1 = 3;
								this.last1 = 2;
							} else if (4 <= parseInt(res.data.score) < 6 && res.data.score) {
								console.log('4');
								this.num1 = 2;
								this.last1 = 3;
							} else if (0 < parseInt(res.data.score) < 4 && res.data.score) {
								console.log('5');
								this.num1 = 1;
								this.last1 = 4;
							}
						}
						this.myFilmId = res.data._id;
						if (res.data.status === 1) {
							this.btnShow = true;
						}
					}
					console.log('res' + JSON.stringify(res));
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		},
		wantSeen(e) {
			this.status = e;
			console.log('e', JSON.stringify(e));
			if (e === 1) {
				this.btnShow = !this.btnShow;
				this.choose();
			} else if (e === 2) {
				this.btnShow = !this.btnShow;
				this.delete();
			} else if (e === 0) {
				let ids = [];
				this.films.forEach(item => {
					ids.push(item.filmId);
				});
				console.log('ids', JSON.stringify(ids));
				console.log('ids', JSON.stringify(ids));
				if (ids.indexOf(this.filmId) === -1) {
					console.log('11111111');
					let postData = {
						userId: this.userInfo._id,
						filmId: this.filmId,
						status: this.status
					};
					addMyFilm(postData).then(
						res => {
							console.log('res', JSON.stringify(res));
							if (res.errno === 0) {
							}
						},
						err => {
							console.log('err', JSON.stringify(err));
						}
					);
				} else {
					console.log('2222222222');
					this.updateNyFilm();
				}
				uni.navigateTo({
					url: '../my/score?filmId=' + this.filmId
				});
			}
		},
		choose() {
			let postData = {
				userId: this.userInfo._id,
				filmId: this.filmId,
				status: this.status
			};
			addMyFilm(postData).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						this.modalName = 'Image';
						this.film.wantSeeNum = this.film.wantSeeNum + 1;
						this.update(this.film);
					}
				},
				err => {
					console.log('err', JSON.stringify(err));
				}
			);
		},
		delete() {
			deleteMyFilm({ id: this.myFilmId }).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						this.film.wantSeeNum = this.film.wantSeeNum - 1;
						this.update(this.film);
					}
				},
				err => {
					console.log('err', JSON.stringify(err));
				}
			);
		},
		update(data) {
			updateFilm(data).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						this.getFilm();
						this.getMyFilm();
					}
				},
				err => {
					console.log('err', JSON.stringify(err));
				}
			);
		},
		updateNyFilm() {
			this.seen.status = this.status;
			console.log('this.seen', JSON.stringify(this.seen));
			updateMyFilm(this.seen).then(
				res => {
					if (res.errno === 0) {
					}
				},
				err => {
					console.log('err', JSON.stringify(err));
				}
			);
		},
		hideModal() {
			this.modalName = null;
		},
		goFindCinema() {
			uni.navigateTo({
				url: '../films/findCinema?id=' + this.film._id + '&filmName=' + this.film.filmName
			});
		}
	}
};
</script>

<style></style>
