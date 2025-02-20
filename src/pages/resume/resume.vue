<template>

  <div class="table-view">

    <div class="search-view">
      <div class="search-inputs">
        <n-select v-model:value="searchForm.resume_status" :options="resumeStatusOptions" round placeholder="请选择简历状态" class="search-item" />
        <n-date-picker v-model:value="searchForm.submission_date" type="date" round placeholder="请选择提交日期" class="search-item" />
        <n-input v-model:value="searchForm.reviewer" round placeholder="请输入审核人员" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-select v-model:value="searchForm.interview_status" :options="interviewStatusOptions" round placeholder="请选择面试状态" class="search-item" />
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

    <n-gradient-text class="title">简历列表</n-gradient-text>

    <div class="oper-button">
      <n-button type="info" ghost @click="handleDownload(multipleSelection[0])" :disabled="multipleSelection.length !== 1">
        下载
      </n-button>
      <n-button type="success" ghost @click="handleBatchExport(multipleSelection)" :disabled="multipleSelection.length === 0">
        批量导出
      </n-button>
      <n-button type="error" ghost @click="handleDelete(multipleSelection)" :disabled="multipleSelection.length === 0">
        删除简历
      </n-button>
    </div>

    <n-divider></n-divider>

    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable"/>
      <el-table-column fixed prop="resume_status" label="简历的状态" width="150"/>
      <el-table-column fixed prop="submission_date" label="简历提交的日期" width="150"/>
      <el-table-column fixed prop="reviewer" label="审核简历的人员姓名" width="150"/>
      <el-table-column fixed prop="review_feedback" label="反馈" width="150" show-overflow-tooltip/>
      <el-table-column fixed prop="interview_status" label="面试状态" width="150"/>
      <el-table-column fixed prop="interview_time" label="面试的时间" width="150"/>
      <el-table-column fixed prop="interview_location" label="面试的地点" width="150"/>
      <el-table-column fixed prop="remarks" label="备注" width="150" show-overflow-tooltip/>
      <el-table-column fixed prop="resume_file" label="简历" width="150" show-overflow-tooltip>
        <n-icon>
          <n-icon :component="Download"/>
        </n-icon>
      </el-table-column>
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
import { Download, FlashOutline } from '@vicons/ionicons5';
import { ElMessage, ElMessageBox } from 'element-plus';
import './index.scss';

const resumeStatusOptions = [
  { label: '待审核', value: '待审核' },
  { label: '已通过筛选', value: '已通过筛选' },
  { label: '已拒绝', value: '已拒绝' }
];

const interviewStatusOptions = [
  { label: '待安排面试', value: '待安排面试' },
  { label: '已安排面试', value: '已安排面试' },
  { label: '已完成面试', value: '已完成面试' },
  { label: '已拒绝', value: '已拒绝' }
];

const searchForm = reactive({
  resume_status: '',
  submission_date: null,
  reviewer: '',
  interview_status: ''
});

const handleSearch = () => {
  console.log('搜索条件：', {
    ...searchForm,
    submission_date: searchForm.submission_date ? new Date(searchForm.submission_date).toISOString().split('T')[0] : null
  });
};

const handleReset = () => {
  Object.assign(searchForm, {
    resume_status: '',
    submission_date: null,
    reviewer: '',
    interview_status: ''
  });
};

const selectable = (row) => row.resume_status !== '已拒绝';

const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const handleDownload = (row) => {
  if (!row) {
    ElMessage.warning('请选择要下载的简历');
    return;
  }
  // 这里应该调用后端API进行下载
  console.log('下载简历：', row.resume_file);
  ElMessage.success('开始下载简历');
};

const handleBatchExport = async (rows) => {
  if (!rows || rows.length === 0) {
    ElMessage.warning('请选择要导出的简历');
    return;
  }

  try {
    // 这里应该调用后端API进行批量导出
    console.log('批量导出简历：', rows.map(row => row.resume_id));
    ElMessage.success('开始导出所选简历');
  } catch (error) {
    ElMessage.error('导出失败');
  }
};

const handleDelete = async (rows) => {
  if (!rows || rows.length === 0) {
    ElMessage.warning('请选择要删除的简历');
    return;
  }

  try {
    await ElMessageBox.confirm('确认要删除选中的简历吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });

    // 这里应该调用后端API进行删除
    const deleteIds = rows.map(row => row.resume_id);
    tableData.value = tableData.value.filter(item => !deleteIds.includes(item.resume_id));
    ElMessage.success('删除成功');
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

const tableData = ref([
  {
    "resume_id": "R001",
    "candidate_name": "张三",
    "candidate_phone": "13812345678",
    "candidate_email": "zhangsan@example.com",
    "job_title": "Java开发工程师",
    "resume_file": {
      "file_name": "张三_Java开发工程师_简历.pdf",
      "file_type": "application/pdf",
      "file_size": 512000,
      "file_path": "/resumes/张三_Java开发工程师_简历.pdf",
      "upload_date": "2025-02-10"
    },
    "resume_status": "待审核",
    "submission_date": "2025-02-10",
    "reviewer": "李经理",
    "review_feedback": null,
    "interview_status": "待安排面试",
    "interview_time": null,
    "interview_location": null,
    "remarks": "候选人有较强的开发能力，待进一步评估技术能力",
    "follow_up_action": "安排技术面试"
  },
  {
    "resume_id": "R002",
    "candidate_name": "李四",
    "candidate_phone": "13923456789",
    "candidate_email": "lisi@example.com",
    "job_title": "市场经理",
    "resume_file": {
      "file_name": "李四_市场经理_简历.docx",
      "file_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "file_size": 380000,
      "file_path": "/resumes/李四_市场经理_简历.docx",
      "upload_date": "2025-02-12"
    },
    "resume_status": "已通过筛选",
    "submission_date": "2025-02-12",
    "reviewer": "王总",
    "review_feedback": "有较强的市场营销经验，适合该职位",
    "interview_status": "待安排面试",
    "interview_time": null,
    "interview_location": null,
    "remarks": "薪资要求较高，需进一步确认",
    "follow_up_action": "安排复面，讨论薪资问题"
  },
  {
    "resume_id": "R003",
    "candidate_name": "赵五",
    "candidate_phone": "13734567890",
    "candidate_email": "zhaowu@example.com",
    "job_title": "产品经理",
    "resume_file": {
      "file_name": "赵五_产品经理_简历.pdf",
      "file_type": "application/pdf",
      "file_size": 450000,
      "file_path": "/resumes/赵五_产品经理_简历.pdf",
      "upload_date": "2025-02-15"
    },
    "resume_status": "已拒绝",
    "submission_date": "2025-02-15",
    "reviewer": "陈总",
    "review_feedback": "简历中缺乏相关的产品经验，不符合职位要求",
    "interview_status": "已拒绝",
    "interview_time": null,
    "interview_location": null,
    "remarks": "简历不符合要求，已拒绝",
    "follow_up_action": "无"
  }
]);


</script>