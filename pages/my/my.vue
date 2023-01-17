<template>
	<view class="my-container-box">
		<my-login v-if="!tokenDetail"></my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	import tabbar from '@/mixins/tabbar.js'
	export default {
		mixins:[tabbar],
		data() {
			return {
			};
		},
		computed:{
			...mapGetters('user',['tokenDetail'])
		},
		methods:{
			...mapMutations('user',['setToken'])
		}
	}
</script>

<style lang="scss">
.my-container-box{
	height: 100%;
}
</style>
