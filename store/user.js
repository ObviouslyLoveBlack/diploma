export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		// 收藏商品 collectionGoods  收藏店铺collectionStore  关注商品followGoods  足迹 footprint
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		collectionGoods:uni.getStorageSync('collectionGoods') || [],
		//跳转到我的页面时，记录从哪个页面前往，以便返回原页面
		redirectInfo:null
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('user/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		savecollectionGoodsToStorage(state) {
			uni.setStorageSync('collectionGoods', state.collectionGoods)
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('user/saveUserInfoToStorage')
		},
		setToken(state, token) {
			state.token = token
			this.commit('user/saveTokenToStorage')
		},
		addcollection(state, collection) {
			state.collectionGoods.push(collection)
			state.collectionGoods = state.collectionGoods.reduce((newArr,cur)=>{
				const obj = newArr.find(v=>v.goods_id == cur.goods_id)
				if(obj){
                  obj.goods_collection = collection.goods_collection
				}
				if(!obj){
					newArr.push(cur)
				}
				return newArr
			},[])
			this.commit('user/savecollectionGoodsToStorage')
		},
		setRedirectInfo(state,urlInfo){
			state.redirectInfo = urlInfo
		}
	},
	getters: {
		addressDetail(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		},
		tokenDetail(state) {
			return state.token
		}
	}
}
