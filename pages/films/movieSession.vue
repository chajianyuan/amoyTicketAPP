<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"><view class="top_view"></view></view>
		<!-- #endif -->
		<view class="cu-list bg-white" style="padding: 10px 0;">
			<view class="cu-item border " style="padding-top: 5px;">
				<view class="content margin-left-sm text-xxl">
					<text class="icon-back text-blue" @click="goBack"></text>
					<text class="wenzi text-black text-xxl">{{ cinema.cinemaName }}</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu solid-top" style="margin-top: -3px;">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>{{ cinema.cinemaName }}</view>
					<view class="text-gray text-sm">{{ cinema.address }}</view>
					<view></view>
				</view>
				<view class="action text-xxl" @click="goMap(cinema.lng, cinema.lat)"><text class="text-blue icon-location text-xsl"></text></view>
			</view>
		</view>
		<view>
			<ynGallery
				:galleryheight="165"
				bkstart="#000000"
				bkend="#000000"
				:imgviewwidth="85"
				:imgviewheight="105"
				:showbadge="true"
				badegtype="trian"
				badegwidth="25"
				badegheight="25"
				:showdec="true"
				:images="imgs"
				@clickimg="onclickimg"
			></ynGallery>
			<view class="text-center">
				<text style="font-size: 15px;">{{ Msg.filmName }}</text>
				<br />
				<text class="text-sm text-gray">{{ Msg.duration }} |</text>
				<text class="text-sm text-gray">{{ Msg.director }} {{ Msg.performer }}</text>
			</view>
		</view>
		<view class="bg-white">
			<view class="uni-padding-wrap uni-common-mt tabHead">
				<uni-segmented-control :current="current" :values="days" @clickItem="onClickItem" style-type="text" active-color="#0081ff"></uni-segmented-control>
			</view>
			<view>
				<view class="cu-list menu">
					<view class="cu-item" v-for="(item, index) in sessions" :key="index" @click="goCinemaSeat(item)">
						<view class="content padding-tb-sm">
							<view>
								<text class="text-xl">{{ item.playTime }}</text>
							</view>
							<!-- <view class="text-gray text-sm">{{ cinema.address }}</view> -->
							<view class="text-gray text-sm">
								散场{{ item.endTime }}
								<text style="margin-left: 20px;">{{ item.hallName }}</text>
							</view>
							<view></view>
						</view>
						<view class="action text-xxl"><button class="cu-btn round line-orange shadow">购票</button></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import ynGallery from '@/components/YnComponents/ynGallery/ynGallery.vue';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import { getTodayTom, compare } from '../../utils/dataChange.js';
