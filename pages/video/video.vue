<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
	const url = ref('')

	//通过e对象在两个页面之间传参
	onLoad((e) => {
		//非法地址的处理
		if (!e.url) {
			uni.showToast({
				title: '视频地址非法',
				icon: 'none'
			});
			return uni.navigateBack({
				delta: 1
			});
		}
		url.value = e.url;
		if (e.title) {
			uni.setNavigationBarTitle({
				title: e.title
			});
		}
	})
	const back = () => {
		uni.navigateBack({
			delta: 1
		});
	}
</script>
<template>
	<view style="height: 100vh;">
		<!-- 全屏自动播放视频 -->
		<video :src="url" controls autoplay style="width:750rpx;height:100vh" @ended="back"></video>
	</view>
</template>
<style>

</style>
