<template>
	<view>
		<view class="my-login-box">
			<uni-icons type="contact-filled" size="100"></uni-icons>
			<button type="primary" class="login-button" open-type="getUserInfo"
				@getuserinfo="onsubmitlogin">一键登录</button>
			<text class="login-text">登录后尽享更多权益</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	const avatarUrl = {
		avatar: require('@/static/gyy-3.png')
	}
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('user', ['setToken', 'setUserInfo']),
			async onsubmitlogin(e) {
				if (e.detail.errMsg !== 'getUserInfo:ok') return uni.$showMsg('登录失败!')
				// this.setUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				console.log(res);
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录授权失败')
				// 模拟登录接口获取的用户信息
				const obj = {
					name: '故之',
					avatar: avatarUrl.avatar
				}
				this.setUserInfo(obj)
				this.setToken(res.code)
				//登录接口有问题，获取不到token
				// const query = {
				//     code: res.code,
				//     encryptedData: info.encryptedData,
				//     iv: info.iv,
				//     rawData: info.rawData,
				//     signature: info.signature
				//   }
				// const {data: token} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				// console.log(token);
				// if(res.meta.status !==200)  return uni.$showMsg('登录失败..')
				// this.setToken(res.message.token)
				this.goOrigin()
			},
			async goOrigin() {
				if (this.redirectInfo) {
					const [err, sucess] = await uni.showModal({
						title: '提示',
						content: '返回原页面'
					}).catch(err => err)
					if (sucess.confirm) {
						if (this.redirectInfo.type === 'switchTab') {
							uni.switchTab({
								url: `/${this.redirectInfo.from}`
							})
						} else {
							uni.navigateTo({
								url: `/${this.redirectInfo.from}`
							})
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-login-box {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 300rpx auto;

		.login-button {
			width: 80%;
			border-radius: 100rpx;
			background: #C00000;
		}

		.login-text {
			color: #999;
			margin-top: 20rpx;
		}
	}
</style>
