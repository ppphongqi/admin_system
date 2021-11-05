<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="operator_order_title">
        <div class="operator_order_title_wrapper">
          <div>运营商任务订单列表</div>
        </div>
        <div class="operator_order_search">
          <el-row>
            <el-col
              :span="2"
              class="operator_order_label"
              style="padding-top: 5px"
            >
              运营商任务名称：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.missionOperatorAid"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in operatorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col
              :span="1.5"
              class="operator_order_label"
              style="padding-top: 5px"
            >
              业务分类：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.missionServiceClassAid"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in operatorClass"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col
              :span="1.5"
              class="operator_order_label"
              style="padding-top: 5px"
            >
              任务状态：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.stateAid"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in operatorState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-button
              type="success"
              icon="el-icon-search"
              style="margin-left: 20px"
              @click="getList"
            >
              搜索
            </el-button>
          </el-row>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="订单编号"
        align="center"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="missionOperatorName"
        label="运营商任务名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionServiceClass"
        label="业务类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="用户名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序值"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="stateName"
        label="审核状态"
        align="center"
      ></el-table-column>
      <el-table-column prop="isDelete" label="是否删除" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isDelete === 0">正常</div>
          <div v-else-if="scope.row.isDelete === 1">已删除</div>
          <div v-else>异常</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeAdd"
        label="创建时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeAdd).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeLastUpdate"
        label="最后更新时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeLastUpdate).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="audit(scope.row)">
            审核
          </el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
      v-if="auditModal"
      title="审核"
      :visible.sync="auditModal"
      width="30%"
      top="25vh"
      :before-close="closeAuditModal"
    >
      <el-form
        ref="auditForm"
        :model="auditForm"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="订单编号:" prop="code">
          <el-input v-model="auditForm.code" clearable></el-input>
        </el-form-item>
        <el-form-item label="审核状态:" prop="stateAid">
          <el-select v-model="auditForm.stateAid">
            <el-option
              v-for="item in operatorState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAuditModal">取 消</el-button>
        <el-button type="primary" @click="auditOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { operatorApi } from '@/api/index'
  import moment from 'moment'
  export default {
    name: 'OperatorOrder',
    data() {
      return {
        moment,
        auditModal: false,
        auditForm: {
          code: '',
          stateAid: '0',
        },
        currentPage: 1,
        total: 1,
        pageSize: 10,
        tableData: [],
        params: {
          page: 1,
          pageRows: 10,
          missionOperatorAid: '',
          missionServiceClassAid: '',
          stateAid: '',
        },
        operatorState: [],
        operatorClass: [],
        operatorList: [],
        rules: {
          code: [
            { required: true, message: '请填写订单编号', trigger: 'blur' },
          ],
          stateAid: [
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ],
        },
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getList()
      this.getOperatorStateList()
      this.getOperatorClass()
      this.getOperatorList()
    },
    methods: {
      // 获取表格数据
      async getList() {
        const { data } = await operatorApi.getOperatorOrder(this.params)
        if (data) {
          this.tableData = data.records
          this.total = data.total
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取状态数据
      async getOperatorStateList() {
        const { data } = await operatorApi.getOperatorOrderState()
        if (data) {
          data.forEach((v) => {
            this.operatorState.push({
              label: v.name,
              value: v.aid,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取业务分类列表
      async getOperatorClass() {
        const { data } = await operatorApi.getOperatorClass({
          state: '0',
        })
        if (data) {
          data.forEach((v) => {
            this.operatorClass.push({
              label: v.name,
              value: v.aid,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取业务列表
      async getOperatorList() {
        const { data } = await operatorApi.getOperatorList({
          page: 1,
          pageRow: 100,
          isAllArgsSelect: 1,
        })
        if (data) {
          data.records.forEach((v) => {
            this.operatorList.push({
              label: v.name,
              value: v.aid,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //审核
      audit(item) {
        this.auditModal = true
        this.auditForm.code = item.code
        this.auditForm.stateAid = item.stateAid
      },
      //确认审核
      auditOrder() {
        this.$refs.auditForm.validate((valid) => {
          if (valid) {
            operatorApi.auditOperator(this.auditForm).then(() => {
              if (res) {
                this.$message({
                  message: res.message,
                  type: 'success',
                })
                this.getList()
                this.closeAuditModal()
              } else {
                this.$message({
                  message: '接口未返回数据',
                  type: 'warning',
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //关闭借记单审核框
      closeAuditModal() {
        this.auditModal = false
        this.auditForm = {
          code: '',
          stateAid: '0',
        }
        this.$refs.auditForm.resetFields()
      },
      deleteRow(item) {
        console.log(item)
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.params.page = 1
        this.params.pageRows = val
        this.getList()
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.params.page = val
        this.params.pageRows = this.pageSize
        this.getList()
      },
    },
  }
</script>
