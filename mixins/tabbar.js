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
			}
		}
}
