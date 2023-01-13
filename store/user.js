export default {
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address') || '{}') ,
		token:''
	}),
	mutations:{
		updateAddres(state,address){
			state.address = address
			this.commit('user/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
	},
	getters:{
		addressDetail(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName+ state.address.countyName + state.address.detailInfo
		}
	}
}