<template>
	<view>
		<view style="background-color: rgb(254,76,98)">
			<!-- style="height: 414rpx;background-color: rgb(254,76,98);" -->
			<view class="cu-list menu padding-tb-xl margin-left-sm" style="height: 90px;">
				<view class="text-white cu-item arrow" style="background-color: rgb(254,76,98)">
					<view class="content" v-if="userInfo" @click="goMyInfo">
						<view
							class="cu-avatar round xl margin-xs sm-border"
							:style="{
								backgroundImage: userInfo.photo
									? 'url(' + userInfo.photo + ')'
									: 'url(http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg)'
							}"
						></view>
						<!-- <view class="cu-tag badge {{index%2==0?'icon-female bg-pink':'icon-male bg-blue'}}"></view> -->
						<text class="margin-top text-xl margin-left-xl" v-if="userInfo.account">{{ userInfo.account }}</text>
						<text class="margin-top-0 text-xl margin-left" v-else-if="userInfo.telephone">{{ userInfo.telephone }}</text>
					</view>
					<view class="content" v-else>
						<view>
							<view
								class="cu-avatar round xl"
								:style="{
									backgroundImage: userInfo.photo
										? 'url(' + userInfo.photo + ')'
										: 'url(http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg)'
								}"
							></view>
							<text class="padding text-xxl text-center" @click="goLogin">点击登录</text>
						</view>
					</view>
				</view>
			</view>
			<view class=" radius"><image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-black response" style="height:150upx"></image></view>
		</view>

		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="./like" open-type="navigate"><text class="text-grey">想看的电影</text></navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="./seen" open-type="navigate"><text class="text-grey">看过的电影</text></navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="./notSeen" open-type="navigate"><text class="text-grey">已买还未看的电影</text></navigator>
			</view>
		</view>

		<view class="signOutBtn" v-if="userInfo"><button class="cu-btn bg-gradual-red margin-tb-sm lg" @click="userSignOut">退出登录</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {}
		};
	},
	onShow() {
		console.log('onShow');
		this.userInfo = uni.getStorageSync('userinfo');
		console.log('userInfo' + JSON.stringify(this.userInfo));
	},
	methods: {
		// 跳转到登录页面
		goLogin() {
			uni.navigateTo({
				url: '../login/index'
			});
		},
		//退出登录
		userSignOut() {
			uni.removeStorageSync('userinfo');
			uni.removeStorageSync('token');
			uni.switchTab({
				url: '../index/index'
			});
			uni.showToast({
				title: '退出登录成功',
				duration: 2000
			});
		},
		goMyInfo() {
			uni.navigateTo({
				url: './myInfo'
			});
		}
	}
};
</script>

<style>
/* @import './../../common/colorui.wxss'; */
/* @import './../../common/main.wxss'; */
@import './../../common/animation.css';
image[class*='gif-'] {
	border-radius: 6upx;
	display: block;
}

.tabbar {
	margin-bottom: 0px;
	position: fixed;
	bottom: 0;
	width: 100%;
}
.cu-avatar {
	align-items: center;
}
.photoStyle {
	text-align: center;
}

.signOutBtn {
	text-align: center;
	margin: 10px auto;
	width: 80%;
}
.signOutBtn button {
	width: 100%;
}
</style>
