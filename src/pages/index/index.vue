<template>
  <div class="page-container">

    <div class="chart">

      <n-card title="招聘渠道" hoverable class="line-chart">
        <template #header-extra>
          <n-select v-model:value="value" :options="options" />
        </template>
        <v-chart :option="lineOption" autoresize />
      </n-card>

      <div class="small-chart">

        <n-card title="招聘目标" hoverable class="bar-chart-small">
          <template #header-extra>
            <n-select v-model:value="value" :options="options" />
          </template>
          <v-chart :option="barOption" autoresize />
        </n-card>

        <n-card title="入职人数" hoverable class="line-chart-small">
          <template #header-extra>
            <n-select v-model:value="value" :options="options" />
          </template>
          <v-chart :option="smallLineOption" autoresize />
        </n-card>
      </div>


    </div>

    <div class="rank-list">
      <div class="popular-rank">
        <n-card title="热门岗位" hoverable class="popular-list">
          <template #header-extra>
            <n-gradient-text>最热门的九个岗位</n-gradient-text>
          </template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="post" label="岗位" />
            <el-table-column prop="price" label="薪资范围" />
            <el-table-column prop="attention" label="已投递|看过" width="180">
              <template #default="scope">
                <div class="attention-item">
                  <n-text>{{ tableData[scope.$index].attention }} (人)</n-text>
                  <n-progress style="width: 100%" type="line" :percentage="tableData[scope.$index].value"
                    :show-indicator="false" :color="{ stops: ['#E3F2FD', '#2080f0'] }" />
                </div>
              </template>

            </el-table-column>
            <el-table-column prop="num" label="招聘进度">
              <template #default="scope">
                <el-progress :percentage="100" :stroke-width="15" striped striped-flow :duration="10" />
              </template>
            </el-table-column>
            <el-table-column prop="value" label="剩余岗位" />
            <el-table-column prop="value" label="岗位性质" />
            <el-table-column fixed="right" label="" min-width="120">
              <template #default="scope">
                <n-dropdown trigger="hover" :options="options" @select="handleSelect">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler icon-tabler-dots-vertical" width="20px"
                    height="20px" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" color="grey100">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  </svg>
                </n-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </n-card>
      </div>
      <div class="earn-rank">
        <n-card title="新增岗位" hoverable class="earn-list">
          <el-table :data="reportData">
            <el-table-column label="岗位">
              <template #default="scope">
                <div class="report-item">
                  <div class="item-info">
                    <n-text>{{ scope.row.post }}</n-text>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <div class="report-item">
                  <div class="item-info">
                    <n-text>+ {{ scope.row.num }}</n-text>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <div class="report-item">
                  <div class="item-info">
                    <n-tag type="success">^ {{ scope.row.value }}</n-tag>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </n-card>
      </div>
    </div>

  </div>

</template>
<script setup lang="ts">
import './index.scss';
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts';
import { ref, } from 'vue';

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  VisualMapComponent,
  MarkLineComponent
])

const lineOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
      areaStyle: {}
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
});

const barOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: {  //  <-- 隐藏 X 轴轴线
      show: false
    },
    axisTick: {  //  <-- 隐藏 X 轴刻度线
      show: false
    },
    axisLabel: {  //  <-- 隐藏 X 轴刻度标签
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {  //  <-- 隐藏 X 轴轴线
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {  //  <-- 隐藏 Y 轴分割线
      show: false
    }
  },
  series: [
    {
      data: [120, 250, 150, 110, 120, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },

    }
  ]
});

const smallLineOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {  //  <-- 隐藏 X 轴轴线
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '30%'],
    axisLine: {  //  <-- 隐藏 X 轴轴线
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {  //  <-- 隐藏 Y 轴分割线
      show: false
    }
  },
  visualMap: {
    type: 'piecewise',
    show: false,
    dimension: 0,
    seriesIndex: 0,
    pieces: [
      {
        gt: 1,
        lt: 3,
        color: 'rgba(0, 0, 180, 0.4)'
      },
      {
        gt: 5,
        lt: 7,
        color: 'rgba(0, 0, 180, 0.4)'
      }
    ]
  },
  series: [
    {
      type: 'line',
      smooth: 0.6,
      symbol: 'none',
      lineStyle: {
        color: '#5470C6',
        width: 5
      },
      markLine: {
        symbol: ['none', 'none'],
        label: { show: false },
        data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
      },
      areaStyle: {},
      data: [
        ['2019-10-10', 200],
        ['2019-10-11', 560],
        ['2019-10-12', 750],
        ['2019-10-13', 580],
        ['2019-10-14', 250],
        ['2019-10-15', 300],
        ['2019-10-16', 450],
        ['2019-10-17', 300],
        ['2019-10-18', 100]
      ]
    }
  ]
})

const value = ref(0);

const options = ref([
  {
    label: 'Everybody',
    value: 0
  },
  {
    label: 'Drive My Car',
    value: 1
  },
  {
    label: 'Norwegian Wood',
    value: 2
  },]);

const tableData = ref([
  {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  }, {
    post: '高级后端开发工程师',
    attention: " 8 / 10",
    value: '80',
    num: '2',
    price: '1k-3k'
  },
])

const reportData = ref([
  {
    post: "后端开发",
    value: "16.19%",
    num: 2
  }, {
    post: "后端开发",
    value: "16.19%",
    num: 2
  }, {
    post: "后端开发",
    value: "16.19%",
    num: 2
  }, {
    post: "后端开发",
    value: "16.19%",
    num: 2
  }, {
    post: "后端开发",
    value: "16.19%",
    num: 2
  }, {
    post: "后端开发",
    value: "16.19%",
    num: 2
  }, {
    post: "后端开发",
    value: "16.19%",
    num: 2
  }
])

defineProps()

</script>