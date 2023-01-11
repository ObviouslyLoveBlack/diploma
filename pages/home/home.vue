<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			indicator-color="white" indicator-active-color="skyblue">
			<swiper-item v-for="action in swiperList" :key="action.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+action.goods_id">
					<image :src="action.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-list-item" v-for="(action,i) in navList" :key="i" @click="goCateTabbar(action)">
				<image :src="action.image_src" mode="" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-list-item" v-for="(action,i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="action.floor_title.image_src" mode="widthFix"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="action.product_list[0].url">
						<image :src="action.product_list[0].image_src" mode="heightFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item,i) in action.product_list" :key="i" v-if=" i !== 0" :url="item.url">
							<image :src="item.image_src"  mode="widthFix" class="floor-img"></image>
						</navigator>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperData()
			this.getNavData()
			this.getFloorData()
		},
		methods: {
			async getSwiperData() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			async getNavData() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			goCateTabbar(action) {
				if (action.open_type) {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				} else {
					uni.$showMsg('无数据展示，别点击了')
				}

			},
			async getFloorData() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 对数据进行处理
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0px;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-list-item{
		margin-bottom: 10rpx;
		&:last-child{
		  margin-bottom: 0rpx;
		}
	}
	.floor-img-box{
		display: flex;
		.left-img-box{
			padding-left: 10rpx;
		}
		.right-img-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.floor-img{
				width: 220rpx;
			}
		}
	}
</style>
