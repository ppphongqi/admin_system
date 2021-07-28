<template>
  <div class="page_wrapper">
    <el-card class="box-card">
      <div slot="header" class="head-box">
        <span class="title">商品概况</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="success" icon="el-icon-search" @click="search">
          查询
        </el-button>
        <el-button type="success" @click="download">导出报表</el-button>
      </div>
      <div class="general">
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>商品浏览量</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>商品访客数</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>加购件数</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>下单件数</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>支付件数</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
      </div>
      <div class="general">
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>支付金额</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>成本金额</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>退款金额</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>退款件数</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
        <div class="general-item">
          <img alt="" />
          <div class="info">
            <span>访客-支付转化率</span>
            <span class="num">0</span>
            <span>
              环比增长：
              <i style="color: red">0.00%</i>
              <i
                style="color: red; margin-left: 3px"
                class="el-icon-caret-top"
              ></i>
            </span>
          </div>
        </div>
      </div>
      <div class="chart-box">
        <div
          id="gdChart"
          style="height: 480px; width: 100%; margin: 30px 0 0"
        />
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="head-box">
        <span class="title">商品排行</span>
        <el-select
          v-model="filterType"
          placeholder="请选择"
          style="width: 220px; margin-right: 12px"
        >
          <el-option
            v-for="item in filterTypeList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="success" icon="el-icon-search" @click="search">
          查询
        </el-button>
      </div>
      <div class="table-box">
        <el-table :data="gdRankData" border style="width: 100%">
          <el-table-column
            prop="img"
            label="商品图片"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-img :src="scope.row.imgUrl"></el-img>
            </template>
          </el-table-column>
          <el-table-column
            prop="gdname"
            label="商品名称"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="cost_price"
            label="浏览量"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gdname"
            label="访客数"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="cost_price"
            label="加购件数"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gdname"
            label="下单件数"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="cost_price"
            label="支付件数"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gdname"
            label="支付金额"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="stock"
            label="毛利率(%)"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.stock" type="number"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="cost_price"
            label="收藏数"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="older_price"
            label="访客-支付转化率(%)	"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.older_price"
                type="number"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteRow(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import './index.scss'
  export default {
    name: 'DataTable',
    data() {
      return {
        filterType: '',
        filterTypeList: [
          { name: '浏览量' },
          { name: '访客数' },
          { name: '加购件数' },
          { name: '下单件数' },
          { name: '支付金额' },
          { name: '毛利率' },
          { name: '收藏数' },
          { name: '访客-支付转化率' },
        ],
        date: [],
        gdRankData: [],
        chart: null,
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      deleteRow(item) {
        console.log(item)
      },
      search() {
        console.log(this.date)
        this.initChart()
      },
      download() {
        console.log('导出报表')
      },
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      format(timestamp) {
        var time = new Date(timestamp)
        var y = time.getFullYear()
        var m = time.getMonth() + 1
        var d = time.getDate()
        return y + '-' + this.add0(m) + '-' + this.add0(d)
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('gdChart'))
        if (this.date.length === 0) return false
        let s = this.date[0].getTime()
        let e = this.date[1].getTime()
        let days = (e - s) / (1 * 24 * 60 * 60 * 1000)
        let datax = []
        for (let i = 0; i <= days; i++) {
          let day = i * 24 * 60 * 60 * 1000
          datax.push(s + day)
        }
        let x = []
        datax.forEach((v) => {
          x.push(this.format(v))
        })
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999',
              },
            },
          },
          color: ['#CAA6F1', '#FFC46B', '#1890FF', '#00C050'],
          toolbox: {
            feature: {
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ['商品浏览量', '商品访客', '支付金额', '退款金额'],
          },
          xAxis: [
            {
              type: 'category',
              data: x,
              axisPointer: {
                type: 'shadow',
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              axisLabel: {
                formatter: '{value}',
              },
              splitLine: {
                lineStyle: {
                  color: '#f0f0f0',
                },
              },
            },
            {
              type: 'value',
              name: '数量',
              axisLabel: {
                formatter: '{value}',
              },
              axisLine: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: '商品浏览量',
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              data: [
                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
                3.3,
              ],
            },
            {
              name: '商品访客',
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              data: [
                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
                2.3,
              ],
            },
            {
              name: '支付金额',
              type: 'bar',
              barMaxWidth: 20,
              barGap: '30%',
              data: [
                2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0,
                6.2,
              ],
            },
            {
              name: '退款金额',
              type: 'bar',
              barMaxWidth: 20,
              barGap: '30%',
              data: [
                2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0,
                6.2,
              ],
            },
          ],
        }
        this.chart.setOption(option)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .head-box {
    text-align: right;
    line-height: 32px;
    .title {
      float: left;
    }
    .el-button {
      margin-left: 12px;
    }
  }
  .general {
    padding: 10px;
    margin-bottom: 15px;
    .general-item {
      display: inline-flex;
      width: 20%;
      padding: 0 10px;
      box-sizing: border-box;
      img {
        width: 42px;
        height: 42px;
      }
      .info {
        flex: 1;
        margin-left: 8px;
        span {
          display: block;
        }
        .num {
          font-size: 28px;
          line-height: 1.4;
          color: #000;
        }
      }
    }
  }
  .el-table .cell {
    line-height: 24px !important;
  }
</style>
