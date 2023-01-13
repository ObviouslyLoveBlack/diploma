<template>
	<view v-if="detailInfo.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="1500" :duration="1000" circular="true">
			<swiper-item v-for="(action,i) in detailInfo.pics" :key="i">
				<view class="swiper-item">
					<image :src="action.pics_big" mode="" @click="preview(i)"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="detail-box">
			<view class="detail-info">
				<text class="info-price">￥{{detailInfo.goods_price}}</text>
				<view class="info-title">
					<text>{{detailInfo.goods_name}}</text>
					<view class="star">
						<uni-icons type="star" size="18"></uni-icons>
						<text>收藏</text>
					</view>
				</view>
				<view class="detail-roade">
					<text>快递:免运费</text>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods-detail">
			<rich-text :nodes="detailInfo.goods_introduce"></rich-text>
		</view>
		<!-- 商品导航 -->
		<view class="goods-detail-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				detailInfo: {},
				goods_id: null,
				options: [{
						icon: 'headphones',
						text: '客服'
					},
					{
						icon: 'shop',
						text: '店铺',
					},
					{
						icon: 'cart',
						text: '购物车',
						info: null
					},
				],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		computed: {
			...mapState('cart', ['cart']),
			...mapGetters('cart',['total'])
		},
		watch:{
			total:{
				handler(newVal){
					const obj = this.options.find(x=>x.text === '购物车')
					if(obj){
						obj.info = newVal
					}
				},
				immediate:true
			}
		},
		onLoad(options) {
			this.goods_id = options
			this.getGoodsDetail()
		},
		methods: {
			...mapMutations('cart', ['addToCart']),
			async getGoodsDetail() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', this.goods_id)
				if (res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ')
				this.detailInfo = res.message
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.detailInfo.pics.map(v => v.pics_big_url)
				})
			},
			onClick(e) {
				if (e.content.text == '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.content.text == '加入购物车') {
					const {goods_id,goods_name,goods_price,goods_small_logo} = this.detailInfo
					const goods = {
						goods_id,
						goods_name,
						goods_price,
						goods_small_logo,
						goods_count: 1,    
						goods_state: true  
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 600rpx;

		image {
			width: 100%;
		}
	}

	.detail-box {
		padding: 20rpx;

		.detail-info {
			.info-price {
				color: #C00000;
				font-size: 36rpx;
				margin: 20rpx 0px;
			}

			.info-title {
				display: flex;
				justify-content: space-between;
				margin: 20rpx 0px;
				align-items: center;

				.star {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}

			.detail-roade {
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	.goods-detail-nav {
		width: 100%;
		position: fixed;
		bottom: 0px;
		left: 0px;
		border-top: 1px solid #eaeaea;
		padding: 20rpx 0px;
		background: white;
	}
</style>
