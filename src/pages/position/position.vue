<template>

  <div class="table-view">

    <div class="search-view">
      <div class="search-inputs">
        <n-input v-model:value="searchForm.jobTitle" round placeholder="请输入职位名称" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline" />
          </template>
        </n-input>
        <n-input v-model:value="searchForm.workLocation" round placeholder="请输入工作地点" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline" />
          </template>
        </n-input>
        <n-space class="search-item" style="display: flex; align-items: center; gap: 8px; white-space: nowrap;">
          <n-input-number v-model:value="searchForm.minSalary" round placeholder="最低薪资" size="small" :min="0" style="width: 120px" />
          <span>-</span>
          <n-input-number v-model:value="searchForm.maxSalary" round placeholder="最高薪资" size="small" :min="0" style="width: 120px" />
          <span>k/月</span>
        </n-space>
        <n-select v-model:value="searchForm.jobType" round placeholder="请选择岗位类型" class="search-item" :options="generalOptions" />
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



    <n-gradient-text class="title">岗位列表</n-gradient-text>

    <div class="oper-button">
      <n-button type="primary" @click="printInfo" ghost>
        新增岗位
      </n-button>
      <n-button type="success" @click="handleEdit" ghost>
        编辑岗位
      </n-button>
      <n-button type="warning" ghost @click="handleDisable">
        停用岗位
      </n-button>
      <n-button type="error" ghost @click="handleDelete">
        删除岗位
      </n-button>
    </div>

    <n-divider></n-divider>

    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable" />
      <el-table-column fixed prop="job_title" label="职位名称" show-overflow-tooltip />
      <el-table-column prop="job_type" label="职位类别">
        <template #default="scope">
          <n-tag type="success" size="small" round>
            {{ tableData[scope.$index].job_type }}
          </n-tag>
        </template>
      </el-table-column>
      <el-table-column prop="job_description" label="职位描述" show-overflow-tooltip />
      <el-table-column prop="recruitment_count" label="招聘人数" />
      <el-table-column prop="work_location" label="工作地点" show-overflow-tooltip />
      <el-table-column prop="salary_range" label="薪资范围" show-overflow-tooltip />
      <el-table-column prop="benefits" label="福利待遇" show-overflow-tooltip />
      <el-table-column prop="education_requirements" label="学历要求" show-overflow-tooltip />
      <el-table-column prop="experience_requirements" label="工作经验要求" show-overflow-tooltip />
      <el-table-column prop="skills_requirements" label="技能要求" show-overflow-tooltip />
      <el-table-column prop="language_requirements" label="语言要求" show-overflow-tooltip />
      <el-table-column prop="other_requirements" label="其他能力要求" show-overflow-tooltip />
      <el-table-column prop="job_status" label="职位状态" show-overflow-tooltip>
        <template #default="scope">
          <n-tag type="success" size="small" round>
            {{ tableData[scope.$index].job_status }}
          </n-tag>
        </template>
      </el-table-column>
      <el-table-column prop="post_date" label="发布日期" show-overflow-tooltip />
      <el-table-column prop="close_date" label="截止日期" show-overflow-tooltip />
      <el-table-column prop="job_tags" label="备注" show-overflow-tooltip />
    </el-table>

    <div class="pagination">
      <n-pagination :item-count="201" :page-sizes="[10, 20, 30, 40]" show-size-picker />
    </div>
  </div>

  <div class="dialog-view">

    <el-dialog v-model="dialogShow" :title="isEdit ? '编辑岗位' : '新增岗位'">
      <n-form ref="formRef" :model="formData" :rules="rules" :size="size" label-placement="top">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="岗位名称" path="job_title">
            <n-input v-model:value="formData.job_title" placeholder="输入岗位名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="岗位类别" path="job_type">
            <el-select v-model="formData.job_type" :options="generalOptions" placeholder="请选择岗位类别">
              <el-option v-for="item in generalOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="岗位描述" path="job_description">
            <n-input v-model:value="formData.job_description" placeholder="输入岗位描述" type="textarea" :autosize="{
              minRows: 3,
              maxRows: 5
            }" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="工作地点" path="work_location">
            <n-input v-model:value="formData.work_location" placeholder="输入工作地点" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="招聘人数" path="recruitment_count">
            <n-input-number v-model:value="formData.recruitment_count" placeholder="输入招聘人数" :min="1" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="薪资范围(月薪/k)" path="salary_range">
            <n-space style="display: flex; align-items: center; white-space: nowrap;">
              <n-slider
                v-model:value="value"
                range
                :min="0"
                :max="100"
                :step="1"
                :marks="{
                  0: '0k',
                  20: '20k',
                  40: '40k',
                  60: '60k',
                  80: '80k',
                  100: '100k'
                }"
                style="width: 300px"
              />
              <span>{{ value[0] }}k - {{ value[1] }}k/月</span>
            </n-space>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="发布日期" path="post_date">
            <el-date-picker v-model="formData.post_date" type="date" :disabled-date="disabledDate" placeholder="选择发布日期"
              value-format="YYYY-MM-DD" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="学历要求" path="education_requirements">
            <el-select v-model="formData.education_requirements" placeholder="选择学历要求">
              <el-option v-for="item in [
              { label: '不限', value: '不限' },
              { label: '大专', value: '大专' },
              { label: '本科', value: '本科' },
              { label: '硕士', value: '硕士' },
              { label: '博士', value: '博士' }
            ]" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="工作经验" path="experience_requirements">
            <el-select v-model="formData.experience_requirements" placeholder="选择工作经验要求">
              <el-option v-for="item in [
              { label: '不限', value: '不限' },
              { label: '1年以下', value: '1年以下' },
              { label: '1-3年', value: '1-3年' },
              { label: '3-5年', value: '3-5年' },
              { label: '5年以上', value: '5年以上' }
            ]" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="福利待遇" path="benefits">
            <el-select v-model="formData.benefits" multiple placeholder="选择福利待遇（可多选）">
              <el-option v-for="item in [
              { label: '五险一金', value: '五险一金' },
              { label: '带薪年假', value: '带薪年假' },
              { label: '年终奖', value: '年终奖' },
              { label: '加班补助', value: '加班补助' },
              { label: '餐补', value: '餐补' },
              { label: '交通补助', value: '交通补助' },
              { label: '通讯补贴', value: '通讯补贴' },
              { label: '节日福利', value: '节日福利' }
            ]" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="是否急聘" path="switchValue">
            <n-switch v-model:value="formData.switchValue" />
          </n-form-item-gi>
          <n-gi :span="24">
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px">
              <n-button @click="dialogShow = false">取消</n-button>
              <n-button type="primary" @click="handleValidateButtonClick">确定</n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-form>
    </el-dialog>

  </div>

