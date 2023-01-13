<template>
	<view>
		<view class="my-login-box">
			<uni-icons type="contact-filled" size="100"></uni-icons>
			<button type="primary" class="login-button">一键登录</button>
			<text class="login-text">登录后尽享更多权益</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
 .my-login-box{
	 display: flex;
	 align-items: center;
	 flex-direction: column;
	 margin: 300rpx auto;
	 .login-button{
		 width: 80%;
		 border-radius: 100rpx;
		 background: #C00000;
	 }
	 .login-text{
		 color: #999;
		 margin-top: 20rpx;
	 }
 }
</style>