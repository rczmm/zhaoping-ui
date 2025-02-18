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
      <n-button type="info">
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

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="Date"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="state" label="State"/>
      <el-table-column prop="city" label="City"/>
      <el-table-column prop="address" label="Address" show-overflow-tooltip/>
      <el-table-column prop="zip" label="Zip"/>
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