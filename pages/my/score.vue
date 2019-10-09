<template>
	<view class="bg-white">
		<view class="solid-bottom padding" style="text-align: center;">
			<text class="text-xl">
				我的评分
				<text class="text-orange">{{ score }}</text>
				分
			</text>
			<view class="text-center text-xxl">
				<text class="icon-favor text-gray" @click="clickStar1" v-show="show1"></text>
				<text class="icon-favorfill text-yellow" @click="clickStar1" v-show="!show1"></text>
				<text class="icon-favor text-gray" @click="clickStar2" v-show="show2"></text>
				<text class="icon-favorfill text-yellow" @click="clickStar2" v-show="!show2"></text>
				<text class="icon-favor text-gray" @click="clickStar3" v-show="show3"></text>
				<text class="icon-favorfill text-yellow" @click="clickStar3" v-show="!show3"></text>
				<text class="icon-favor text-gray" @click="clickStar4" v-show="show4"></text>
				<text class="icon-favorfill text-yellow" @click="clickStar4" v-show="!show4"></text>
				<text class="icon-favor text-gray" @click="clickStar5" v-show="show5"></text>
				<text class="icon-favorfill text-yellow" @click="clickStar5" v-show="!show5"></text>
			</view>
		</view>
		<view class=" margin-top">
			<view class="cu-form-group align-start"><textarea maxlength="-1" :disabled="modalName != null" v-model="comment" placeholder="请输入影评"></textarea></view>
		</view>
		<view style="bottom: 0;position: fixed;width: 100%;" @click="commit"><button class="bg-gradual-red" style="width: 100%;">提交</button></view>
	</view>
</template>

<script>
import { updateMyFilm } from '../../api/myFim.js';
export default {
	data() {
		return {
			score: 0,
			show1: true,
			show2: true,
			show3: true,
			show4: true,
			show5: true,
			filmId: '',
			userInfo: '',
			id: '',
			status: ''
		};
	},
	onLoad(option) {
		console.log('this.filmId', JSON.stringify(this.filmId));
		this.filmId = option.filmId;
		this.userInfo = uni.getStorageSync('userinfo');
		if (option._id) {
			this.id = option._id;
		}
		if (option.status) {
			this.status = option.status;
		}
	},
	methods: {
		getFilm() {},
		clickStar1() {
			this.show1 = !this.show1;
			if (this.show1 === false) {
				this.score = this.score + 2;
			} else {
				this.score = this.score - 2;
			}
		},
		clickStar2() {
			this.show2 = !this.show2;
			if (this.show2 === false) {
				this.score = this.score + 2;
			} else {
				this.score = this.score - 2;
			}
		},
		clickStar3() {
			this.show3 = !this.show3;
			if (this.show3 === false) {
				this.score = this.score + 2;
			} else {
				this.score = this.score - 2;
			}
		},
		clickStar4() {
			this.show4 = !this.show4;
			if (this.show4 === false) {
				this.score = this.score + 2;
			} else {
				this.score = this.score - 2;
			}
		},
		clickStar5() {
			this.show5 = !this.show5;
			if (this.show5 === false) {
				this.score = this.score + 2;
			} else {
				this.score = this.score - 2;
			}
		},
		commit() {
			let postDate = {
				_id: this.id,
				userId: this.userInfo._id,
				filmId: this.filmId,
				status: this.status,
				score: this.score,
				comment: this.comment
			};
			updateMyFilm(postDate).then(
				res => {
					console.log('res', JSON.stringify(res));
					if (res.errno === 0) {
						uni.navigateBack({
							delta: 1
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