</template>

<script setup lang="ts">

import { FlashOutline } from '@vicons/ionicons5';
import './index.scss';
import type { TableInstance } from 'element-plus';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const formRef = ref();

const formData = ref({
  job_title: '',
  job_type: '',
  job_description: '',
  recruitment_count: 1,
  work_location: '',
  salary_range: '',
  benefits: [],
  education_requirements: '',
  experience_requirements: '',
  post_date: '',
  switchValue: false
});

const generalOptions = [
  { label: '全职', value: '全职' },
  { label: '兼职', value: '兼职' },
  { label: '实习', value: '实习' }
];

const value = ref([0, 0]);
const dialogShow = ref(false);

const multipleTableRef = ref<TableInstance>();
const multipleSelection = ref([])

const selectable = (row) => row.job_title

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const isEdit = ref(false);

const handleEdit = () => {
  if (multipleSelection.value.length !== 1) {
    alert('请选择一条数据进行编辑');
    return;
  }
  isEdit.value = true;
  dialogShow.value = true;
  const selectedData = multipleSelection.value[0];

  // 预填充表单数据
  Object.keys(formData.value).forEach(key => {
    if (key in selectedData) {
      formData.value[key] = selectedData[key];
    }
  });

  // 处理薪资范围
  if (selectedData.salary_range) {
    const matches = selectedData.salary_range.match(/￥(\d+)k - ￥(\d+)k/);
    if (matches) {
      value.value = [Number(matches[1]), Number(matches[2])];
    }
  }
}

const printInfo = () => {
  isEdit.value = false;
  dialogShow.value = true;
  console.log(multipleSelection.value);
}

const handleValidateButtonClick = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      const formValues = {
        ...formData,
        salary_range: `￥${value.value[0]}k - ￥${value.value[1]}k/月`,
        post_date: formData.post_date ? new Date(formData.post_date).toISOString().split('T')[0] : null
      };

      if (isEdit.value) {
        // 模拟更新操作
        const index = tableData.findIndex(item => item.job_title === multipleSelection.value[0].job_title);
        if (index !== -1) {
          tableData[index] = { ...tableData[index], ...formValues };
          window.$message.success('更新成功');
        }
      } else {
        // 添加到表格数据中
        tableData.unshift(formValues);
      }

      // 关闭对话框并重置表单
      dialogShow.value = false;
      formRef.value?.restoreValidation();
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          formData[key] = [];
        } else if (typeof formData[key] === 'boolean') {
          formData[key] = false;
        } else if (typeof formData[key] === 'number') {
          formData[key] = 0;
        } else {
          formData[key] = '';
        }
      });
      value.value = [0, 0];
      isEdit.value = false;
    } else {
      console.log(errors);
    }
  });
}

