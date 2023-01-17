<template>
	<view>
		<view class="search1-box">
			<view class="search-container" :style="{'background':bgcolor}">
				<view class="search-box" :style="{'border-radius':radius + 'rpx'}">
					<icon type="search" size="16" class="icon"></icon>
					<input class="uni-input" v-model.trim="inputKey" @input="input" focus placeholder="请输入" />
				</view>
			</view>
		</view>
		<view class="sugg-list">
			<view class="sugg-list-item" v-for="action in searchReulte" :key="action.goods_id" @click="goGoodsDetail(action)">
				<view class="sugg-name">{{action.goods_name}}</view>
				<uni-icons type="forward" size="16" class="search-icon">></uni-icons>
			</view>
		</view>
		<view class="history-box" v-if="searchReulte.length<=0">
			<!-- 标题 -->
			<view class="history-title">
				<text class="history-name">搜索历史</text>
				<uni-icons type="trash-filled" size="16" @click="deleteHistory"></uni-icons>
			</view>
			<!-- 列表 -->
			<view class="history-list">
				<!-- <uni-tag :text="item" v-for="(item,i) in historyList" :key="i" inverted @click="bindClick" class="list-tab">
					<uni-icons type="trash-filled" size="12" class="delete-icon"></uni-icons>
				</uni-tag> -->
				<view class="tab-item" v-for="(item,i) in historyList" :key="i" @click="goTabGoodsDetail(item)">
					<text class="tab-name">{{item}}</text>
					<uni-icons type="trash-filled" size="12" color="#C00000" class="delete-icon"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null, //延时器
				inputKey:'',
				searchReulte:[],
				historyList:[], //搜索历史
				tabname:''
			};
		},
		onLoad() {
			this.historyList = uni.getStorageSync('history') || []
		},
		methods: {
			input() {
			 //防抖  延时发送请求，而不是每次输入都请求，当间隔0.5秒无输入才发送请求
			    clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// this.inputKey = e.detail.value.trim
					this.getSearchReulte()
				}, 500)
			},
			async getSearchReulte(){
				if(this.inputKey === ''){
					this.searchReulte = []
					return
				}
				const target = this.historyList.find(v=>v== this.inputKey)
				if(!target){
					this.historyList.push(this.inputKey)
				}
			    uni.setStorageSync('history',this.historyList)
				//reduce 去重
				// this.historyList.push(this.inputKey)
				// this.historyList = this.historyList.reduce((newArr,cur)=>{
				// 	const obj = newArr.find((v)=> v === cur)
				// 	if(!obj){
				// 		newArr.push(cur)
				// 	}
				// 	return newArr
				// },[])
				//set 去重  只能去重普通数组  包含对象的数组无法去重
				// this.historyList.push(this.inputKey)
				// const set = new Set(this.historyList)
				// this.historyList = Array.from(set)
				
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.inputKey})
				if(res.meta.status !==200) return uni.$showMsg()
				this.searchReulte = res.message
			},
			goGoodsDetail(action){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + action.goods_id
				})
			},
			goTabGoodsDetail(item){
				console.log(item);
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
			},
			deleteHistory(){
				this.historyList = []
				uni.clearStorage('history')
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		height: 100rpx;
		padding: 0px 30rpx;
		background: #C00000;

		.search-box {
			background: #fff;
			height: 80rpx;
			border-radius: 40rpx;
			// text-align: center;
			line-height: 80rpx;
			display: flex;
			padding: 18rpx 40rpx;
			box-sizing: border-box;

			.icon {
				padding-right: 10rpx;
			}

			.search-title {
				font-size: 34rpx;
			}
		}
	}

	.search1-box {
		position: sticky;
		top: 0px;
		z-index: 999;
	}
	.sugg-list-item{
		display: flex;
		justify-content: space-between;
		padding: 0px 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-bottom: 1px solid #eaeaea;
		font-size: 26rpx;
		.sugg-name{
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			&:hover{
				color: #C00000;
			}
		}
	}
	.history-box{
		.history-title{
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			border-bottom: 1px solid #eaeaea;
			.history-name{
				font-size: 28rpx;
			}
		}
		.history-list{
			display: flex;
			margin-top: 20rpx;
			.list-tab{
				margin: 0px 10rpx;
				.delete-icon{
					position: absolute;
					top: 0px;
					right: 0px;
				}
			}
			.tab-item{
				position: relative;
				.tab-name{
					// background: #eaeaea;
					border-radius: 8rpx;
					color: #666;
					border: 1px solid #999;
					margin: 0px 10rpx;
					padding: 7rpx 20rpx;
					font-size: 25rpx;
				}
				.delete-icon{
					position: absolute;
					top: -20rpx;
					right: 0px;
					display: none;
				}
			}
		}
	}
	.Block{
		display: block;
	}
	
</style>
