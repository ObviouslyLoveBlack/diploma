import App from './App'
import store from './store/store.js'
//导入网络请求的包
import {$http} from '@escook/request-miniprogram'


//$http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'



//请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
	if(options.url.indexOf('/my/') !==-1){
		options.header = {
			Authorization: store.state.user.token,
		}
	}
}
//响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}

//封装弹窗的方法
uni.$showMsg = function(title = '数据请求失败',duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif