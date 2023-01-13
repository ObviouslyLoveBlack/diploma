export default {
  // 为当前模块开启命名空间
  namespaced: true,

  state: () => ({
  
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  // 模块的 mutations 方法
  mutations: {
	  //新增购物车，若已存在改物品则数量加一，反之在购物车中push新物品
	  addToCart(state,goods){
		  const obj = state.cart.find(v=>v.goods_id === goods.goods_id)
		  if(!obj){
			  state.cart.push(goods)
		  } else{
			  obj.goods_count ++
		  }
		  this.commit('cart/saveToStorage')
	  },
	  //存放所有物品信息到本地中，页面刷新时也能获取(vuex的弊端，页面刷新重新渲染数据会丢失)
	  saveToStorage(state){
		  uni.setStorageSync('cart',JSON.stringify(state.cart))
	  },
	  //更新物品的state状态，以判断是否勾选
	  updateState(state,goods){
		  const obj = state.cart.find(v=>v.goods_id === goods.goods_id)
		  if(obj){
			  obj.goods_state = goods.goods_state
		  }
		  this.commit('cart/saveToStorage')
	  },
	  // 更新物品的数量
	  updateCount(state,goods){
		  const obj = state.cart.find(v=>v.goods_id === goods.action.goods_id)
		  if(obj){
			  obj.goods_count = goods.argument
		  }
		  this.commit('cart/saveToStorage')
	  },
	  //在购物车中删除某个物品
	  deleteCartGoods(state,goods){
		  state.cart = state.cart.filter(v=>v.goods_id !==goods.goods_id)
		  this.commit('cart/saveToStorage')
	  },
	  //更改所有物品的状态信息(全选/不全选)
	  updateAllState(state,new_state){
		  state.cart.forEach(v=>v.goods_state = new_state)
		  this.commit('cart/saveToStorage')
	  }
  },

  // 模块的 getters 属性
  getters: {
	  //计算购物车的总数量 (包括勾选与不勾选的)
	  total(state){
		  let total = 0
		  state.cart.forEach(v=> total +=v.goods_count)
		  return total
	  },
	  //计算购物车勾选状态的总数量
	  stateTotal(state){
		  return state.cart.filter(v=>v.goods_state).reduce((total,cur)=>{
			return total +=cur.goods_count
		  },0)
	  },
	  //计算勾选的物品的总价格
	  priceTotal(state){
		  return state.cart.filter(v=>v.goods_state).reduce((total,cur)=>{
			  return total + cur.goods_count * cur.goods_price
		  },0)
	  }
  },
}