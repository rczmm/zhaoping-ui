<template>
  <div class="main-view">
    <el-menu
        router
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
      <el-menu-item index="position">后台系统</el-menu-item>
      <el-sub-menu index="2">
        <template #title>个人中心</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
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
import position from '../position/position.vue'
import './index.scss';
import interview from "@/pages/interview/interview.vue";
import resume from "@/pages/resume/resume.vue";
import candidate from "@/pages/candidate/candidate.vue";

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
  },
  {
    label: '职位管理',
    key: 'position',
  }, {
    label: '面试管理',
    key: 'interview',
  }, {
    label: '简历管理',
    key: 'resume',
  }, {
    label: '候选人管理',
    key: 'candidate',
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
    case 'position':
      return position;
    case 'interview':
      return interview;
    case 'resume':
      return resume;
    case 'candidate':
      return candidate;
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