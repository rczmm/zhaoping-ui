<template>
  <div class="table-view">
    <div class="search-view">
      <div class="search-inputs">
        <n-input v-model:value="searchForm.candidate_name" round placeholder="请输入候选人姓名" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-input v-model:value="searchForm.job_title" round placeholder="请输入职位名称" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-date-picker v-model:value="searchForm.interview_time" type="datetime" round placeholder="请选择面试时间" class="search-item" />
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

    <n-gradient-text class="title">面试列表</n-gradient-text>

    <div class="oper-button">
      <n-button type="success" ghost @click="handleSaveEdit(multipleSelection[0])" :disabled="multipleSelection.length !== 1">
        修改
      </n-button>
      <n-button type="warning" ghost @click="handleCancel(multipleSelection[0])" :disabled="multipleSelection.length !== 1">
        取消
      </n-button>
      <n-button type="error" ghost @click="handleDelete(multipleSelection)" :disabled="multipleSelection.length === 0">
        删除
      </n-button>
    </div>

    <n-divider></n-divider>

    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable"/>
      <el-table-column fixed prop="candidate_name" label="候选人姓名" width="150"/>
      <el-table-column fixed prop="candidate_phone" label="候选人联系电话" width="150"/>
      <el-table-column fixed prop="candidate_email" label="候选人邮箱" width="150" show-overflow-tooltip/>
      <el-table-column fixed prop="job_title" label="职位名称" width="150"/>
      <el-table-column fixed prop="interview_time" label="面试的时间" width="150"/>
      <el-table-column fixed prop="interview_location" label="面试的地点" width="150" show-overflow-tooltip/>
      <el-table-column fixed prop="interviewer" label="面试官姓名" width="150"/>
      <el-table-column fixed prop="interview_type" label="面试类型" width="150"/>
      <el-table-column fixed prop="interview_status" label="面试状态" width="150"/>
      <el-table-column fixed prop="interview_feedback" label="反馈内容" width="150" show-overflow-tooltip/>
      <el-table-column fixed prop="remarks" label="备注信息" width="150" show-overflow-tooltip/>
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
import { ElMessage } from 'element-plus';
import './index.scss';

const interviewStatusOptions = [
  { label: '待面试', value: '待面试' },
  { label: '面试中', value: '面试中' },
  { label: '已完成', value: '已完成' },
  { label: '已取消', value: '已取消' },
  { label: '未通过', value: '未通过' }
];

const showEditDialog = ref(false);
const editForm = reactive({
  interview_id: '',
  candidate_name: '',
  job_title: '',
  interview_time: null,
  interview_location: '',
  interviewer: '',
  interview_type: null,
  interview_status: '',
  remarks: ''
});

const searchForm = reactive({
  candidate_name: '',
  job_title: '',
  interview_time: null,
  interview_status: ''
});

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 16).replace('T', ' ');
};

const tableData = ref([
  {
    "interview_id": "I001",
    "candidate_name": "张三",
    "candidate_phone": "13812345678",
    "candidate_email": "zhangsan@example.com",
    "job_title": "Java开发工程师",
    "interview_stage": "初面",
    "interview_time": "2025-02-20 10:00",
    "interview_location": "北京市海淀区XX大厦",
    "interviewer": "李经理",
    "interview_type": "视频面试",
    "interview_status": "待面试",
    "interview_feedback": null,
    "remarks": "候选人有2年Java开发经验，需进一步评估技术能力",
    "follow_up_action": "安排技术复面"
  },
  {
    "interview_id": "I002",
    "candidate_name": "李四",
    "candidate_phone": "13923456789",
    "candidate_email": "lisi@example.com",
    "job_title": "市场经理",
    "interview_stage": "复面",
    "interview_time": "2025-02-22 14:00",
    "interview_location": "上海市浦东新区XX大厦",
    "interviewer": "王总",
    "interview_type": "现场面试",
    "interview_status": "面试中",
    "interview_feedback": "候选人有丰富的市场营销经验，沟通能力强，但薪资要求较高",
    "remarks": "建议进一步谈判薪资",
    "follow_up_action": "与候选人确认薪资要求"
  },
  {
    "interview_id": "I003",
    "candidate_name": "赵五",
    "candidate_phone": "13734567890",
    "candidate_email": "zhaowu@example.com",
    "job_title": "产品经理",
    "interview_stage": "终面",
    "interview_time": "2025-02-25 09:00",
    "interview_location": "深圳市南山区XX大厦",
    "interviewer": "陈总",
    "interview_type": "电话面试",
    "interview_status": "已完成",
    "interview_feedback": "候选人对产品管理有深入理解，创新能力强，面试表现优秀",
    "remarks": "推荐录用",
    "follow_up_action": "发送offer"
  }
]);
const handleSearch = () => {
  // 这里应该调用后端API进行搜索
  console.log('搜索条件：', {
    ...searchForm,
    interview_time: formatDate(searchForm.interview_time)
  });
};
const handleReset = () => {
  Object.assign(searchForm, {
    candidate_name: '',
    job_title: '',
    interview_time: null,
    interview_status: ''
  });
};

const handleSaveEdit = async () => {
  try {
    // 这里应该调用后端API
    const index = tableData.findIndex(item => item.interview_id === editForm.interview_id);
    if (index !== -1) {
      Object.assign(tableData[index], editForm);
    }
    showEditDialog.value = false;
    ElMessage.success('修改成功');
  } catch (error) {
    ElMessage.error('修改失败');
  }
};

const selectable = (row) => row.interview_status !== '已取消';

const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const handleDelete = async (rows) => {
  if (!rows || rows.length === 0) {
    ElMessage.warning('请选择要删除的面试记录');
    return;
  }

  try {
    await ElMessageBox.confirm('确认要删除选中的面试记录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });

    // 这里应该调用后端API进行删除
    const deleteIds = rows.map(row => row.interview_id);
    tableData.value = tableData.value.filter(item => !deleteIds.includes(item.interview_id));
    ElMessage.success('删除成功');
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

</script>