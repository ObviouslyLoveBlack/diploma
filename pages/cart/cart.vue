<template>
	<view>
		<view class="cart-container" v-if="cart.length >0">
			<my-address></my-address>
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text>购物车</text>
			</view>
		    <uni-swipe-action>
				<view class="cart-list-box" v-for="(action,i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="deteleItem(action)">
						<my-goods :action="action" :showRadio="true" :showNum="true" @radio-change="changeRadio"
							@num-change="changeNum"></my-goods>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
			<view class="settle-box">
				<my-settle></my-settle>
			</view>
		</view>
		<view class="empty-cart" v-else>
			<uni-icons type="cart-filled" size="90" color="#999"></uni-icons>
			<text>空空如也~</text>
		</view>
	</view>
</template>

<script>
	import tabbar from '@/mixins/tabbar.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [tabbar],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		computed: {
			...mapState('cart', ['cart'])
		},
		methods: {
			...mapMutations('cart', ['updateState', 'updateCount','deleteCartGoods']),
			changeRadio(e) {
				this.updateState(e)
			},
			changeNum(e) {
				this.updateCount(e)
			},
			deteleItem(action) {
				this.deleteCartGoods(action)
			}
		}

	}
</script>

<style lang="scss">
	.cart-title {
		padding: 20rpx 16rpx;
		border-bottom: 1px solid #eaeaea;

		text {
			margin-left: 20rpx;
		}
	}

	.cart-list-box {
		border-bottom: 1px solid #eaeaea;
	}
	.cart-container{
		padding-bottom: 100rpx;
	}
	.empty-cart{
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