const tableData = [
  {
    "job_title": "Java开发工程师",
    "job_type": "全职",
    "job_description": "负责公司产品的后端开发工作，编写高质量的代码，参与系统架构设计与优化，进行性能调优等。",
    "recruitment_count": 5,
    "work_location": "北京市海淀区",
    "salary_range": "￥12,000 - ￥18,000/月",
    "benefits": [
      "五险一金",
      "带薪年假",
      "弹性工作制",
      "年终奖"
    ],
    "education_requirements": "本科及以上",
    "experience_requirements": "2年以上Java开发经验",
    "skills_requirements": [
      "精通Java编程语言，熟悉Spring框架",
      "熟悉MySQL数据库"
    ],
    "language_requirements": "英语六级以上",
    "other_requirements": "良好的沟通能力和团队协作精神",
    "job_status": "开放中",
    "post_date": "2025-02-01",
    "close_date": "2025-03-01",
    "interview_info": {
      "interview_stage": "初面",
      "interview_time": "2025-02-15 10:00",
      "interview_location": "北京市海淀区XX大厦",
      "interviewer": "张经理"
    },
    "promotion_path": "初级开发工程师 → 中级开发工程师 → 高级开发工程师",
    "job_tags": [
      "技术岗位",
      "后端开发"
    ],
    "department": "技术部",
    "recruitment_source": "在线招聘平台"
  },
  {
    "job_title": "市场经理",
    "job_type": "全职",
    "job_description": "负责市场调研与推广，制定市场策略，开拓新客户，维护老客户，提升品牌影响力。",
    "recruitment_count": 3,
    "work_location": "上海市浦东新区",
    "salary_range": "￥15,000 - ￥25,000/月",
    "benefits": [
      "五险一金",
      "带薪年假",
      "团队旅游",
      "股票期权"
    ],
    "education_requirements": "本科及以上，市场营销专业优先",
    "experience_requirements": "5年以上市场营销经验",
    "skills_requirements": [
      "良好的市场分析能力",
      "优秀的沟通与谈判技巧",
      "熟练使用办公软件"
    ],
    "language_requirements": "流利的英语口语和写作能力",
    "other_requirements": "能够承受较大工作压力，具备较强的团队合作精神",
    "job_status": "开放中",
    "post_date": "2025-02-05",
    "close_date": "2025-03-05",
    "interview_info": {
      "interview_stage": "复面",
      "interview_time": "2025-02-20 14:00",
      "interview_location": "上海市浦东新区XX大厦",
      "interviewer": "李总"
    },
    "promotion_path": "市场专员 → 市场经理 → 市场总监",
    "job_tags": [
      "市场岗位",
      "销售"
    ],
    "department": "市场部",
    "recruitment_source": "猎头"
  }
]

const handleDisable = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要停用的岗位');
    return;
  }

  ElMessageBox.confirm(
    `确定要停用选中的${multipleSelection.value.length}个岗位吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 模拟停用操作
    multipleSelection.value.forEach(item => {
      const index = tableData.findIndex(data => data.job_title === item.job_title);
      if (index !== -1) {
        tableData[index].job_status = '已停用';
      }
    });
    ElMessage.success('停用成功');
  }).catch(() => { })
}

const handleDelete = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的岗位');
    return;
  }

  ElMessageBox.confirm(
    `确定要删除选中的${multipleSelection.value.length}个岗位吗？此操作不可恢复！`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    }
  ).then(() => {
    // 模拟删除操作
    multipleSelection.value.forEach(item => {
      const index = tableData.findIndex(data => data.job_title === item.job_title);
      if (index !== -1) {
        tableData.splice(index, 1);
      }
    });
    ElMessage.success('删除成功');
  }).catch(() => { })
}
const searchForm = ref({
  jobTitle: '',
  workLocation: '',
  minSalary: null,
  maxSalary: null,
  jobType: null
});

const handleSearch = () => {
  alert(`搜索条件：\n职位名称：${searchForm.value.jobTitle}\n工作地点：${searchForm.value.workLocation}\n薪资范围：${searchForm.value.minSalary || 0}k - ${searchForm.value.maxSalary || 0}k\n岗位类型：${searchForm.value.jobType || '未选择'}`)
}

const handleReset = () => {
  searchForm.value.jobTitle = '';
  searchForm.value.workLocation = '';
  searchForm.value.minSalary = null;
  searchForm.value.maxSalary = null;
  searchForm.value.jobType = null;
}
</script>