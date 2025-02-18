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


    <div class="oper-button">
      <n-button type="success">
        修改
      </n-button>
      <n-button type="warning">
        取消
      </n-button>
      <n-button type="error">
        删除
      </n-button>
    </div>

    <el-table :data="tableData" style="width: 100%" height="250">
      <el-table-column fixed prop="date" label="Date" width="150"/>
      <el-table-column prop="name" label="Name" width="120"/>
      <el-table-column prop="state" label="State" width="120"/>
      <el-table-column prop="city" label="City" width="320"/>
      <el-table-column prop="address" label="Address" width="600"/>
      <el-table-column prop="zip" label="Zip"/>
    </el-table>

    <n-pagination :item-count="101">
      <template #prefix="{ itemCount, startIndex }">
        从第 {{ startIndex }} 项开始, 共 {{ itemCount }} 项
      </template>
      <template #suffix="{ endIndex }">
        从第 {{ endIndex }} 项结束
      </template>
    </n-pagination>
  </div>

</template>

<script setup lang="js">

import {FlashOutline} from '@vicons/ionicons5';
import './index.scss';


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]

</script>