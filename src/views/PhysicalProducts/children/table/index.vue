<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <el-form :inline="true" label-width="100px" label-position="right">
          <el-form-item label="产品名称:" style="margin-bottom: 0px">
            <el-select
              v-model="value1"
              style="width: 240px"
              placeholder="请选择"
              align-items="center"
            >
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经销商:" style="margin-bottom: 0px">
            <el-select
              v-model="value2"
              style="width: 240px"
              placeholder="请选择"
            >
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间:" style="margin-bottom: 0px">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-search" @click="search">
            查询
          </el-button>
          <el-button type="success" @click="download">导出报表</el-button>
        </div>
      </div>
    </div>
    <div class="box_clock">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="box_clock_items"
        :style="{ color: item.color }"
      >
        <div class="box_clock_items_title">
          {{ item.title }}
        </div>
        <div class="box_clock_items_continer">
          {{ item.continer }}
        </div>
      </div>
    </div>
    <div class="box_clock2">
      <div
        v-for="(item, index) in list2"
        :key="index"
        class="box_clock2_items"
        :style="{ color: item.color }"
      >
        <div class="box_clock2_items_title">
          {{ item.title }}
        </div>
        <div class="box_clock2_items_continer">
          {{ item.continer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './index.scss'
  export default {
    name: 'DataTable',
    data() {
      return {
        date: '',
        value1: '',
        value2: '',
        list: [
          {
            title: '丨销售金额',
            continer: '29483.11',
            color: 'rgb(254,224,141)',
          },
          {
            title: '丨销售数量',
            continer: '199',
            color: 'rgb(149,138,246)',
          },
        ],
        list2: [
          {
            title: '丨金额组成',
            continer: '',
            color: 'rgb(254,162,141)',
          },
          {
            title: '丨数量来源',
            continer: '',
            color: 'rgb(149,138,176)',
          },
        ],
      }
    },
    methods: {
      download() {
        console.log('导出报表')
      },
      search() {
        console.log('检索')
      },
    },
  }
</script>

<style lang="scss" scoped></style>
