<template>
  <div class="main-view">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item index="0">
        <img
            style="width: 100px"
            src="https://bootstrapdemos.wrappixel.com/materialM/dist/assets/images/logos/dark-logo.svg"
            alt="Element logo"
        />
      </el-menu-item>
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>

    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="200"
            show-trigger
        >
          <n-menu
              class="menu-options"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              :value="activeKey"
              @update:value="handleMenuSelect"
          />
        </n-layout-sider>
        <n-layout>
          <component :is="currentComponent"/>
        </n-layout>
      </n-layout>
    </n-space>
  </div>


</template>

<script setup lang="js">

import login from '../login/login.vue';
import register from '../register/register.vue';
import index from '../index/index.vue';
import './index.scss';

const menuOptions = [
  {
    label: '首页',
    key: 'index'
  },
  {
    label: '注册',
    key: 'register',
  },
  {
    label: '登录',
    key: 'login',
  }
];

const activeKey = ref('login'); // 初始化默认选中的菜单项

const currentComponent = computed(() => {
  switch (activeKey.value) {
    case 'login':
      return login;
    case 'register':
      return register;
    case 'index':
      return index;
    default:
      return login; // 或者返回一个默认组件
  }
});

const handleMenuSelect = (key) => {
  activeKey.value = key;
};

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>