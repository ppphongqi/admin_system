<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">借货单列表</div>
        <div class="ck_buttons"></div>
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
        prop="orderCode"
        label="订单编号"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="userAid"
        label="用户aid"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="checkState"
        label="审核状态"
        align="center"
      ></el-table-column>
      <el-table-column prop="receiptImage" label="收获凭证" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 64px; height: 64px"
            :src="scope.row.receiptImage"
            :preview-src-list="[scope.row.receiptImage]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="borrowImage" label="借货单凭证" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 64px; height: 64px"
            :src="scope.row.borrowImage"
            :preview-src-list="[scope.row.borrowImage]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="timeAdd" label="创建时间" align="center">
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
        :page-sizes="[7, 10, 20]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
      title="审核"
      :visible.sync="auditModal"
      width="30%"
      top="25vh"
      :before-close="closeAuditModal"
    >
      <el-form :model="auditForm" label-width="100px" label-position="right">
        <el-form-item label="订单编号:" prop="code">
          <el-input v-model="auditForm.code" required clearable></el-input>
        </el-form-item>
        <el-form-item label="审核状态:" prop="checkState" required>
          <el-select v-model="auditForm.checkState">
            <el-option label="待审核" value="0">待审核</el-option>
            <el-option label="通过" value="1">通过</el-option>
            <el-option label="不通过" value="2">不通过</el-option>
            <el-option label="订单完成" value="3">订单完成</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditModal = false">取 消</el-button>
        <el-button type="primary" @click="auditOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { orderApi } from '@/api/index'
  import moment from 'moment'
  export default {
    name: 'OrderLend',
    data() {
      return {
        moment,
        auditModal: false,
        auditForm: {
          code: '',
          checkState: '0',
        },
        currentPage: 1,
        total: 1,
        PageSize: 7,
        tableData: [],
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取表格数据
      async getList(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const { data } = await orderApi.getEntityLend(params)
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
      //借记单审核
      audit(item) {
        this.auditModal = true
        this.auditForm.code = item.orderCode
        this.auditForm.checkState = item.checkState
      },
      //确认发货
      async auditOrder() {
        const res = await orderApi.auditEntityLend(this.auditForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getEntityList()
          this.closeAuditModal()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //关闭借记单审核框
      closeAuditModal() {
        this.auditModal = false
        this.auditForm = {
          code: '',
          checkState: '0',
        }
      },
      deleteRow(item) {
        cons.log(item)
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
