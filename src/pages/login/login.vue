<template>
  <div class="login-view">
    <n-form class="login-form" ref="LoginForm" :model="formData">
      <div class="desc">
        <n-text>最适合你的管理方案</n-text>
      </div>
      <n-form-item label="Username">
        <n-input v-model:value="formData.username" placeholder="" style="height: 40px;border-radius: 10px" clearable/>
      </n-form-item>
      <n-form-item label="Password">
        <n-input v-model:value="formData.password" placeholder="" style="height: 40px;border-radius: 10px" clearable/>
      </n-form-item>
      <n-gradient-text type="info" class="forget-password" @click="router.push('changePassword')">Forgot Password ?</n-gradient-text>
      <div class="button-div">
        <n-button type="primary" class="login-button" @click="login">登录</n-button>
      </div>
      <div class="signup">
        <n-text style="margin-right: 10px">New to MaterialM?</n-text>
        <n-gradient-text type="info" @click="router.push('register')">Create an account
        </n-gradient-text>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import "./index.scss";
import {useRouter} from 'vue-router'; //  导入 useRouter
import {useAuthStore} from '@/stores/auth';
import { reactive } from 'vue';
import authAPI from '@/api/auth/auth.js';
import { useMessage } from 'naive-ui';

const message = useMessage();

const formData = reactive({
  username: "",
  password: "",
});

const router = useRouter(); //  获取 router 实例
const authStore = useAuthStore(); //  获取 auth store 实例


const login = () => {
  // 表单验证
  if (!formData.username || !formData.password) {
    message.error('请输入用户名和密码');
    return;
  }

  // 调用登录接口
  authAPI.login(formData)
    .then(res => {
      // 检查响应状态
      if (res.code === 200) {
        // 使用返回的用户数据更新store
        authStore.login(res.data);
        authStore.persistLoginStatus();
        // 显示成功消息
        message.success(res.message || '登录成功');
        // 跳转到首页
        router.push('/anchor');
      } else {
        // 处理其他状态码
        message.error(res.message || '登录失败');
      }
    })
    .catch(error => {
      console.error('登录失败:', error);
      message.error(error.message);
    });
}


</script>