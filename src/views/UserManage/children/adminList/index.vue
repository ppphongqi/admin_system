<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">管理员列表</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加管理员
          </el-button>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column prop="aid" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="userName"
        label="账号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickName"
        label="用户昵称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="loginDate"
        label="最后登录时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeAdd"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeLastUpdate"
        label="最后更新时间"
        align="center"
      ></el-table-column>
      <el-table-column prop="isUsed" label="用户状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isUsed"
            active-value="0"
            inactive-value="1"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="启用"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editAdmin(scope.row)">
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
        :page-sizes="[7, 10, 20]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      v-if="showModal"
      :title="add ? '添加管理员' : '编辑管理员'"
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
        <el-form-item label="管理员账号:" prop="userName">
          <el-input v-model="Form.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="Form.phone"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码:" prop="loginKey">
          <el-input v-model="Form.loginKey"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="reloginKey">
          <el-input v-model="Form.reloginKey"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名:" prop="nickName">
          <el-input v-model="Form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="isUsed">
          <el-radio-group v-model="Form.isUsed">
            <el-radio label="0" value="0">开启</el-radio>
            <el-radio label="1" value="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="管理员权限:" prop="roleAid">
          <el-select v-model="Form.roleAid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal">取 消</el-button>
        <el-button type="primary" @click="modalConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { roleApi, userApi } from '@/api/index'

  export default {
    name: 'AdminList',
    data() {
      return {
        currentPage: 1,
        total: 1,
        PageSize: 7,
        tableData: [],
        roleList: [],
        showModal: false,
        add: false,
        Form: {
          aid: -1,
          userName: '',
          loginKey: '',
          reloginKey: '',
          phone: '',
          nickName: '',
          roleAid: '',
          isUsed: '0',
        },
        rules: {
          userName: [
            { required: true, message: '请填写管理员账号', trigger: 'blur' },
          ],
          phone: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
          loginKey: [
            { required: true, message: '请填写管理员密码', trigger: 'blur' },
          ],
          reloginKey: [
            {
              required: true,
              message: '请再次填写管理员密码',
              trigger: 'blur',
            },
          ],
          nickName: [
            { required: true, message: '请填写管理员姓名', trigger: 'blur' },
          ],
          isUsed: [
            { required: true, message: '请选择账户状态', trigger: 'change' },
          ],
        },
      }
    },
    mounted() {
      this.getTableData()
      this.getRole()
    },
    methods: {
      //获取权限
      async getRole(page = 1, pageRows = 100) {
        const params = {
          page,
          pageRows,
        }
        const { data } = await userApi.getRoleList(params)
        data.forEach((item) => {
          this.roleList.push({
            value: item.aid,
            label: item.name,
          })
        })
      },
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
      //添加/修改管理员
      async submit() {
        if (this.Form.loginKey != this.Form.reloginKey) {
          this.$message({
            message: '密码输入不一致',
            type: 'warning',
          })
          return
        }
        console.log(this.Form)
        const res = await roleApi.updateAdmin(this.Form)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
          })
          this.getTableData()
          this.closeShowModal()
        }
      },
      // 获取表格数据
      async getTableData(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const data = await roleApi.getAdminList(params)
        if (data) {
          this.tableData = data.data
          this.total = data.totalRecord
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //修改用户状态
      async changeState(row) {
        console.log(row)
        const params = {
          aid: row.aid,
        }
        if (row.isUsed === '1') {
          params.state = '1'
        } else {
          params.state = '0'
        }
        console.log(params, 'params')
        const res = await userApi.editUserState(params)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getTableData()
        }
      },
      handleSizeChange(val) {
        this.PageSize = val
        this.getTableData(1, val)
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTableData(val, this.PageSize)
      },
      deleteRow(item) {
        roleApi.delAdmin({ aid: item.aid }).then((res) => {
          if (res) {
            this.$message({
              message: res.message,
              type: 'success',
            })
            this.getTableData()
          } else {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        })
      },
      // 添加
      showDialog() {
        this.add = true
        this.showModal = true
      },
      // 编辑
      editAdmin(row) {
        this.add = false
        this.showModal = true
        this.Form = row
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: -1,
          userName: '',
          phone: '',
          nickName: '',
          loginKey: '',
          roleAid: '',
          isUsed: '0',
        }
        this.$refs.Form.resetFields()
      },
    },
  }
</script>
