<template>
	<view class="my-container">
		<view class="userInfo-userimg-box">
			<view class="userimg-box">
				<image src="@/static/gyy-3.png" mode="" class="userimg-img"></image>
			</view>
			<text class="userInfo-name">{{userInfo.name}}</text>
		</view>
		<view class="userInfo-detail-box">
			<view class="detail-shop-info">
				<view class="shop-info-item">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="shop-info-item" @click="collection()">
					<text>{{collectionGoods.length}}</text>
					<text>收藏的商品</text>
				</view>
				<view class="shop-info-item">
					<text>12</text>
					<text>关注的商品</text>
				</view>
				<view class="shop-info-item">
					<text>99</text>
					<text>足迹</text>
				</view>
			</view>
			<view class="detail-shop-order">
				<text class="my-order">我的订单</text>
				<view class="order-item-box">
					<view class="shop-order-item" v-for="(action,i) in InfoOrderList" :key="i">
						<image :src="action.url" mode="" class="order-logo"></image>
						<text>{{action.title}}</text>
					</view>
				</view>
			</view>
			<view class="order-address-info">
				<view class="shop-address-item">
					<text>收货地址</text>
					<uni-icons type="forward"></uni-icons>
				</view>
				<view class="shop-address-item">
					<text>联系客服</text>
					<uni-icons type="forward"></uni-icons>
				</view>
				<view class="shop-address-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name: "my-userInfo",
		data() {
			return {
				InfoOrderList: [{
						url: '../../static/my-icons/icon1.png',
						title: '待付款'
					},
					{
						url: '../../static/my-icons/icon2.png',
						title: '已收货'
					},
					{
						url: '../../static/my-icons/icon3.png',
						title: '退款/退货'
					},
					{
						url: '../../static/my-icons/icon4.png',
						title: '全部订单'
					}
				],
			};
		},
		computed:{
			...mapState('user',['userInfo','collectionGoods'])
		},
		methods:{
			...mapMutations('user',['updateAddress','setUserInfo','setToken']),
			collection(){
				uni.navigateTo({
					url:'/subpkg/goods_collection/goods_collection'
				})
			},
			async logout(){
				uni.showModal({
					title:'提示',
					content:'确定退出登录吗?',
					success:(res)=> {
						if(res.confirm){
							this.updateAddress({})
							this.setUserInfo({})
							this.setToken('')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-container {
		height: 100%;
		background: #eaeaea;
		.userInfo-userimg-box {
			height: 360rpx;
			background: #C00000;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		
			.userimg-box {
				height: 200rpx;
				width: 200rpx;
				border-radius: 50%;
				border: 1px solid white;
		
				.userimg-img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.userInfo-name{
				margin-top: 14rpx;
				color: white;
				font-size: 32rpx;
			}
		}
		.userInfo-detail-box {
			height: 750rpx;
			.detail-shop-info {
				margin: 0px 24rpx;
				top: -20rpx;
				position: relative;
				box-sizing: 999;
				display: flex;
				background: white;
				justify-content: space-between;
		
				.shop-info-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 26rpx;
					padding: 20rpx;
				}
			}
		
			.detail-shop-order {
				margin: 0px 24rpx;
				background: white;
		        .my-order{
					display: block;
					padding: 30rpx 10px;
					border-bottom: 1px solid #eaeaea;
				}
				.order-item-box {
					display: flex;
					justify-content: space-between;
		
					.shop-order-item {
						display: flex;
						align-items: center;
						flex-direction: column;
						padding: 20rpx;
		
						.order-logo {
							width: 70rpx;
							height: 70rpx;
						}
					}
		
				}
			}
			.order-address-info{
				margin: 20rpx 24rpx;
				background: white;
				.shop-address-item{
					padding: 20rpx 10rpx;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}

	

	
</style>
