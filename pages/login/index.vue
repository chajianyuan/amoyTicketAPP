<template>
	<view class="login bg-white">
		<view class="photo">
			<view class=" cu-avatar xl round margin-top margin-xs" style="background-image:url(http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg);"></view>
		</view>
		<view class="margin-top">
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" type="number" v-model="telephone" />
				<view class="cu-capsule radius">
					<view class="cu-tag bg-blue">+86</view>
					<view class="cu-tag line-blue">中国大陆</view>
				</view>
			</view>
			<view class="cu-form-group" v-if="!showPwd">
				<view class="title">密码</view>
				<input placeholder="请输入密码" :password="isPwd" v-model="password" @click="changePwd" />
				<text class="icon-attentionforbid text-gray" @click="changeShowPwd"></text>
			</view>
			<view class="cu-form-group" v-if="showPwd">
				<view class="title">密码</view>
				<input placeholder="请输入密码" v-model="password" @focus="changePwd" />
				<text class="icon-attention text-gray" @click="changeShowPwd"></text>
			</view>
			<!-- <view class="drag"><drag></drag></view> -->
			<view class="loginBtn" @click="userLogin"><button class="cu-btn bg-gradual-orange margin-tb-sm lg">登录</button></view>
			<view class="loginBtn" @click="userRegist"><text class="text-blue">还没有账号，赶紧去注册</text></view>
		</view>
		<view class="wexinBtn margin-tb-sm text-center">
			<button class="cu-btn round text-gray lg shadow" @click="weLogin">
				<text class="icon-weixin text-xsl text-green"></text>
				微信快速登录
			</button>
		</view>
	</view>
</template>

<script>
import drag from '@/components/drag/index.vue';
import { login, wechatLogin } from '../../api/user.js';
export default {
	data() {
		return {
			isPwd: true,
			showPwd: false,
			password: ''
		};
	},
	components: {
		drag: drag
	},
	methods: {
		changeShowPwd() {
			this.showPwd = !this.showPwd;
		},
		changePwd(e) {
			console.log('1111', e);
		},
		userLogin() {
			let postData = {
				telephone: this.telephone,
				password: this.password
			};
			login(postData).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('userinfo', res.data.userInfo);
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
						uni.switchTab({
							url: '../index/index'
						});
					} else {
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						});
					}
				},
				err => {
					console.log('err', err);
					uni.showToast({
						title: '登录失败',
						icon: 'none'
					});
				}
			);
		},
		// 跳转到登录页面
		userRegist() {
			uni.navigateTo({
				url: './regist/index'
			});
		},
		weLogin() {
			uni.login({
				provider: 'weixin',
				success: res => {
					console.error('res：' + JSON.stringify(res));
					uni.request({
						url: `https://api.weixin.qq.com/sns/userinfo?access_token=${res.authResult.access_token}&openid=${res.authResult.openid}`,
						success: wechatreturn => {
							uni.getUserInfo({
								provider: 'weixin',
								withCredentials: true,
								success: infoRes => {
									console.log('infoRes' + JSON.stringify(infoRes));
									wechatLogin({ unionId: infoRes.userInfo.unionId })
										.then(res1 => {
											if (res1.errno === 0 && JSON.stringify(res1.data.userInfo) !== '{}') {
												console.log('res1' + JSON.stringify(res1));
												uni.setStorageSync('token', res1.data.token);
												uni.setStorageSync('userinfo', res1.data.userInfo);
												uni.showToast({
													title: '登录成功',
													duration: 2000
												});
												uni.switchTab({
													url: '../index/index'
												});
											} else {
												uni.showToast({
													title: '登录失败',
													icon: 'none'
												});
											}
										})
										.catch(err1 => {
											console.log(JSON.stringify(err1));
											uni.showToast({
												title: '登录失败',
												icon: 'none'
											});
										});
								},
								fail(err) {
									console.log(JSON.stringify(err));
									uni.showToast({
										title: '登录失败',
										icon: 'none'
									});
								}
							});
						}
					});
				},
				fail: err => {
					console.error('授权登录失败：' + JSON.stringify(err));
					uni.showToast({
						title: '登录失败',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style>
.login {
	width: 100%;
	height: 100vh;
}
.photo {
	text-align: center;
}
.cu-avatar {
	margin-top: 50px;
	margin-left: auto;
	margin-right: auto;
}
.wexinBtn {
	width: 100%;
	text-align: center;
	position: fixed;
	bottom: 10px;
}
.loginBtn {
	text-align: center;
	margin: 10px auto;
	width: 80%;
}
.loginBtn button {
	width: 100%;
}
.drag {
	margin-top: 20px;
}
</style>
