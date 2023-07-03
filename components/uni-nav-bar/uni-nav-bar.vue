<template>
	<view>
		<view class="fixed-top bg-main">
			<uni-status-bar></uni-status-bar>
			<view style="height: 44px;" class="flex border-bottom align-center">
				<view class="flex-1 flex">
					<!-- 具名插槽 -->
					<slot name="left"></slot>
				</view>
				<view class="flex-1 flex justify-center">
					<!-- 默认插槽 -->
					<slot />
				</view>
				<view class="flex-1 flex justify-end">
					<!-- 具名插槽 -->
					<slot name="right"></slot>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view>
			<uni-status-bar></uni-status-bar>
			<view style="height: 44px;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
