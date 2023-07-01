<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar>
			<!-- left插槽 -->
			<template v-slot:left>
				<text class="ml-3 text-light font-md">首页</text>
			</template>
			<!-- right插槽 -->
			<template v-slot:right>
				<view style="width: 60rpx;height: 60rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-3">
					<text class="iconfont icon-zengjia"></text>
				</view>
				<view style="width: 60rpx;height: 60rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-3">
					<text class="iconfont icon-gengduo"></text>
				</view>

			</template>
		</uni-nav-bar>
		
		<!-- 搜索框 -->
		<view class="px-3 py-2">
			<!-- 父相子绝 -->
			<view class="position-relative">
				<!-- 搜索图标绝对定位到父容器左侧 -->
				<view style="height: 70rpx;width: 70rpx; position: absolute;top: 0;left: 0;"
				class="flex align-center justify-center text-light-muted">
					<text class="iconfont icon-sousuo"></text>
				</view>
				<!-- 输入框左侧留出空位，正好放置搜索图标 -->
				<input type="text" style="height: 70rpx;padding-left: 70rpx"
				class="bg-white font-md rounded-circle" placeholder="搜索文件"/>
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
