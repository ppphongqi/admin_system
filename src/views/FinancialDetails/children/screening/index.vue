<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="fs_title">
        <div class="fs_title_wrapper">
          <div>财务数据</div>
          <div class="fs_buttons" style="margin-right: 10px">
            <el-button type="success" @click="showModal = true">
              导出报表
            </el-button>
          </div>
        </div>
        <!-- 时间选择 -->
        <div class="taskTime">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              时间选择：
            </el-col>
            <el-col :span="2">
              <el-date-picker
                v-model="date1"
                type="date"
                placeholder="开始时间"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col :span="2">
              <el-date-picker
                v-model="date2"
                type="date"
                placeholder="结束时间"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col :span="1">
              <el-button icon="el-icon-search" type="primary"></el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 金额信息块 -->
    <div class="money_clock">
      <div v-for="(item, index) in list" :key="index" class="money_clock_items">
        <div class="money_clock_items_left">
          <div class="img_test" :style="{ background: item.color }"></div>
        </div>
        <div class="money_clock_items_right">
          <div class="money_clock_items_right_top">6333</div>
          <div class="money_clock_items_right_down">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div id="money_charts" class="money_echarts"></div>
  </div>
</template>

<script>
  import './index.scss'
  import * as echarts from 'echarts'
  export default {
    name: 'Screening',
    data() {
      return {
        date1: '',
        date2: '',
        list: [
          {
            title: '订单总收入金额',
            color: 'rgb(254,224,141)',
          },
          {
            title: '实物商品收入金额',
            color: 'rgb(18,210,105)',
          },
          {
            title: '虚拟商品收入金额',
            color: 'rgb(255,144,148)',
          },
          {
            title: '充值金额',
            color: 'rgb(149,138,246)',
          },
          {
            title: '总支出金额',
            color: 'rgb(147,139,248)',
          },
          {
            title: '退款支出金额',
            color: 'rgb(248,165,74)',
          },
          {
            title: '佣金支出金额',
            color: 'rgb(254,224,141)',
          },
          {
            title: '商品退款金额',
            color: 'rgb(138,196,244)',
          },
        ],
        Echart: null,
      }
    },
    mounted() {
      this.echartsInit()
    },
    methods: {
      echartsInit() {
        this.Echart = echarts.init(document.getElementById('money_charts'))
        const options = {
          backgroundColor: '#fff',
          title: {
            text: '订单量（个）',
            left: '18px',
            top: '0',
            textStyle: {
              color: '#999',
              fontSize: 12,
              fontWeight: '400',
            },
          },
          color: ['#73A0FA', '#73DEB3', '#FFB761'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999',
              },
              lineStyle: {
                type: 'dashed',
              },
            },
          },
          grid: {
            left: '25',
            right: '25',
            bottom: '24',
            top: '75',
            containLabel: true,
          },
          legend: {
            data: [
              '总收入',
              '总支出',
              '实物商品收入',
              '虚拟商品收入',
              '佣金支出',
            ],
            orient: 'horizontal',
            icon: 'rect',
            show: true,
            top: 25,
          },
          xAxis: {
            type: 'category',
            data: [
              '01-01',
              '01-02',
              '01-03',
              '01-04',
              '01-05',
              '01-06',
              '01-07',
            ],
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: 'value',
            // max: max_value>=100? max_value + 100: max_value+10,
            // max: max_value > 100 ? max_value * 2 : max_value + 10,
            // interval: 10,
            // nameLocation: "center",
            axisLabel: {
              color: '#999',
              textStyle: {
                fontSize: 12,
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#F3F4F4',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
          series: [
            {
              name: '订单总笔数',
              type: 'line',
              smooth: true,
              data: [13, 1, 4, 44, 45, 322, 76],
            },
            {
              name: '钱包笔数',
              type: 'line',
              smooth: true,
              data: [13, 54, 34, 344, 35, 53],
            },
            {
              name: '借呗笔数',
              type: 'line',
              smooth: true,
              data: [13, 2, 2, 32, 123, 23, 136],
            },
          ],
        }
        this.Echart.setOption(options)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
