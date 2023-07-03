<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- <uni-nav-bar> -->
			<!-- left插槽 -->
			<!-- <template v-slot:left>
				<text class="ml-3 text-light font-md">首页</text>
			</template> -->
			<!-- right插槽 -->
			<!-- <template v-slot:right>
				<view style="width: 60rpx;height: 60rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-3">
					<text class="iconfont icon-zengjia"></text>
				</view>
				<view style="width: 60rpx;height: 60rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-3">
					<text class="iconfont icon-gengduo"></text>
				</view>

			</template>
		</uni-nav-bar> -->
		
		<!-- 选中个数为0 -->
		<uni-nav-bar v-if="checkedList.length === 0">
			<template #left>
				<text class="ml-3 text-light font-md">首页</text>
			</template>
			<template #right>
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
		
		<!-- 选中个数不为0 -->
		<uni-nav-bar v-else>
			<template #left>
				<text class="font-md ml-3 text-light">取消</text>
			</template>
			<text class="font-md text-light font-weight-bold">已选中 {{checkedList.length}} 个</text>
			<template #right>
				<text class="font-md mr-3 text-light">全选</text>
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
	
		<!-- 自定义列表组件 -->
		<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index"
		@my-select="handleSelect(index)"></f-list>
	</view>
</template>


<script setup>
	import { ref,computed } from 'vue'
	const list = ref([{
		type:'dir',
		name:'盗墓笔记',
		create_time:'2023-07-01 08:01',
		checked: true
	},{
		type:'image',
		name:'闷油瓶.jpg',
		create_time:'2023-07-01 09:01',
		checked: true
	},{
		type:'video',
		name:'云顶天宫.mp4',
		create_time:'2023-07-01 10:01',
		checked: true
	},{
		type:'text',
		name:'三爷日记.txt',
		create_time:'2023-07-01 11:01',
		checked: false
	},{
		type:'none',
		name:'邛楼石影.rar',
		create_time:'2023-07-01 12:01',
		checked: false
	}]);
	const handleSelect = (index) =>{
		list.value[index].checked = !list.value[index].checked
		console.log(list.value[index].checked)
	}
	
	//计算属性：通过数组过滤得到选中的元素
	const checkedList = computed(()=>{
		return list.value.filter(item=>item.checked)
	})
	
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
