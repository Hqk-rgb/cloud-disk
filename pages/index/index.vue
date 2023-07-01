<template>
	<view>
		<!-- 自定义导航栏 -->
		<view>
			<!-- 引入状态栏组件 -->
			<uni-status-bar></uni-status-bar>
			<!-- 自定义导航栏分成左中右三部分，用flex布局，每个各占一份 -->
			<view style="height: 44px;" class="flex bottom-border align-center bg-main">
				<!-- 左 -->
				<view class="flex-1 flex">
					<text class="ml-2 text-light">首页</text>
				</view>
				<!-- 中 -->
				<view class="flex-1 flex justify-center"></view>
				<!-- 右 -->
				<view class="flex-1 flex justify-end">
					<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
						<text class="iconfont icon-zengjia"></text>
					</view>
					<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
						<text class="iconfont icon-gengduo"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
