<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">权限分类</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加分类
          </el-button>
        </div>
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="timeAdd" label="添加时间" align="center">
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeAdd).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="timeLastUpdate" label="更新时间" align="center">
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeAdd).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="compail(scope.row)">
            编辑
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
      :title="add ? '添加分类' : '修改分类'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="120px" label-position="right">
        <el-form-item label="权限名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { powerApi } from '@/api/index'
  import moment from 'moment'
  export default {
    name: 'PowerManagementClass',
    data() {
      return {
        moment,
        currentPage: 1,
        total: 1,
        pageSize: 10,
        tableData: [],
        showModal: false,
        add: false,
        Form: {
          aid: -1,
          name: '',
        },
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      async modalConfirm() {
        console.log(this.Form)
        const res = await powerApi.addPerType(this.Form)
        this.getTableData()
        this.closeShowModal()
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取表格数据
      async getTableData() {
        const { data } = await powerApi.getPerClass()
        console.log(data)
        if (data) {
          this.tableData = data
          this.total = data.length
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      async deleteRow(item) {
        console.log(item.aid)
        const data = await powerApi.deletePerType({ ids: item.aid })
        if (data) {
          this.getTableData()
          this.$message({
            message: data.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 添加
      showDialog() {
        this.add = true
        this.showModal = true
      },
      // 编辑
      compail(row) {
        this.add = false
        this.showModal = true
        this.Form = row
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: -1,
          name: '',
        }
      },
    },
  }
</script>
