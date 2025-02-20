<template>

  <div class="table-view">

    <div class="search-view">
      <div class="search-inputs">
        <n-input v-model:value="searchForm.candidate_name" round placeholder="请输入候选人姓名" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-input v-model:value="searchForm.candidate_phone" round placeholder="请输入联系电话" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-select v-model:value="searchForm.candidate_education" :options="educationOptions" round placeholder="请选择学历要求" class="search-item" />
        <n-select v-model:value="searchForm.candidate_experience" :options="experienceOptions" round placeholder="请选择工作经验" class="search-item" />
      </div>
      <div class="search-oper">
        <n-button type="primary" class="search-button" ghost @click="handleSearch">
          搜索
        </n-button>
        <n-button type="info" class="search-button" ghost @click="handleReset">
          重置
        </n-button>
      </div>
    </div>

    <n-gradient-text class="title">候选人列表</n-gradient-text>


    <div class="oper-button">
      <n-button type="success" ghost @click="handleNotify(multipleSelection[0])" :disabled="multipleSelection.length !== 1">
        通知候选人
      </n-button>
      <n-button type="error" ghost @click="handleDelete(multipleSelection)" :disabled="multipleSelection.length === 0">
        删除候选人
      </n-button>
    </div>

    <n-divider></n-divider>

    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable"/>
      <el-table-column fixed prop="candidate_name" label="候选人姓名" width="150"/>
      <el-table-column fixed prop="candidate_phone" label="候选人联系电话" width="150"/>
      <el-table-column fixed prop="candidate_email" label="候选人邮箱" width="150"/>
      <el-table-column fixed prop="candidate_gender" label="性别" width="150"/>
      <el-table-column fixed prop="candidate_dob" label="出生日期" width="150"/>
      <el-table-column fixed prop="candidate_address" label="居住地址" width="150"/>
      <el-table-column fixed prop="candidate_nationality" label="国籍" width="150"/>
      <el-table-column fixed prop="candidate_education" label="最高学历" width="150"/>
      <el-table-column fixed prop="candidate_major" label="专业" width="150"/>
      <el-table-column fixed prop="candidate_experience" label="工作经验" width="150"/>
      <el-table-column fixed prop="candidate_skills" label="掌握的技能" width="150"/>
      <el-table-column fixed prop="applied_jobs" label="申请的职位列表" width="150"/>
      <el-table-column fixed prop="resume_file" label="简历文件" width="150"/>
      <el-table-column fixed prop="interview_status" label="面试状态" width="150"/>
      <el-table-column fixed prop="interview_schedule" label="安排的时间" width="150"/>
      <el-table-column fixed prop="interview_feedback" label="面试反馈" width="150"/>
      <el-table-column fixed prop="hiring_status" label="招聘状态" width="150"/>
      <el-table-column fixed prop="remarks" label="备注信息" width="150"/>
    </el-table>

    <div class="pagination">
      <n-pagination
          :item-count="201"
          :page-sizes="[10, 20, 30, 40]"
          show-size-picker
      />
    </div>
  </div>

</template>

<script setup lang="js">
import { ref, reactive } from 'vue';
import { FlashOutline } from '@vicons/ionicons5';
import { ElMessage, ElMessageBox } from 'element-plus';
import './index.scss';

const educationOptions = [
  { label: '博士', value: '博士' },
  { label: '硕士', value: '硕士' },
  { label: '本科', value: '本科' },
  { label: '大专', value: '大专' },
  { label: '高中/中专', value: '高中/中专' },
  { label: '其他', value: '其他' }
];

const experienceOptions = [
  { label: '应届生', value: '应届生' },
  { label: '1-3年', value: '1-3年' },
  { label: '3-5年', value: '3-5年' },
  { label: '5-10年', value: '5-10年' },
  { label: '10年以上', value: '10年以上' }
];

const searchForm = reactive({
  candidate_name: '',
  candidate_phone: '',
  candidate_education: null,
  candidate_experience: null
});

const handleSearch = () => {
  console.log('搜索条件：', searchForm);
};

const handleReset = () => {
  Object.assign(searchForm, {
    candidate_name: '',
    candidate_phone: '',
    candidate_education: null,
    candidate_experience: null
  });
};

const selectable = (row) => row.hiring_status !== '已拒绝';

