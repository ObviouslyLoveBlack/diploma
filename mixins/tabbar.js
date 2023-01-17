import {
	mapGetters
} from 'vuex'

export default{
	    computed: {
			...mapGetters('cart', ['total']),
		},
		watch:{
			total:{
				handler(newVal){
					this.setTabbar()
				},
				immediate: true
			}
		},
		onShow() {
			this.setTabbar()
		},
		methods: {
			setTabbar() {
				uni.setTabBarBadge({
					index: 2,
					text: this.total + '' //text值必须为字符串
				})
			},
			async balance(){
				// 提交相应的订单信息  订购数量，物品，总价格,收货地址等
			   const orderInfo = {
				   price:this.priceTotal,
				   address:this.address,
				   goods:this.cart.filter(v=>v.goods_state).map(item=>({
					   goods_id:item.goods_id,
					   goods_num:item.goods_count,
					   goods_price:item.goods_price
				   }))
			   }
			   //发起创建订单的请求
			   const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
			   if(res.meta.status !==200) return uni.$showMsg('生成订单失败!')
			   //生成订单编号
			   const orderId = res.message.order_number
			   
			   //预支付
			   const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderId})
			    if(res2.meta.status !==200) return uni.$showMsg('预付订单生成失败!')
				const payInfo = res2.message.pay
				
				//发起 uni.requestPayment() 微信支付
				const [err,res3] = await uni.requestPayment(payInfo)
				if(err) return uni.$showMsg('订单未支付')
				//完成订单，查询支付结果
				const {data: res4} =await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderId})
				if(res4.meta.status !==200) return uni.$showMsg('订单未支付')
				uni.showToast({
					icon:'success',
					title:'支付成功'
				})
			}
		}
}
