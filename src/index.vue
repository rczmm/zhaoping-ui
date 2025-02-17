<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link>
      |
      <router-link to="/login">登录</router-link>
      |
      <router-link to="/register">注册</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup>
import {RouterView, RouterLink} from 'vue-router'; // 显式导入 (可选，推荐)
</script>

<style scoped>
nav {
  padding: 20px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
}

nav a.router-link-exact-active {
  color: white;
  background-color: #42b983;
}
</style>