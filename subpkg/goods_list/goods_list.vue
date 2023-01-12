<template>
	<view>
		<view class="goods-box">
			<view class="goods-item" v-for="action in goodsList" :key="action.cat_id" @click="goGoodsDetail(action)">
				<view class="goods-item-left">
					<image :src="action.goods_small_logo || defaultSrc" mode="" class="goods-item-img"></image>
				</view>
				<view class="goods-item-info">
					<view class="goods-item-name">
						{{action.goods_name}}
					</view>
					<view class="goods-item-price">
						<span>￥</span>{{action.goods_price | toFixed}}
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
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10,
				},
				goodsList:[],
				total:null,
				isLoading:false,
				defaultSrc:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsData()
		},
		methods:{
			async getGoodsData(cd){
				this.isLoading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				this.isLoading = false
				cd && cd()
				if(res.meta.status !==200) return uni.$showMsg()
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			goGoodsDetail(action){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + action.goods_id
				})
			}
		},
		onReachBottom() {
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('我是有底线的...')
			if(this.isLoading){
				return
			}
			this.queryObj.pagenum =this.queryObj.pagenum + 1
			this.getGoodsData()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = null
			this.goodsList = []
			this.isLoading=false
			this.getGoodsData(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
.goods-box{
	.goods-item{
		display: flex;
		padding: 20rpx;
		border-bottom: 1px solid #eaeaea;
		.goods-item-left{
			margin-right: 20rpx;
			.goods-item-img{
				width: 200rpx;
				height: 200rpx;
				display: block;
			}
		}
		.goods-item-info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-item-name{
				font-size: 26rpx;
			}
			.goods-item-price{
				color: #C00000;
			}
		}
	}
}
</style>
