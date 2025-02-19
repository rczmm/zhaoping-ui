<template>
  <n-form class="change-password-form" ref="ChangePasswordForm" :model="formData">
    <div class="desc">
      <n-text>修改你的密码</n-text>
    </div>

    <!-- 原密码输入框 -->
    <n-form-item label="Current Password">
      <n-input
          v-model:value="formData.currentPassword"
          placeholder="请输入当前密码"
          style="height: 40px; border-radius: 10px"
          clearable
          type="password"
      />
    </n-form-item>

    <!-- 新密码输入框 -->
    <n-form-item label="New Password">
      <n-input
          v-model:value="formData.newPassword"
          placeholder="请输入新密码"
          style="height: 40px; border-radius: 10px"
          clearable
          type="password"
      />
    </n-form-item>

    <!-- 确认新密码输入框 -->
    <n-form-item label="Confirm New Password">
      <n-input
          v-model:value="formData.confirmNewPassword"
          placeholder="请确认新密码"
          style="height: 40px; border-radius: 10px"
          clearable
          type="password"
      />
    </n-form-item>

    <!-- 提交按钮 -->
    <div class="button-div">
      <n-button type="primary" class="change-password-button" @click="changePassword">提交修改</n-button>
    </div>
  </n-form>
</template>

<script setup lang="js">
const formData = ref({
  currentPassword: '', // 当前密码
  newPassword: '', // 新密码
  confirmNewPassword: '' // 确认新密码
});

const changePassword = () => {
    // 校验密码是否一致
    if (this.formData.newPassword !== this.formData.confirmNewPassword) {
      this.$message.error('新密码和确认密码不一致');
      return;
    }

    // 进行密码修改逻辑
    try {
      // 你可以在这里调用 API，发送修改密码请求
      // 示例：
      // const response = await api.changePassword({
      //   currentPassword: this.formData.currentPassword,
      //   newPassword: this.formData.newPassword
      // });

      // 如果修改成功，给出反馈
      this.$message.success('密码修改成功');

      // 重置表单数据
      this.formData.currentPassword = '';
      this.formData.newPassword = '';
      this.formData.confirmNewPassword = '';
    } catch (error) {
      // 错误处理
      this.$message.error('密码修改失败，请重试');
    }
  }

</script>

<style scoped>
.change-password-form {
  max-width: 400px;
  margin: 0 auto;
}

.desc {
  text-align: center;
  margin-bottom: 20px;
}

.button-div {
  margin-top: 20px;
}

.change-password-button {
  width: 100%;
}

.signup {
  margin-top: 20px;
  text-align: center;
}

.signup-text {
  margin-right: 10px;
}
</style>
