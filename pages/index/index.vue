<template>
	<view>

		<!-- 选中个数为0 -->
		<uni-nav-bar v-if="checkedList.length === 0">
			<template #left>
				<text class="ml-3 text-light font-md">首页</text>
			</template>
			<template #right class="flex">
				<view style="width: 60rpx;height: 60rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-3" @tap="openAddPopup">
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
				<text class="font-md ml-3 text-light" @click="handleCheckAll(false)">取消</text>
			</template>
			<text class="font-md text-light font-weight-bold">已选中 {{checkedList.length}} 个</text>
			<template #right>
				<text class="font-md mr-3 text-light" @click="handleCheckAll(true)">全选</text>
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
				<input type="text" style="height: 70rpx;padding-left: 70rpx" class="bg-white font-md rounded-circle"
					placeholder="搜索文件" />
			</view>
		</view>

		<!-- 自定义列表组件 -->
		<f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @click="doEvent(item)"
			@my-select="handleSelect(index)">
		</f-list>

		<!-- 底部操作条 -->
		<!-- 选中元素大于0，才会出现操作条 -->
		<view v-if="checkedList.length>0">
			<!-- 设置操作条容器样式：高度、颜色。。。 -->
			<view style="height: 115rpx;" class="flex align-stretch bg-main text-white fixed-bottom">
				<!-- 根据操作元素个数等分容器 -->
				<view class="flex-1 flex flex-column align-center justify-center" style="line-height: 1.5;"
					v-for="(item,index) in actions" :key="index" hover-class="bg-hover-primary"
					@click="handleBottomEvent(item)">
					<text class="iconfont" :class="item.icon"></text>{{item.name}}
				</view>
			</view>
		</view>

		<!-- 删除对话框 -->
		<f-dialog ref="deleteDialogRef" :onConfirm="handleDeleteConfirm" :onCancel="handleCancel">是否删除选中的文件</f-dialog>

		<!-- 重命名对话框 -->
		<f-dialog ref="renameDialogRef" :onConfirm="handleRenameConfirm" :onCancel="handleCancel">
			<input type="text" v-model="renameValue" class="flex-1 bg-light rounded px-2" style="height: 95rpx;"
				placeholder="重命名">
		</f-dialog>

		<!-- 添加操作条， type表示弹出层位置 -->
		<uni-popup ref="addPopup" type="bottom">
			<view class="bg-white flex" style="height: 200rpx">
				<!-- 遍历addList数组，纵向flex布局 -->
				<view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light"
					v-for="(item,index) in addList" :key="index" @tap="handleAddEvent(item)">
					<!-- 每个操作的图标，可以传入图标的名称和颜色 -->
					<text style="width: 110rpx; height: 110rpx;"
						class="flex align-center justify-center rounded-circle bg-light iconfont"
						:class="item.icon + ' ' + item.color"></text>
					<!-- 每个操作的名称 -->
					<text class="font text-muted">{{ item.name }}</text>
				</view>
			</view>
		</uni-popup>

		<!-- 新建文件夹对话框 -->
		<f-dialog ref="newDirDialogRef" :onConfirm="handleNewDirConfirm" :onCancel="handleCancel">
			<input type="text" v-model="newDirName" class="flex-1 bg-light rounded px-2 " style="height: 95rpx;"
				placeholder="新建文件夹名称" />
		</f-dialog>

	</view>
</template>