const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const handleNotify = async (row) => {
  if (!row) {
    ElMessage.warning('请选择要通知的候选人');
    return;
  }

  try {
    await ElMessageBox.confirm('确认要通知该候选人吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    });

    // 这里应该调用后端API进行通知
    console.log('通知候选人：', row.candidate_id);
    ElMessage.success('通知发送成功');
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('通知发送失败');
    }
  }
};

const handleDelete = async (rows) => {
  if (!rows || rows.length === 0) {
    ElMessage.warning('请选择要删除的候选人');
    return;
  }

  try {
    await ElMessageBox.confirm('确认要删除选中的候选人吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });

    // 这里应该调用后端API进行删除
    const deleteIds = rows.map(row => row.candidate_id);
    tableData.value = tableData.value.filter(item => !deleteIds.includes(item.candidate_id));
    ElMessage.success('删除成功');
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

const tableData = ref([
  {
    "candidate_id": "C001",
    "candidate_name": "张三",
    "candidate_phone": "13812345678",
    "candidate_email": "zhangsan@example.com",
    "candidate_gender": "男",
    "candidate_dob": "1990-01-01",
    "candidate_address": "北京市海淀区XX街道",
    "candidate_nationality": "中国",
    "candidate_education": "本科",
    "candidate_major": "计算机科学与技术",
    "candidate_experience": "3年",
    "candidate_skills": [
      "Java",
      "Spring",
      "MySQL",
      "Redis"
    ],
    "applied_jobs": [
      {
        "job_title": "Java开发工程师",
        "job_id": "J001",
        "apply_date": "2025-02-10",
        "resume_id": "R001"
      }
    ],
    "resume_file": {
      "file_name": "张三_Java开发工程师_简历.pdf",
      "file_type": "application/pdf",
      "file_size": 512000,
      "file_path": "/resumes/张三_Java开发工程师_简历.pdf",
      "upload_date": "2025-02-10"
    },
    "interview_status": "待安排面试",
    "interview_schedule": null,
    "interview_feedback": null,
    "hiring_status": "待定",
    "remarks": "候选人有较强的开发能力，待进一步评估技术能力"
  },
  {
    "candidate_id": "C002",
    "candidate_name": "李四",
    "candidate_phone": "13923456789",
    "candidate_email": "lisi@example.com",
    "candidate_gender": "女",
    "candidate_dob": "1992-06-15",
    "candidate_address": "上海市浦东新区XX街道",
    "candidate_nationality": "中国",
    "candidate_education": "硕士",
    "candidate_major": "市场营销",
    "candidate_experience": "5年",
    "candidate_skills": [
      "市场分析",
      "品牌推广",
      "谈判技巧"
    ],
    "applied_jobs": [
      {
        "job_title": "市场经理",
        "job_id": "J002",
        "apply_date": "2025-02-12",
        "resume_id": "R002"
      }
    ],
    "resume_file": {
      "file_name": "李四_市场经理_简历.docx",
      "file_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "file_size": 380000,
      "file_path": "/resumes/李四_市场经理_简历.docx",
      "upload_date": "2025-02-12"
    },
    "interview_status": "待安排面试",
    "interview_schedule": null,
    "interview_feedback": null,
    "hiring_status": "待定",
    "remarks": "候选人有较强的市场营销经验，适合该职位"
  },
  {
    "candidate_id": "C003",
    "candidate_name": "赵五",
    "candidate_phone": "13734567890",
    "candidate_email": "zhaowu@example.com",
    "candidate_gender": "男",
    "candidate_dob": "1989-11-20",
    "candidate_address": "深圳市南山区XX街道",
    "candidate_nationality": "中国",
    "candidate_education": "本科",
    "candidate_major": "产品设计",
    "candidate_experience": "4年",
    "candidate_skills": [
      "产品规划",
      "需求分析",
      "项目管理"
    ],
    "applied_jobs": [
      {
        "job_title": "产品经理",
        "job_id": "J003",
        "apply_date": "2025-02-15",
        "resume_id": "R003"
      }
    ],
    "resume_file": {
      "file_name": "赵五_产品经理_简历.pdf",
      "file_type": "application/pdf",
      "file_size": 450000,
      "file_path": "/resumes/赵五_产品经理_简历.pdf",
      "upload_date": "2025-02-15"
    },
    "interview_status": "已拒绝",
    "interview_schedule": null,
    "interview_feedback": "简历中缺乏相关的产品经验，不符合职位要求",
    "hiring_status": "已拒绝",
    "remarks": "简历不符合要求，已拒绝"
  }
]);

</script>