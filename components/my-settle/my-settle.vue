<template>
	<view>
		<view class="settle-box">
			<label class="radio" @click="changeAllState()">
				<radio :checked="isFullChecked" color="#C00000"/><text>全选</text>
			</label>
			<view class="total-price">
				合计：<text class="price">￥{{priceTotal}}</text>
			</view>
			<view class="settle-button" @click="settlePrice">
				结算({{stateTotal}})
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	import balance from '@/mixins/tabbar.js'
	export default {
		name:"my-settle",
		mixins:[balance],
		data() {
			return {
				times:3,  //延迟时间
				timer:null  //定时器名
			};
		},
		computed:{
			...mapState('user',['address','token']),
			...mapState('cart',['cart']),
			...mapGetters('cart',['stateTotal','total','priceTotal']),
			isFullChecked(){
				return this.total === this.stateTotal
			}
		},
		methods:{
			...mapMutations('cart',['updateAllState']),
			...mapMutations('user',['setRedirectInfo']),
			changeAllState(){
				this.updateAllState(!this.isFullChecked)
			},
			settlePrice(){
				if(!this.stateTotal) return uni.$showMsg('请选择结算物品...')
				if(JSON.stringify(this.address) === '{}') return uni.$showMsg('请选择收货地址...')
				if(!this.token)  return  this.delayNavigate()
				// 开始创建支付订单
				this.balance()
			},
			showTips(time){
				uni.showToast({
					icon:'none',
					title:'请先登录再结算！' + time+'秒后自动前往登录',
					duration:1500,
					mask:true
				})
			},
			delayNavigate(){
				this.times = 3
				this.showTips(this.times)
				this.timer = setInterval(()=>{
					this.times --
					if(this.times <=0){
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my'
						})
						this.setRedirectInfo({
							type:'switchTab',
							from:'pages/cart/cart'
						})
						return
					}
					this.showTips(this.times)
				},1000)
			}
			
		}
	}
</script>

<style lang="scss">
.settle-box{
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0px;
	left: 0px;
	background: white;
	border: 1px solid #eaeaea;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx;
	.total-price{
		.price{
			color: #C00000;
		}
	}
	.settle-button{
		padding: 10rpx 20rpx;
		height: 100rpx;
		min-width: 200rpx;
		text-align: center;
		line-height: 100rpx;
		background: #C00000;
		color: white;
	}
}
</style>