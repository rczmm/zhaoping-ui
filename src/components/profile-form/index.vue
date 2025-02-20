<template>
  <div class="profile-container">
    <!-- 个人资料展示卡片 -->
    <n-card class="profile-card">
      <div class="profile-header">
        <n-avatar :src="formData.avatar[0] || defaultAvatar" size="100"/>
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
  avatar: [
    'https://i0.hdslb.com/bfs/archive/edf221c70fb714784ff56985499c8c429719c839.jpg'
  ], // 头像
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
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 20px auto;
  gap: 30px;
  padding: 0 20px;
}

.profile-card {
  flex: 1;
  margin-bottom: 0;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: #fff;
  height: fit-content;
}

.profile-form {
  flex: 2;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.profile-info {
  margin-left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.profile-email,
.profile-phone {
  font-size: 16px;
  color: #666;
  display: block;
}

.desc {
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
}

.desc .n-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.avatar-preview {
  margin-top: 16px;
}

.button-div {
  margin-top: 30px;
}

.save-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
  }
  
  .profile-card,
  .profile-form {
    width: 100%;
  }
}
</style>
