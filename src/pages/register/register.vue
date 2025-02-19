<template>

  <div class="register-view">
    <n-form class="register-form">

      <div class="title">
        <n-gradient-text type="info" size="25px">后台系统</n-gradient-text>
      </div>
      <div class="desc">
        <n-text>最适合你的管理方案</n-text>
      </div>
      <n-form-item label="Username">
        <n-input v-model:value="inputValue" placeholder="" style="height: 40px;border-radius: 10px" clearable/>
      </n-form-item>
      <n-form-item label="Email Address">
        <n-input v-model:value="inputValue" placeholder="" style="height: 40px;border-radius: 10px" clearable/>
      </n-form-item>
      <n-form-item label="Password">
        <n-input v-model:value="inputValue" placeholder="" style="height: 40px;border-radius: 10px" clearable/>
      </n-form-item>
      <div class="button-div">
        <n-button type="primary" class="login-button">注册</n-button>
      </div>
      <div class="signup">
        <n-text style="margin-right: 10px">Already have an Account?
        </n-text>
        <n-gradient-text type="info"> Sign In
        </n-gradient-text>
      </div>
    </n-form>
  </div>

</template>

<script setup lang="js">
import './register.scss';

</script>