<template>
	<view>
		<view class="goods-box">
			<view class="goods-item" v-for="(action,i) in goodsList" :key="i" @click="goGoodsDetail(action)">
				<my-goods :action="action"></my-goods>
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
			};
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
	}
}
</style>
