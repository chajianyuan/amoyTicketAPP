<template>
	<view>
		<view class="content padding-xl radius shadow-warp bg-white margin-top">
			<view class="text-xxl margin"><text class="text-black">手机号注册</text></view>
			<view class="cu-form-group">
				<input placeholder="请输入手机号" type="number" v-model="telephone" />
				<view class="cu-capsule radius">
					<view class="cu-tag bg-blue">+86</view>
					<view class="cu-tag line-blue">中国大陆</view>
				</view>
			</view>
			<view class="cu-form-group" v-if="!showPwd">
				<input placeholder="请输入密码" :password="isPwd" v-model="password" />
				<text class="icon-attentionforbid text-gray" @click="changeShowPwd"></text>
			</view>
			<view class="cu-form-group" v-if="showPwd">
				<input placeholder="请输入密码" v-model="password" />
				<text class="icon-attention text-gray" @click="changeShowPwd"></text>
			</view>
			<view class="cu-form-group" v-if="!showRePwd">
				<input placeholder="确认密码" :password="isRePwd" v-model="rePassword" />
				<text class="icon-attentionforbid text-gray" @click="changeShowRePwd"></text>
			</view>
			<view class="cu-form-group" v-if="showRePwd">
				<input placeholder="确认密码" v-model="rePassword" />
				<text class="icon-attention text-gray" @click="changeShowRePwd"></text>
			</view>
			<view class="registBtn" @click="userRegist"><button class="cu-btn bg-gradual-orange margin-tb-sm lg">注册</button></view>
		</view>
	</view>
</template>

<script>
import { regist } from '../../../api/user.js';
export default {
	data() {
		return {
			showPwd: false,
			password: '',
			isPwd: true,
			showRePwd: false,
			rePassword: '',
			isRePwd: true,
			telephone: ''
		};
	},
	methods: {
		changeShowPwd() {
			this.showPwd = !this.showPwd;
		},
		changeShowRePwd() {
			this.showRePwd = !this.showRePwd;
		},
		userRegist() {
			console.log('1111' + JSON.stringify(this.password));
			console.log('1111' + JSON.stringify(this.rePassword));
			if (this.password === this.rePassword) {
				console.log('两次密码一致');
				if (this.telephone.length === 11) {
					let postData = {
						telephone: this.telephone,
						password: this.password,
						roles: 1
					};
					regist(postData).then(
						res => {
							console.log('res' + JSON.stringify(res));
							if(res.errno===0){
								uni.navigateBack({
									delta:1
								})
							}
						},
						err => {
							console.log('err', err);
						}
					);
				} else {
					uni.showToast({
						title: '手机号不正确',
						icon: 'none'
					});
				}
			} else {
				console.log('两次密码不一致');
				uni.showToast({
					title: '两次密码不一致',
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style>
.content {
	margin: 100px 10px;
}
.registBtn {
	text-align: center;
	margin: 10px auto;
	width: 80%;
}
.registBtn button {
	width: 100%;
}
</style>
