<template>
	<view>
		<view class="new-address-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" class="new-address-button" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<view class="address-box" v-else @click="chooseAddress">
			<view class="address-title">
				<view class="title-name">
					收货人：<text class="name-detail">{{address.userName}}</text>
				</view>
				<view class="title-phone">
					电话：<text class="phone-detail">{{address.telNumber}}</text>
					<uni-icons type="arrowright" size="16" class="phone-icon"></uni-icons>
				</view>
			</view>
			<view class="address-detail-box">
				收货地址：<text class="address-detail">{{addressDetail}}</text>
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" mode="" class="address-border"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{},
				// isChooseAddress:false
			};
		},
		computed:{
			...mapState('user',['address']),
			...mapGetters('user',['addressDetail'])
		},
		methods:{
			...mapMutations('user',['updateAddress']),
		async chooseAddress(){
			const [err,success] =await uni.chooseAddress({}).catch(err=>err)
			if(err ==null && success.errMsg === 'chooseAddress:ok'){
				//chooseAddress 获取的地址信息太丑，此处强行修改
				success.provinceName = '浙江省'
				success.cityName = '杭州市'
				success.countyName = '西湖区'
				success.detailInfo = '三墩镇振中路202号乐乎城市青年社区'
				success.userName = '故之'
				this.updateAddress(success)
				this.isChooseAddress = true
			}
			if(err && err.errMsg ==='chooseAddress:fail cancel'){
				// this.reAuth()
			}
		},
		async reAuth(){
			const [err,confirm] = await uni.showModal({
				content:'暂无地址权限，是否设置打开',
				cancelText:'取消',
				confirmText:'确定'
			}).catch(err=>err)
			//弹窗异常
			if(err) return 
			if(confirm.cancel) return uni.$showMsg('取消地址授权')
			if(confirm.confirm){
				return uni.openSetting({
					 success(res) {
					    if(res.authSetting['scoped.address']) {
							uni.$showMsg('授权成功,请选择收货地址')
						} else {
							uni.$showMsg('取消授权')
						}
					  } 
				})
			}
		}
		}
	}
</script>

<style lang="scss">
.address-box{
	// height: 130rpx;
	padding: 20rpx 10rpx 30rpx 20rpx;
	.address-title{
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		color: #999;
		.name-detail,.phone-detail{
			color: #333;
		}
		.phone-icon{
			margin-left: 20rpx;
		}
	}
	.address-detail-box{
		font-size: 30rpx;
		color: #999;
		.address-detail{
			color: #333;
		}
	}
}
.address-border{
		display: block;
		width: 100%;
		height: 10rpx;
}
.new-address-box{
	width: 50%;
	margin: 0 auto;
	padding: 40rpx;
}
</style>