<script setup>
	import {
		ref,
		computed
	} from 'vue'

	const list = ref([{
		type: 'dir',
		name: '盗墓笔记',
		create_time: '2023-07-01 08:01',
		checked: false
	}, {
		type: 'image',
		name: '闷油瓶.jpg',
		url: 'https://s1.ax1x.com/2023/07/04/pCsYo1U.jpg',
		create_time: '2023-07-01 09:01',
		checked: false,
		download: 100
	}, {
		type: 'video',
		name: 'CG混剪.mp4',
		//data: 'https://niit-soft.oss-cn-hangzhou.aliyuncs.com/video/3-1.mp4',
		data: 'https://king-hf-bucket.oss-cn-shanghai.aliyuncs.com/video/cg.mp4',
		create_time: '2023-07-01 10:01',
		checked: false
	}, {
		type: 'image',
		name: '壁纸.jpg',
		url: 'https://i2.100024.xyz/2023/01/26/3kq106.webp',
		create_time: '2023-07-01 10:01',
		checked: false,
		download: 90
	}, {
		type: 'image',
		name: 'mqxu.jpg',
		url: 'https://s1.ax1x.com/2023/04/03/pphvfu4.jpg',
		create_time: '2023-07-01 10:51',
		checked: true,
		download: 80
	}, {
		type: 'text',
		name: '三爷日记.txt',
		create_time: '2023-07-01 11:01',
		checked: false
	}, {
		type: 'none',
		name: '邛楼石影.rar',
		create_time: '2023-07-01 12:01',
		checked: false
	}]);
	const handleSelect = (index) => {
		list.value[index].checked = !list.value[index].checked
		console.log(list.value[index].checked)
	}


	//计算属性：通过数组过滤得到选中的元素
	const checkedList = computed(() => {
		return list.value.filter(item => item.checked)
	})

	//全选，取消
	const handleCheckAll = (checked) => {
		list.value.forEach(item => {
			item.checked = checked
		})
	}

	//操作菜单
	const actions = computed(() => {
		if (checkedList.value.length > 1) {
			return [{
				icon: "icon-xiazai",
				name: "下载"
			}, {
				icon: "icon-shanchu",
				name: "删除"
			}, ]
		}
		return [{
				icon: "icon-xiazai",
				name: "下载"
			},
			{
				icon: "icon-fenxiang-1",
				name: "分享"
			},
			{
				icon: "icon-shanchu",
				name: "删除"
			},
			{
				icon: "icon-chongmingming",
				name: "重命名"
			}
		]
	})

	//获取删除对话框元素
	const deleteDialogRef = ref(null)

	//获取重命名对话框元素
	const renameDialogRef = ref(null)

	//底部操作原理 （根据传入的item进行判断，执行不同操作）
	const handleBottomEvent = (item) => {
		switch (item.name) {
			case '删除':
				deleteDialogRef.value.showPopup()
				break;
			case '重命名':
				renameValue.value = checkedList.value[0].name
				renameDialogRef.value.showPopup()
				break;
			default:
				break;
		}
	}

	const handleDeleteConfirm = () => {
		//对list进行过滤，留下未被选中的元素（选中的即被删除）
		list.value = list.value.filter(item => !item.checked);
		uni.showToast({
			title: '删除成功',
			icon: 'success'
		});
	}

	const handleCancel = () => {
		console.log('取消')
	}

	//重命名
	const renameValue = ref('')

	const handleRenameConfirm = () => {
		if (renameValue.value === '') {
			return uni.showToast({
				title: '文件名不能为空',
				icon: 'none'
			})
		}
		//更新该元素的name值
		checkedList.value[0].name = renameValue.value
		renameDialogRef.value.hidePopup()
	}

	//添加文件
	const addList = ref([{
		icon: 'icon-file-b-6',
		color: 'text-success',
		name: '上传图片'
	}, {
		icon: 'icon-file-b-9',
		color: 'text-primary',
		name: '上传视频'
	}, {
		icon: 'icon-file-b-8',
		color: 'text-muted',
		name: '上传文件'
	}, {
		icon: 'icon-file-b-2',
		color: 'text-warning',
		name: '新建文件夹'
	}])

	const addPopup = ref(null)
	//打开添加操作条
	const openAddPopup = () => {
		addPopup.value.open()
	}

	//新建文件夹
	const newDirDialogRef = ref(null)
	const newDirName = ref('')
	//处理操作条的各种事件
	const handleAddEvent = (item) => {
		addPopup.value.close()
		switch (item.name) {
			case '新建文件夹':
				newDirDialogRef.value.showPopup()
		}
	}

	const handleNewDirConfirm = () => {
		if (newDirName.value === '') {
			return uni.showToast({
				title: '文件夹名不能为空',
				icon: 'none'
			})
		}
		//添加新的文件到list数组
		list.value.push({
			type: 'dir',
			name: newDirName.value,
			create_time: '2023-07-02 17:56',
			checked: false
		})
		uni.showToast({
			title: '新建文件夹成功',
			icon: 'none'
		})
		newDirDialogRef.value.hidePopup()
	}

	//列表点击事件
	const doEvent = (item) => {
		console.log(item);
		switch (item.type) {
			case 'image':
				let images = list.value.filter(item => {
					return item.type === 'image';
				});
				//预览图片
				uni.previewImage({
					current: item.url,
					urls: images.map(item => item.url)
				});
				break;
			case 'video':
				uni.navigateTo({
					url: '../video/video?url=' + item.data + '&title=' + item.name
				})
				break;
			default:
				break;
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
