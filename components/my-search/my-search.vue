<template>
	<view class="search-container" :style="{'background':bgcolor}">
		<view class="search-box" :style="{'border-radius':radius + 'rpx'}">
			<icon type="search" size="16" class="icon"></icon>
			<text class="search-title">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius:{
				type:Number,
				default:40
			}
		}
	}
</script>

<style lang="scss">
.search-container{
	height: 100rpx;
	padding: 0px 30rpx;
	.search-box{
	  background: #fff;	
	  height: 80rpx;
	  text-align: center;
	  line-height: 80rpx;
	  .icon{
		  padding-right: 10rpx;
	  }
	  .search-title{
		  font-size: 34rpx;
	  }
	}
}
</style>