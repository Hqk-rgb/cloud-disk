<script setup>
	import {
		ref
	} from "vue"
	
	import $H from '/common/request.js'
	import store from '/store'
	//登录或注册类别
	const type = ref('login')
	//表单对象
	const form = ref({
		username: 'otter',
		password: '123456',
		repassword: '123456'
	})

	//切换注册或登录
	const changeType = () => {
		type.value = type.value === 'login' ? 'reg' : 'login';
	}

	//按钮点击事件
	const handleClick = () => {
		let msg = type.value === 'login' ? '登录' : '注册'
		$H.post('/'+type.value,form.value).then(res=>{
			uni.showToast({
				title: msg+'成功',
				icon:'success',
				duration:1000
			})
			if (type.value === 'login') {
				store.dispatch('login',res).then(res=>{
					uni.switchTab({
						url: '../index/index'
					});
				})
			}else{
				form.value = {
					username: 'ssssss',
					password:'123456',
					repassword:'123456',
				}
				changeType()
			}
		})
		
	}
</script>
<template>
	<view style="height: 100vh;" class="bg-light">
		<view style="height: 44px;"></view>
		<view class="flex align-center justify-center font-lg text-muted" 
		style="margin-top: 100rpx;margin-bottom: 100rpx;">千度云盘</view>

		<view class="px-4">
			<input type="text" v-model="form.username" class="uni-input bg-white rounded mb-4 text-muted" 
				placeholder="手机号/用户名"/>
			<input type="text" v-model="form.password" class="uni-input bg-white rounded mb-4 text-muted"
				placeholder="请输入密码" />

			<!-- 如果是注册，才显示确认密码框 -->
			<input v-if="type === 'reg'" type="text" v-model="form.repassword" class="uni-input bg-white rounded mb-4"
				placeholder="请输入确认密码" />
			<view class="bg-main text-white flex align-center justify-center font-md py-2 rounded-circle"
				hover-class="bg-main-hover" @click="handleClick">{{ type === 'login' ? '登录':'注册'}}</view>
		</view>
		<view class="flex align-center justify-center pt-5">
			<view class="text-main mx-2 font-sm" @click="changeType">{{ type === 'login' ? '去注册':'去登录'}}</view>
		</view>
	</view>
</template>



<style>

</style>
