<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">权限管理</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加权限
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
      <el-table-column
        prop="permissionClassifyAid"
        label="权限分类"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="anotherName"
        label="别名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeAdd"
        label="添加时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeLastUpdate"
        label="更新时间"
        align="center"
      ></el-table-column>
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
      v-if="showModal"
      :title="add ? '添加权限' : '修改权限'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form
        ref="Form"
        :model="Form"
        :rules="rules"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="权限名称:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限分类:" prop="permissionClassifyAid">
          <el-select v-model="Form.permissionClassifyAid" placeholder="请选择">
            <el-option
              v-for="item in preList"
              :key="item.aid"
              :label="item.name"
              :value="item.aid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限别名:" prop="anotherName">
          <el-input v-model="Form.anotherName"></el-input>
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

  export default {
    name: 'PowerManagement',
    data() {
      return {
        currentPage: 1,
        total: 1,
        pageSize: 10,
        tableData: [],
        preList: [],
        showModal: false,
        add: false,
        Form: {
          aid: -1,
          name: '',
          permissionClassifyAid: '',
          anotherName: '',
        },
        rules: {
          name: [
            { required: true, message: '请填写权限名称', trigger: 'blur' },
          ],
          permissionClassifyAid: [
            { required: true, message: '请选择权限分类', trigger: 'change' },
          ],
          anotherName: [
            { required: true, message: '请填写权限别名', trigger: 'blur' },
          ],
        },
      }
    },
    mounted() {
      this.getTableData()
      this.getPermissionClass()
    },
    methods: {
      modalConfirm() {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.submit()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      async submit() {
        console.log(this.Form)
        const res = await powerApi.addPermission(this.Form)
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
        const { data } = await powerApi.getPermissionList()
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
      //获取权限分类
      async getPermissionClass() {
        const { data } = await powerApi.getPerClass()
        if (data) {
          data.forEach((item) => {
            this.preList.push({
              aid: item.aid,
              name: item.name,
            })
          })
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
        const data = await powerApi.deletePer({ ids: item.aid })
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
        this.Form = {
          aid: -1,
          name: '',
          anotherName: '',
          permissionClassifyAid: '',
        }
        this.showModal = false
        this.$refs.Form.resetFields()
      },
    },
  }
</script>
