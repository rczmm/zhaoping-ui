<template>

  <div class="table-view">

    <div class="search-view">
      <div class="search-inputs">
        <n-input round placeholder="请输入简历状态" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-input round placeholder="请输入提交日期" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-input round placeholder="请输入审核人员" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-input round placeholder="请输入面试状态" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
      </div>
      <div class="search-oper">
        <n-button type="primary" class="search-button" ghost>
          搜索
        </n-button>
        <n-button type="info" class="search-button" ghost>
          重置
        </n-button>
      </div>
    </div>

    <n-gradient-text class="title">简历列表</n-gradient-text>

    <div class="oper-button">
      <n-button type="info" ghost>
        下载
      </n-button>
      <n-button type="success" ghost>
        批量导出
      </n-button>
      <n-button type="error" ghost>
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

import {Download, FlashOutline} from '@vicons/ionicons5';
import './index.scss';

const selectable = (row) => row.job_title

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const tableData = [
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
]


</script>