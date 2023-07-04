<script setup>
	import {
		ref,computed
	} from 'vue'
	const tabIndex = ref(0)
	const tabBars = ref([{
		name: '下载列表'
	}, {
		name: '上传列表'
	}])

	const changeTab = (index) => {
		tabIndex.value = index
	}
	
	const list = ref([{
		type: 'image',
		name: '闷油瓶.jpg',
		url: 'https://s1.ax1x.com/2023/07/04/pCsYo1U.jpg',
		create_time: '2023-07-01 09:01',
		checked: false,
		download: 100
	}, {
		type: 'image',
		name: 'avatar.jpg',
		url: 'https://i2.100024.xyz/2023/01/26/3kq106.webp',
		create_time: '2023-07-01 10:01',
		checked: false,
		download: 90
	}, {
		type: 'image',
		name: 'me.jpg',
		url: 'https://s1.ax1x.com/2023/04/03/pphvfu4.jpg',
		create_time: '2023-07-01 10:51',
		checked: true,
		download: 30
	}, {
		type: 'text',
		name: '三爷日记.txt',
		create_time: '2023-04-01 11:01',
		checked: false,
		download: 100
	}, {
		type: 'none',
		name: '蛇沼鬼城.rar',
		create_time: '2023-07-01 12:01',
		checked: false,
		download: 99
	}]);

	//计算属性：下载中
	const downloading = computed(() => {
		return list.value.filter(item => {
			return item.download < 100;
		})
	})
	//计算属性：下载完成
	const downloaded = computed(() => {
		return list.value.filter(item => {
			return item.download === 100;
		})
	})

	const swiperChange = (e) => {
		const index = e.detail.current;
		console.log(index)
		tabIndex.value = index;
	}
</script>
<template>
	<view style="height: 100vh;" class="flex flex-column">
		<view class="flex border-bottom border-light-secondary" style="height: 100rpx">
			<view class="flex-1 flex flex-column align-center justify-center" v-for="(item,index) in tabBars"
				:key="index" :class="index === tabIndex ? 'text-main' : ''" @click="changeTab(index)">
				<text>{{item.name}}</text>
				<text style="height: 8rpx;width: 140rpx;" class="rounded"
					:class="tabIndex === index ? 'bg-main' : 'bg-white'"></text>
			</view>
		</view>

		<swiper :duration="250" class="flex-1 flex" :current="tabIndex" @change="swiperChange">
			<!-- 下载列表 -->
			<swiper-item class="flex-1 flex">
				<scroll-view scroll-y="true" class="flex-1">
					<view style="height: 60rpx;" class="bg-light flex align-center font-sm px-2 text-muted">
						文件下载至： storage/xxxx/xxxx
					</view>
					<view class="p-2 border-bottom border-light-secondary font text-muted">
						下载中（{{downloading.length}})
					</view>
					<f-list v-for="(item,index) in downloading" :key="'i'+index" :item="item" :index="index">
						<view style="height: 70rpx;" class="flex align-center text-main">
							<text class="iconfont icon-zanting"></text>
							<text class="ml-1">{{item.download}}</text>
						</view>
						<progress slot="bottom" :percent="item.download" activeColor="#009CFF"
							:stroke-width="4"></progress>
					</f-list>

					<view class="p-2 border-bottom border-light-secondary font text-muted">
						下载完成（{{downloaded.length}}）
					</view>
					<f-list v-for="(item,index) in downloaded" :key="'d'+index" :index="index" :item="item"
						:showRight="false"></f-list>
				</scroll-view>
			</swiper-item>
			<!-- 上传列表 -->
			<swiper-item>
				<scroll-view scroll-y="true" class="flex-1">
					<view class="font-md"> 上传列表</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>



<style>

</style>
