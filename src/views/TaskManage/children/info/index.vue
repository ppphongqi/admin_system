<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ti_title">
        <div class="ti_title_wrapper">
          <div>任务情况</div>
          <div class="ti_buttons">
            <el-button type="success" @click="Download">导出报表</el-button>
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
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
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
        prop="missionName"
        label="任务名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionReward"
        label="任务酬金"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="stateName"
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
              <el-dropdown-item @click="audit(scope.row, 1)">
                通过
              </el-dropdown-item>
              <el-dropdown-item @click="audit(scope.row, 0)">
                不通过
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[7, 10, 20]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
        <el-form-item label="任务名称:" prop="missionName">
          <el-input v-model="Form.missionName"></el-input>
        </el-form-item>
        <el-form-item label="任务状态:" prop="stateName">
          <el-input v-model="Form.stateName"></el-input>
        </el-form-item>
        <el-form-item label="任务酬金:" prop="missionReward">
          <el-input v-model="Form.missionReward"></el-input>
        </el-form-item>
        <el-form-item label="任务时间:" prop="timeAdd">
          <el-input v-model="Form.timeAdd"></el-input>
        </el-form-item>
        <el-form-item label="提交人:" prop="stateName">
          <el-input v-model="Form.stateName"></el-input>
        </el-form-item>
        <el-form-item label="提交时间:" prop="stateTime">
          <el-input v-model="Form.stateTime"></el-input>
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
  import { taskApi } from '@/api/index'
  export default {
    name: 'TaskInfo',
    data() {
      return {
        currentPage: 1,
        total: 1,
        PageSize: 7,
        tabPosition: 'top',
        date: '',
        value: '',
        input3: '',
        tableData: [],
        showModal: false,
        Form: {
          missionName: '',
          stateName: '',
          missionReward: '',
          timeAdd: '',
          stateName: '',
          stateTime: '',
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      //获取列表
      async getList(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const data = await taskApi.getTaskAudit(params)
        if (data) {
          console.log(data, 'data')
          this.tableData = data.data
          this.total = data.totalRecord
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //审核
      async audit(row, flag) {
        console.log(row, flag, 'audit')
        if (flag) {
          console.log('通过')
          let form = {}
          const res = await taskApi.audit(form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        } else {
          console.log('不通过')
          let form = {}
          const res = await taskApi.audit(form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        }
      },
      open(row) {
        this.showModal = true
        this.Form = {
          missionName: row.missionName,
          stateName: row.stateName,
          missionReward: row.missionReward,
          timeAdd: row.timeAdd,
          stateName: row.stateName,
          stateTime: row.stateTime,
        }
      },
      Download() {
        console.log('导出报表')
      },
      handleSizeChange(val) {
        this.PageSize = val
        this.getList(1, val)
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(val, this.PageSize)
      },
    },
  }
</script>
