<template>
	<view class="my-container-box">
		<my-login v-if="!token"></my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import tabbar from '@/mixins/tabbar.js'
	export default {
		mixins:[tabbar],
		data() {
			return {
				token:'jfd'
			};
		}
	}
</script>

<style lang="scss">
.my-container-box{
	height: 100%;
}
</style>
