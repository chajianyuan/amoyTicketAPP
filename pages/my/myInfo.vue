<template>
	<view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-emojiflashfill text-pink"></text>
					<text class="text-grey">头像</text>
				</view>
				<view class="action" @click="chooseImg">
					<view
						class="cu-avatar radio shadow xs"
						:style="{
							backgroundImage: userInfo.photo
								? 'url(' + userInfo.photo + ')'
								: 'url(http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg)'
						}"
					></view>
				</view>
			</view>
			<view class="cu-item arrow" @click="openDialog()">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">用户名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.account }}</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content"><text class="text-grey">手机号</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.telephone }}</text>
				</view>
			</view>
			<view class="cu-item arrow" v-if="userInfo.wechatInfo">
				<view class="content"><text class="text-grey">微信昵称</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.wechatInfo.nickName }}</text>
				</view>
			</view>
			<view class="cu-item arrow" v-if="userInfo.wechatInfo">
				<view class="content"><text class="text-grey">城市</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.wechatInfo.city }}市</text>
				</view>
			</view>
		</view>
		<view class="bindWechat" v-if="!userInfo.wechatInfo"><button class="cu-btn bg-gradual-red margin-tb-sm lg" @click="bindWechat">绑定微信</button></view>
		<view class="bindWechat"><button class="cu-btn bg-gradual-red lg" @click="confirmUpdata">确认修改</button></view>
		<view class="cu-modal" :class="modalName == 'DialogModel1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end"><view class="content">输入用户名</view></view>
				<view class="padding-xl"><input v-model="account" /></view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="okModal">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { updateUser, findUserById } from '../../api/user.js';
export default {
	data() {
		return {
			userInfo: {},
			wechatShow: true,
			modalName: null,
			account: ''
		};
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userinfo');
		if (!this.userInfo.wechatInfo) {
			this.wechatShow = true;
		}
	},
	methods: {
		openDialog() {
			console.log('ggggggg');
			this.modalName = 'DialogModel1';
		},
		hideModal() {
			this.modalName = null;
		},
		okModal() {
			this.modalName = null;
			this.userInfo.account = this.account;
		},
		chooseImg() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					console.log('res' + JSON.stringify(res));
					if (res.errMsg === 'chooseImage:ok') {
						console.log('ffffffffff')
						uni.uploadFile({
							url: 'https://www.sujunqiang.work/fastDfs/uploadFile', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								user: 'test'
							},
							success: res1 => {
								console.log('res1' + JSON.stringify(res1));
								if (res1.statusCode === 200) {
									console.log(JSON.parse(res1.data).URL);
									this.userInfo.photo = 'http://' + JSON.parse(res1.data).URL;
									console.log('this.userInfo.photo' + JSON.stringify(this.userInfo.photo));
								}
							},
							err:err=>{
								console.log('err',JSON.stringify(err))
							}
						});
					}
				}
			});
		},
		async bindWechat() {
			console.log('wwwwwwwwww');
			this.userInfo.wechatInfo = await this.outh();
			console.log('this.userInfo.wechatInfo' + JSON.stringify(this.userInfo.wechatInfo));
			this.wechatShow = false;
		},
		outh() {
			return new Promise((resolve, reject) => {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log('res' + JSON.stringify(res));
						if (~res.provider.indexOf('weixin')) {
							console.log('res');
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('loginRes' + JSON.stringify(loginRes));
									if (loginRes.errMsg === 'login:ok') {
										console.log('ddddddddddddd');
										uni.getUserInfo({
											provider: 'weixin',
											success: res2 => {
												console.log('res1' + JSON.stringify(res2));
												if (res2.errMsg === 'getUserInfo:ok') {
													resolve(res2.userInfo);
												}
											}
										});
									}
								}
							});
						}
					}
				});
			});
		},
		confirmUpdata() {
			console.log('userInfo' + JSON.stringify(this.userInfo));
			updateUser(this.userInfo).then(
				res => {
					console.log('res' + JSON.stringify(res));
					if (res.errno === 0) {
						uni.showToast({
							title: '修改个人信息成功',
							duration: 2000
						});
						findUserById({ _id: this.userInfo._id }).then(res1 => {
							if (res1.errno === 0) {
								console.log('res.data' + JSON.stringify(res1.data));
								uni.setStorageSync('userinfo', res1.data);
							}
						});
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
.bindWechat {
	text-align: center;
	margin: 10px auto;
	width: 80%;
}
.bindWechat button {
	width: 100%;
}
</style>
