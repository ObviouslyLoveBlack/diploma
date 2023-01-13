import Vue from 'vue'
import Vuex from 'vuex'
// 1. 导入购物车的 vuex 模块
import cart from './cart.js'
import user from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
    cart,
	user
  },
})

export default store