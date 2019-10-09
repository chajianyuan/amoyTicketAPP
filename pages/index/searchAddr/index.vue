<template>
	<view>
		<view class="cu-bar bg-white search fixed">
			<view class="search-form round">
				<text class="icon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" v-model="key" confirm-type="search" />
			</view>
			<view class="action"><button class="cu-btn bg-gradual-red shadow-blur round" @click="search">搜索</button></view>
		</view>
		<scroll-view scroll-y class="indexes" scroll-into-view="indexes-item" style="height:100vh;margin-top: 40px;" scroll-with-animation="true" enable-back-to-top="true">
			<block v-for="(item, index) in address" :key="index">
				<view class="padding indexItem-index" :id="indexes - index" :data-index="item">{{ index }}</view>
				<view class="cu-list menu-avatar no-padding">
					<view class="cu-item bg-white padding" v-for="(item1, index1) in item" :key="index1" v-for-index="index1" @click="selectCity(item)">
						<view class="cu-avatar round">{{ index }}</view>
						<view class="content">
							<view class="text-grey">{{ item1.cityName }}</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" style="height:100vh">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" catchtouchmove="tMove">
				<view class="indexBar-item" v-for="(item, index) in address" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">{{ index }}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">{{ listCur }}</view>
	</view>
</template>

<script>
import { getAllCity, findCityByKey } from '../../../api/city.js';
import bus from '../../../utils/bus.js';
export default {
	data() {
		return {
			address: {},
			citys: [],
			city: '',
			key: '',
			listCur: ''
		};
	},
	onShow() {
		let map = new Map();
		let dest = [];
		getAllCity().then(
			res => {
				console.log('res' + JSON.stringify(res));
				if (res.errno === 0) {
					this.citys = res.data;
					console.log('city' + JSON.stringify(this.citys));
					this.citys.forEach(item => {
						console.log('dest' + JSON.stringify(dest));
						if (!map[item.upper]) {
							console.log('111');
							dest.push(item);
							map[item.upper] = dest;
							dest = [];
						} else {
							map[item.upper].push(item);
						}
					});
					console.log('map' + JSON.stringify(map));
					this.address = map;
				}
			},
			err => {
				console.log('err' + JSON.stringify(err));
			}
		);
	},
	methods: {
		selectCity(e) {
			console.log('e' + JSON.stringify(e));
			this.city = e[0];
			uni.setStorageSync('city', this.city);
			bus.$emit('city', this.city);
			uni.navigateBack({
				delta: 1
			});
		},
		search() {
			this.address = {}
			this.citys = []
			console.log('key', JSON.stringify(this.key));
			let map = new Map();
			let dest = [];
			findCityByKey({ key: this.key }).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						this.citys = res.data;
						console.log('city' + JSON.stringify(this.citys));
						this.citys.forEach(item => {
							console.log('dest' + JSON.stringify(dest));
							if (!map[item.upper]) {
								console.log('111');
								dest.push(item);
								map[item.upper] = dest;
								dest = [];
							} else {
								map[item.upper].push(item);
							}
						});
						console.log('map' + JSON.stringify(map));
						this.address = map;
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
</style>
