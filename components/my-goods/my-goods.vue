<template>
	<view class="goods-box">
		<view class="goods-item-left">
			<radio :checked="action.goods_state" color="#C00000" v-if="showRadio" @click="radioClick(action)"></radio>
			<image :src="action.goods_small_logo || defaultSrc" mode="" class="goods-item-img"></image>
		</view>
		<view class="goods-item-info">
			<view class="goods-item-name">
				{{action.goods_name}}
			</view>
			<view class="goods-price-num">
				<view class="goods-item-price">
					<span>￥</span>{{action.goods_price | toFixed}}
				</view>
				<view class="goods-num">
					<!-- @change="(argument) => selectChange({ ...argument, record })" -->
					<uni-number-box :min="1" :value="action.goods_count" v-if="showNum" @change="(argument)=>numBoxChange({argument,action})"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				defaultSrc: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		props: {
			action: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum:{
				type: Boolean,
				default: false
			}
		},
		methods: {
			radioClick(action) {
				const {
					goods_id,
					goods_state
				} = action
				this.$emit('radio-change', {
					goods_id,
					goods_state: !goods_state
				})
			},
			numBoxChange(action){
				this.$emit('num-change',action)
			}
		}
	}
</script>

<style lang="scss">
	.goods-box {
		display: flex;
	}

	.goods-item-left {
		display: flex;
		align-items: center;
		margin: 0px 20rpx;

		.goods-item-img {
			width: 200rpx;
			height: 200rpx;
			display: block;
		}
	}

	.goods-item-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
        padding: 20rpx 0px 6px 0px;
		.goods-item-name {
			font-size: 26rpx;
		}

		.goods-price-num {
			display: flex;
			justify-content: space-between;

			.goods-item-price {
				color: #C00000;
			}
			.goods-num{
				padding-right: 20rpx;
			}
		}

	}
</style>
