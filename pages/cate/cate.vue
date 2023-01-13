<template>
	<view>
		<view class="search-box">
			<my-search @click.native = gotoSearch></my-search>
		</view>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view scroll-y :style="{height: sysHeight + 'px'}" class="left-scroll">
				<view class="left-scroll-view-item" v-for="action in cateList" :key="action.cat_id"
					@click="onChange(action)" :class="action.cat_id === active ? 'active' :''">
					{{action.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y :style="{height: sysHeight + 'px'}" :scroll-top="scrollTop" class="right-scroll">
				<view class="second-scroll-item" v-for="action in secondCateList" :key="action.cat_id">
					<view class="second-title">/ {{action.cat_name}} /</view>
					<view class="three-scroll-list">
						<view class="three-scroll-item" v-for="item in action.children" :key="item.cat_id" @click="goGoods(item)">
                              <image :src="item.cat_icon" mode="aspectFit"></image>
							  <text>{{item.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabbar from '@/mixins/tabbar.js'
	export default {
		mixins:[tabbar],
		data() {
			return {
				sysHeight: null,
				cateList: [], //一级分类
				secondCateList: [], //二级分类
				active: 1,
				scrollTop:0,
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.sysHeight = sysInfo.windowHeight
			this.getCateData()
		},
		methods: {
			async getCateData() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.secondCateList = res.message[0].children
			},
			onChange(action) {
				this.active = action.cat_id
				const target = this.cateList.find(v => v.cat_id === action.cat_id)
				this.secondCateList = target.children
				//不可为属性值赋值同一个值，会产生一个像素的偏差
				this.scrollTop = 0 ? 1: 0
			},
			goGoods(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' +item.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll {
			width: 240rpx;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 70rpx;
				text-align: center;
				font-size: 30rpx;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						display: block;
						content: "";
						width: 4rpx;
						height: 55rpx;
						background-color: #C00000;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.right-scroll {
			flex: 1;

			.second-scroll-item {
				text-align: center;
				padding: 30rpx 0rpx;

				.second-title {
					font-size: 26rpx;
					font-weight: bold;
					// margin-bottom: 20rpx;
				}
				.three-scroll-list{
					display: flex;
					flex-wrap: wrap;
					.three-scroll-item{
						width: 33.3%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin-bottom: 20rpx;
						image{
							width: 60px;
							height: 60px;
						}
						text{
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
	.search-box{
		position: sticky;
		top: 0px;
		z-index: 999;
	}
</style>
