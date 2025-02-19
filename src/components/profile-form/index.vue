<template>
  <div class="profile-container">
    <!-- 个人资料展示卡片 -->
    <n-card class="profile-card">
      <div class="profile-header">
        <n-avatar :src="formData.avatar[0]?.url || defaultAvatar" size="100"/>
        <div class="profile-info">
          <n-text class="profile-name">{{ formData.name || '姓名未设置' }}</n-text>
          <n-text class="profile-email">{{ formData.email || '邮箱未设置' }}</n-text>
          <n-text class="profile-phone">{{ formData.phone || '电话未设置' }}</n-text>
        </div>
      </div>
    </n-card>

    <n-form class="profile-form" ref="ProfileForm" :model="formData">
      <div class="desc">
        <n-text>编辑个人资料</n-text>
      </div>

      <!-- 头像上传 -->
      <n-form-item label="Avatar">
        <n-upload
            v-model:files="formData.avatar"
            action="/upload-avatar"
            list-type="picture-card"
            :show-file-list="false"
            :auto-upload="false"
            :before-upload="beforeUpload"
        >
          <n-button>上传头像</n-button>
        </n-upload>
        <div v-if="formData.avatar && formData.avatar.length > 0" class="avatar-preview">
          <img :src="formData.avatar[0].url" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%;"/>
        </div>
      </n-form-item>

      <!-- 姓名 -->
      <n-form-item label="Name">
        <n-input v-model:value="formData.name" placeholder="请输入姓名" style="height: 40px; border-radius: 10px"
                 clearable/>
      </n-form-item>

      <!-- 邮箱 -->
      <n-form-item label="Email">
        <n-input v-model:value="formData.email" placeholder="请输入邮箱" style="height: 40px; border-radius: 10px"
                 clearable/>
      </n-form-item>

      <!-- 电话 -->
      <n-form-item label="Phone">
        <n-input v-model:value="formData.phone" placeholder="请输入电话" style="height: 40px; border-radius: 10px"
                 clearable/>
      </n-form-item>

      <!-- 提交按钮 -->
      <div class="button-div">
        <n-button type="primary" class="save-button" @click="saveProfile">保存</n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="js">
const formData = ref({
  avatar: [], // 头像
  name: '',    // 姓名
  email: '',   // 邮箱
  phone: ''    // 电话
});
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    this.$message.error('只能上传图片文件！');
  }
  const isSmallEnough = file.size / 1024 / 1024 < 2; // 2MB 限制
  if (!isSmallEnough) {
    this.$message.error('图片文件大小不能超过 2MB！');
  }
  return isImage && isSmallEnough;
};
const saveProfile = () => {
  // 校验必填项
  if (!this.formData.name || !this.formData.email || !this.formData.phone) {
    this.$message.error('请填写所有必填项');
    return;
  }

  try {
    // 假设你有一个API接口来保存用户资料
    // 示例代码：
    // const response = await api.saveProfile(this.formData);

    // 提交成功后，给出成功提示
    this.$message.success('资料保存成功！');

    // 清空表单数据（如果需要）
    // this.formData = {
    //   avatar: [],
    //   name: '',
    //   email: '',
    //   phone: ''
    // };

  } catch (error) {
    // 错误处理
    this.$message.error('保存失败，请重试');
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.profile-card {
  margin-bottom: 30px;
  padding: 20px;
  text-align: center;
}

.profile-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-info {
  margin-left: 20px;
}

.profile-name {
  font-size: 18px;
  font-weight: bold;
}

.profile-email,
.profile-phone {
  font-size: 14px;
  color: #777;
}

.avatar-preview {
  margin-top: 10px;
}

.button-div {
  margin-top: 20px;
}

.save-button {
  width: 100%;
}
</style>
