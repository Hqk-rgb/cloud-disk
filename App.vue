<script>
	import SH from './common/request.js';
	import store from './store'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			console.log(store.state.username)
			SH.get('./list').then(res=>{
				console.log(res)
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 引入官方样式库 */
	@import url('/common/uni.css');
	/* 引入通用free样式库 */
	@import url('/common/free.css');
	/* 引入本项目公共样式库 */
	@import url('/common/common.css');
	/* 引入图标库 */
	@import url('/common//icon.css');
	
</style>
