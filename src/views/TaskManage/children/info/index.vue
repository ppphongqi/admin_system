<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ti_title">
        <div class="ti_title_wrapper">
          <div>任务情况</div>
          <div class="ti_buttons">
            <el-button type="success" @cliti="showDialog">导出报表</el-button>
          </div>
        </div>

        <div class="taskTime">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              任务时间：
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

    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="任务名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="pay"
        label="任务酬金"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="任务状态"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="open(scope.row)"
          >
            详情
          </el-button>
          <el-dropdown style="margin-left: 10px">
            <el-button type="text">
              审核
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>通过</el-dropdown-item>
              <el-dropdown-item>不通过</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      title="任务详情"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="任务名称:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>

        <el-form-item label="任务状态:" prop="number">
          <el-input v-model="Form.number"></el-input>
        </el-form-item>
        <el-form-item label="任务酬金:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="人物事件:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="提交人:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="提交时间:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">取 消</el-button>
        <el-button type="primary" @click="showModal = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import moment from 'moment'
  let tableData = []
  let time = moment().format('YYYY-MM-DD')
  for (let i = 0; i < 5; i++) {
    tableData.push({
      date: time,
      name: '任务' + i,
      pay: i * 100,
      status: i < 3 ? '完成' : '未完成',
    })
  }
  export default {
    name: 'TaskInfo',
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
        tableData: tableData,
        showModal: false,
        Form: {},
      }
    },
    methods: {
      open() {
        this.showModal = true
      },
    },
  }
</script>
