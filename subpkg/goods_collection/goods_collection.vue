<template>
	<view>
		<view class="collection-detail" v-if="collectionGoods.length >0">
			<view class="collection-title">
				<text>我的收藏</text>
				<uni-icons type="forward" color="#C00000" class="collection-icons"></uni-icons>
			</view>
			<view class="goods-box">
				<view class="goods-item" v-for="(action,i) in collectionGoods" :key="i" @click="goGoodsDetail(action)">
					<my-goods :action="action"></my-goods>
				</view>
			</view>
		</view>
		<view class="collection-empty" v-else>
			<uni-icons type="shop" size="90" color="#999"></uni-icons>
			<text>暂无收藏商品</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('user',['collectionGoods'])
		},
		methods:{
			goGoodsDetail(action){
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${action.goods_id}&&goods_collection=${action.goods_collection}`
					// url:'/subpkg/goods_detail/goods_detail?goods_id=' + action.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-box{
	.goods-item{
		display: flex;
		padding: 20rpx;
		border-bottom: 1px solid #eaeaea;
	}
}
.collection-title{
	padding: 40rpx;
	color: #C00000;
	.collection-icons{
		margin-left: 10rpx;
	}
}
.collection-empty{
		margin: 300rpx auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text{
			color: #999;
			margin-left: 10rpx;
		}
	}
</style>
