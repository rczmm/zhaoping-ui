<template>
  <div class="login-view">
    <n-form class="login-form" ref="LoginForm" :model="formData">
      <div class="title">
        <n-text type="info" size="40px">后台系统</n-text>
      </div>
      <div class="desc">
        <n-text>最适合你的管理方案</n-text>
      </div>
      <n-form-item label="Username">
        <n-input v-model:value="formData.username" placeholder="" style="height: 40px;border-radius: 10px" clearable/>
      </n-form-item>
      <n-form-item label="Password">
        <n-input v-model:value="formData.password" placeholder="" style="height: 40px;border-radius: 10px" clearable/>
      </n-form-item>
      <n-gradient-text type="info" class="forget-password">Forgot Password ?</n-gradient-text>
      <n-button type="primary" class="login-button" @click="login">登录</n-button>
      <div class="signup">
        <n-text style="margin-right: 10px">New to MaterialM?</n-text>
        <n-gradient-text type="info">Create an account
        </n-gradient-text>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import "./index.scss";
import {useRouter} from 'vue-router'; //  导入 useRouter
import {useAuthStore} from '@/stores/auth';

const formData = reactive({
  username: "",
  password: "",
});

const router = useRouter(); //  获取 router 实例
const authStore = useAuthStore(); //  获取 auth store 实例


const login = () => {
  if (formData.username != null) {
    authStore.login();
    authStore.persistLoginStatus(); // 持久化登录状态 (示例使用 localStorage)
//  登录成功后，跳转到首页
    router.push('/');
  }
  console.log("登录失败")

}


</script>