import { findCinemaById } from '../../api/cinema.js';
import { findFilmById } from '../../api/film.js';
import { findSessionByDateCineFilm } from '../../api/session.js';
import { findHallById } from '../../api/hall.js';
export default {
	data() {
		return {
			cinema: {},
			sh: 0,
			Msg: {},
			title: 'Hello',
			// 画廊示例数据
			testimgs: [],
			imgs: [],
			current: 0,
			days: [],
			cinemaId: '',
			filmId: '',
			currentDate: '',
			sessions: [],
			dimensional: ''
		};
	},
	components: {
		ynGallery,
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
		this.currentDate = getTodayTom(0, '-');
	},
	onLoad(option) {
		// this.testimgs = [];
		console.log('option' + JSON.stringify(option));
		this.cinemaId = option.cinemaId;
		this.getCinema();
		if (option.filmId) {
			this.filmId = option.filmId;
			findFilmById({ id: option.filmId }).then(
				res => {
					console.log('res-------------' + JSON.stringify(res));
					if (res.errno === 0) {
						this.testimgs[0] = res.data;
						// this.findSession();
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		}
		console.log('this.testimgs' + JSON.stringify(this.testimgs));
	},
	methods: {
		// 获得电影信息
		getCinema() {
			console.log('this.testimgs' + JSON.stringify(this.testimgs));
			let postData = {
				id: this.cinemaId
			};
			findCinemaById(postData).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						this.cinema = res.data;
						this.cinema.filmId.forEach(item => {
							let index = 0;
							let postData1 = {
								id: item.id
							};
							findFilmById(postData1).then(res1 => {
								console.log('res1' + JSON.stringify(res1));
								// console.log('this.testimgs[0]' + JSON.stringify(this.testimgs[0]._id));
								if (res1.errno === 0) {
									// console.log('res1.data._id !== this.testimgs[0]._id' + JSON.stringify(this.testimgs));
									if (this.filmId) {
										console.log('aaaaaaa');
										if (this.testimgs[0] && res1.data._id !== this.testimgs[0]._id) {
											console.log('fffffffffff');
											this.testimgs.push(res1.data);
										} else if (!this.testimgs[0]) {
											console.log('dddddddddddd');
											this.testimgs.push(res1.data);
										}
									} else {
										console.log('bbbbbbbbb');
										this.testimgs.push(res1.data);
									}

									this.Msg = this.testimgs[0];
									if (this.filmId === '') {
										console.log('this.filmId');
										this.filmId = this.testimgs[0]._id;
									}
									console.log('this.testimgs' + JSON.stringify(this.testimgs));
									this.findSession();
									this.setimgs();
									// }
								}
							});
						});
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		},
		goMap(lng, lat) {
			uni.openLocation({
				latitude: parseFloat(lat),
				longitude: parseFloat(lng),
				success: function() {
					console.log('success');
				}
			});
		},
		onclickimg(imgviewobj) {
			console.log('111' + JSON.stringify(imgviewobj));
			if (imgviewobj.index != undefined) this.Msg = `${imgviewobj.index}`;
			this.filmId = imgviewobj._id;
			this.Msg = imgviewobj;
			this.findSession();
			// this.filmId = e._id;
			this.dimensional = imgviewobj.dimensional;
		},
		setimgs() {
			console.log('=======================================' + JSON.stringify(this.testimgs));
			var imgs = [];
			for (let i in this.testimgs) {
				if (this.testimgs[i].dimensional === 0) {
					this.testimgs[i].dimensional = '3D';
				} else {
					this.testimgs[i].dimensional = '2D';
				}
				let imgobj = {
					dec: '', //图像描述信息
					badeg: '', //角标文字
					badegcolor: '#000000', //角标颜色
					url: '', //图源
					dominant: '', //主色s
					_id: '',
					filmName: '',
					duration: '',
					director: '',
					performer: '',
					dimensional: ''
				};
				imgobj.url = 'http://' + this.testimgs[i].pictures;
				console.log('imgobj.url' + JSON.stringify(imgobj.url));
				imgobj.dominant = this.retcolor(); //随机主色
				imgobj.dec = i; //描述
				imgobj.badeg = '惠'; //角标文字
				imgobj.badegcolor = 'orange'; //角标颜色
				imgobj._id = this.testimgs[i]._id;
				imgobj.filmName = this.testimgs[i].filmName;
				imgobj.duration = this.testimgs[i].duration;
				imgobj.director = this.testimgs[i].director;
				imgobj.performer = this.testimgs[i].performer;
				imgobj.dimensional = this.testimgs[i].dimensional;
				imgs.push(imgobj);
			}
			this.imgs = imgs;
		},
		retcolor() {
			let color = '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
			return color;
		},
		onClickItem(e) {
			console.log('eee' + JSON.stringify(e));
			if (e === 0) {
				this.currentDate = getTodayTom(0, '-');
			} else if (e === 1) {
				this.currentDate = getTodayTom(1, '-');
			} else if (e === 2) {
				this.currentDate = getTodayTom(2, '-');
			}
			this.findSession();
		},
		findSession() {
			this.sessions = [];
			console.log('eeeeeee' + JSON.stringify(this.filmId));
			let postData = {
				date: this.currentDate,
				cinemaId: this.cinemaId,
				filmId: this.filmId
			};
			console.log('postSata' + JSON.stringify(postData));
			findSessionByDateCineFilm(postData).then(
				res => {
					console.log('res===================' + JSON.stringify(res));
					
					console.log('res===================' + JSON.stringify(res));
					if (res.errno === 0) {
						res.data.forEach(item => {
							findHallById({ id: item.hallId }).then(res1 => {
								// console.log('res1' + JSON.stringify(res1));
								if (res1.errno === 0) {
									item.hallName = res1.data.hallName;
									// console.log('res.data', JSON.stringify(item));
									let boolean = compare(item.playTime);
									if (boolean) {
										let arr = item.playTime.split(' ');
										item.playTime = arr[arr.length - 1];
										let arr1 = item.endTime.split(' ');
										item.endTime = arr1[arr1.length - 1]
										this.sessions.push(item);
									}
									this.sessions.sort((a,b)=>{
										return a.playTime>b.playTime ? 1:-1
									})
									// this.sessions = res.data

									// console.log('this.sessions' + JSON.stringify(this.sessions));
								}
							});
							// console.log('item.hallId' + JSON.stringify(item.hallId));
						});

						// console.log('this.sessions' + JSON.stringify(this.sessions));
						// this.setimgs()
					}
				},
				err => {
					console.log('err' + JSON.stringify(err));
				}
			);
		},
		// 跳转到选座页面
		goCinemaSeat(data) {
			console.log('data' + JSON.stringify(data));
			uni.navigateTo({
				url: './cinemaSeat?sessionId=' + data._id + '&filmId=' + data.filmId + '&cinemaId=' + data.cinemaId + '&hallId=' + data.hallId+'&date='+this.currentDate
			});
		},
		goBack() {
			uni.navigateBack({
				delta: 0
			});
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
.wenzi {
	font-family: 'Courier New', Courier, monospace;
}
</style>
