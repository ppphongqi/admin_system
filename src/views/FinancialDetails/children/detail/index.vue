<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ti_title">
        <div class="ti_title_wrapper">
          <div>充值明细</div>
          <div class="ti_buttons">
            <el-button type="success" @click="showDialog">导出报表</el-button>
          </div>
        </div>

        <div class="taskTime">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              支付方式:
            </el-col>
            <el-col :span="7">
              <el-radio-group v-model="tabPosition">
                <el-radio-button label="top">全部</el-radio-button>
                <el-radio-button label="right">今天</el-radio-button>
                <el-radio-button label="bottom">昨天</el-radio-button>
                <el-radio-button label="left">最近七天</el-radio-button>
                <el-radio-button label="1">本月</el-radio-button>
                <el-radio-button label="2">本年</el-radio-button>
                <el-radio-button label="3">最近三年</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="12">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <el-button icon="el-icon-search" type="primary"></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="taskStatus">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              任务状态：
            </el-col>
            <el-col :span="3">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="taskSearch">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              搜索：
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="input3"
                placeholder="请输入内容"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  type="primary"
                ></el-button>
              </el-input>
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
  </div>
</template>

<script>
  import './index.scss'
  export default {
    name: 'Detail',
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tabPosition: 'top',
        date: '',
        value: '',
        input3: '',
        tableData: {},
        showModal: false,
        Form: {},
        list: [
          {
            title: '订单总收入金额',
            color: 'rgb(254,224,141)',
          },
          {
            title: '实物商品收入金额',
            color: 'rgb(18,210,105)',
          },
        ],
      }
    },
    methods: {
      showDialog() {},
    },
  }
</script>

<style lang="scss" scoped></style>
