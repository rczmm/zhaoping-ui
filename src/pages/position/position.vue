<template>

  <div class="table-view">

    <div class="search-view">
      <n-input round placeholder="搜索" class="search-item">
        <template #suffix>
          <n-icon :component="FlashOutline"/>
        </template>
      </n-input>
      <n-input round placeholder="搜索" class="search-item">
        <template #suffix>
          <n-icon :component="FlashOutline"/>
        </template>
      </n-input>
      <n-input round placeholder="搜索" class="search-item">
        <template #suffix>
          <n-icon :component="FlashOutline"/>
        </template>
      </n-input>
      <n-input round placeholder="搜索" class="search-item">
        <template #suffix>
          <n-icon :component="FlashOutline"/>
        </template>
      </n-input>
    </div>

    <div class="search-oper">
      <n-button type="info" class="search-button">
        搜索
      </n-button>
      <n-button type="info" class="search-button">
        重置
      </n-button>
    </div>

    <n-gradient-text class="title">岗位列表</n-gradient-text>

    <div class="oper-button">
      <n-button type="info" @click="printInfo">
        新增岗位
      </n-button>
      <n-button type="success">
        编辑岗位
      </n-button>
      <n-button type="warning">
        停用岗位
      </n-button>
      <n-button type="error">
        删除岗位
      </n-button>
    </div>

    <n-divider></n-divider>

    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable"/>
      <el-table-column fixed prop="job_title" label="职位名称" show-overflow-tooltip/>
      <el-table-column prop="job_type" label="职位类别">
        <template #default="scope">
          <n-tag type="success" size="small" round>
            {{ tableData[scope.$index].job_type }}
          </n-tag>
        </template>
      </el-table-column>
      <el-table-column prop="job_description" label="职位描述" show-overflow-tooltip/>
      <el-table-column prop="recruitment_count" label="招聘人数"/>
      <el-table-column prop="work_location" label="工作地点" show-overflow-tooltip/>
      <el-table-column prop="salary_range" label="薪资范围" show-overflow-tooltip/>
      <el-table-column prop="benefits" label="福利待遇" show-overflow-tooltip/>
      <el-table-column prop="education_requirements" label="学历要求" show-overflow-tooltip/>
      <el-table-column prop="experience_requirements" label="工作经验要求" show-overflow-tooltip/>
      <el-table-column prop="skills_requirements" label="技能要求" show-overflow-tooltip/>
      <el-table-column prop="language_requirements" label="语言要求" show-overflow-tooltip/>
      <el-table-column prop="other_requirements" label="其他能力要求" show-overflow-tooltip/>
      <el-table-column prop="job_status" label="职位状态" show-overflow-tooltip>
        <template #default="scope">
          <n-tag type="success" size="small" round>
            {{ tableData[scope.$index].job_status }}
          </n-tag>
        </template>
      </el-table-column>
      <el-table-column prop="post_date" label="发布日期" show-overflow-tooltip/>
      <el-table-column prop="close_date" label="截止日期" show-overflow-tooltip/>
      <el-table-column prop="job_tags" label="备注" show-overflow-tooltip/>
    </el-table>

    <div class="pagination">
      <n-pagination
          :item-count="201"
          :page-sizes="[10, 20, 30, 40]"
          show-size-picker
      />
    </div>


  </div>

  <div class="dialog-view">

    <el-dialog v-model="dialogShow" title="新增岗位">
      <n-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          :size="size"
          label-placement="top"
      >
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="岗位名称" path="inputValue">
            <n-input v-model:value="formData.job_title" placeholder="输入岗位名称："/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="岗位描述" path="textareaValue">
            <n-input
                v-model:value="formData.job_description"
                placeholder="输入岗位描述："
                type="textarea"
                :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="岗位类别" path="selectValue">
            <el-select v-model="formData.job_type" placeholder="请选择岗位类别：">
              <el-option
                  v-for="item in generalOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="截止日期" path="datetimeValue">
            <el-date-picker v-model="formData.post_date" type="date"
                            :disabled-date="disabledDate"
                            placeholder="请选择开始时间："/>


          </n-form-item-gi>
          <n-form-item-gi :span="12" label="工作地点" path="inputValue">
            <n-input v-model:value="formData.work_location" placeholder="输入工作地点："/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="是否急聘" path="switchValue">
            <n-switch v-model:value="formData.switchValue"/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="薪资范围 |月(单位：k)" path="switchValue">
            <n-space vertical>
              <n-slider v-model:value="value" range :step="0.5"/>
              <n-space>
                <n-input-number v-model:value="value[0]" size="small"/>
                <n-input-number v-model:value="value[1]" size="small"/>
              </n-space>
            </n-space>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="薪资范围 |日(单位：元)" path="switchValue">
            <n-space vertical>
              <n-slider v-model:value="value" range :step="0.5"/>
              <n-space>
                <n-input-number v-model:value="value[0]" size="small"/>
                <n-input-number v-model:value="value[1]" size="small"/>
              </n-space>
            </n-space>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="福利待遇" path="checkboxGroupValue">
            <n-checkbox-group v-model:value="formData.checkboxGroupValue">
              <n-space>
                <n-checkbox value="Option 1">
                  Option 1
                </n-checkbox>
                <n-checkbox value="Option 2">
                  Option 2
                </n-checkbox>
                <n-checkbox value="Option 3">
                  Option 3
                </n-checkbox>
              </n-space>
            </n-checkbox-group>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Radio Group" path="radioGroupValue">
            <n-radio-group v-model:value="formData.radioGroupValue" name="radiogroup1">
              <n-space>
                <n-radio value="Radio 1">
                  Radio 1
                </n-radio>
                <n-radio value="Radio 2">
                  Radio 2
                </n-radio>
                <n-radio value="Radio 3">
                  Radio 3
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item-gi>
          <n-form-item-gi
              :span="12"
              label="Radio Button Group"
              path="radioGroupValue"
          >
            <n-radio-group v-model:value="formData.radioGroupValue" name="radiogroup2">
              <n-radio-button value="Radio 1">
                Radio 1
              </n-radio-button>
              <n-radio-button value="Radio 2">
                Radio 2
              </n-radio-button>
              <n-radio-button value="Radio 3">
                Radio 3
              </n-radio-button>
            </n-radio-group>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="招聘人数" path="inputNumberValue">
            <n-input-number v-model:value="formData.recruitment_count" placeholder="输入招聘人数："/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Time Picker" path="timePickerValue">
            <n-time-picker v-model:value="formData.timePickerValue"/>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="Slider" path="sliderValue">
            <n-slider v-model:value="formData.sliderValue" :step="5"/>
          </n-form-item-gi>
          <n-form-item-gi :span="14" label="Transfer" path="transferValue">
            <n-transfer
                v-model:value="formData.transferValue"
                style="width: 100%"
                :options="generalOptions"
            />
          </n-form-item-gi>
          <n-gi :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="handleValidateButtonClick">
                验证
              </n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-form>
    </el-dialog>

  </div>

</template>

<script setup lang="ts">

import {FlashOutline} from '@vicons/ionicons5';
import './index.scss';
import type {TableInstance} from 'element-plus';

const value = ref([0, 0]);

const dialogShow = ref(false);

const multipleTableRef = ref<TableInstance>();
const multipleSelection = ref([])

const selectable = (row) => row.job_title

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const printInfo = () => {
  dialogShow.value = true
  console.log(multipleSelection.value)
}

const generalOptions = [
  {
    label: '全职',
    value: '全职',
  },
  {
    label: '兼职',
    value: '兼职',
  },
  {
    label: '实习',
    value: '实习'
  }
];

const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() + 24 * 60 * 60 * 1000 * 2;
}

const formRef = ref();

const formData = reactive({
  job_title: '',
  job_type: '',
  job_description: '',
  recruitment_count: '',
  work_location: '',
  salary_range: '',
  benefits: '',
  education_requirements: '',
  experience_requirements: '',
  skills_requirements: '',
  language_requirements: '',
  other_requirements: '',
  job_status: '',
  post_date: null,
  close_date: null,
  interview_info: '',
})

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


</script>