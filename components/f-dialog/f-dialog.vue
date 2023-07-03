<template>
	<!-- 在提供的uni-popup组件基础上，封装自定义全局弹出层-->
	<uni-popup ref="popRef">
		<!-- 弹出层最外层容器样式 -->
		<view style="width: 600rpx;" class="bg-white rounded">
			<!-- 弹出层标题样式，标题内容通过父组件传进来 -->
			<view class="flex align-center justify-center font-weight-bold border-bottom border-light-secondary"
				style="height: 100rpx;">{{props.title}}</view>

			<!-- 弹出层的内容，通过插槽分发，这样就可以在父组件中指定各种内容 -->
			<view class="flex align-center justify-center p-3">
				<slot />
			</view>
			<!-- 确定和取消区域，用@tap事件更适合手机端的操作，显示的文字可以通过组件定义的属性进行传递 -->
			<view class="flex border-top border-light-secondary" style="height: 100rpx;">
				<view class=" text-muted align-center flex-1 flex  justify-center" @tap="cancel">
					{{props.cancelText}}
				</view>
				<view class="flex-1 text-main flex align-center justify-center" @tap="confirm">
					{{props.confirmText}}
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	//父组件可以给弹出层传递标题，确定和取消操作的文字，确认和取消的执行函数，并提供默认值
	const props = defineProps({
		title: {
			type: String,
			default: '提示'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		confirmText: {
			type: String,
			default: '确定'
		},
		onConfirm: {
			type: Function,
			default: null
		},
		onCancel: {
			type: Function,
			default: null
		}
	})

	//根据 template 中的ref 获取弹出层元素
	const popRef = ref(null)

	//打开弹出层
	const showPopup = () => {
		popRef.value.open()
	};

	//关闭弹出层
	const hidePopup = () => {
		popRef.value.close()
	};

	//点击确认的执行函数
	const confirm = () => {
		//这里的判断起到容错作用，因为如果props.onConfirm不是函数，就不能执行了
		if (typeof props.onConfirm === 'function') {
			//执行属性中定义的，由父组件传入的确认操作函数
			props.onConfirm();
		}
		//关闭弹出层
		hidePopup();
	}

	const cancel = () => {
		if (typeof props.onCancel === 'function') {
			//执行属性中定义的，由父组件传入的确认操作函数
			props.onCancel();
		}
		//关闭弹出层
		hidePopup();
	}

	defineExpose({
		showPopup,
		hidePopup
	})
</script>

<style>

</style>
