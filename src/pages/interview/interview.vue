<template>

  <div class="table-view">

    <div class="search-view">
      <div class="search-inputs">
        <n-input round placeholder="请输入候选人姓名" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-input round placeholder="请输入职位名称" class="search-item">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
        <n-input round placeholder="请输入面试时间" class="search-item">
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

    <n-gradient-text class="title">面试列表</n-gradient-text>


    <div class="oper-button">
      <n-button type="success" ghost>
        修改
      </n-button>
      <n-button type="warning" ghost>
        取消
      </n-button>
      <n-button type="error" ghost>
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

import {FlashOutline} from '@vicons/ionicons5';
import './index.scss';

const selectable = (row) => row.job_title

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const tableData = [
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
]


</script>