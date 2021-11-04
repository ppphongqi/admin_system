<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">短信模板</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showAdd">
            添加模板
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
      <el-table-column
        prop="name"
        label="模板名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="templateCode"
        label="模板ID"
        align="center"
      ></el-table-column>
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
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showDialogEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/编辑-->
    <el-dialog
      v-if="showModal"
      :title="add ? '添加模板' : '编辑模板'"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
      :before-close="closeShowModal"
    >
      <el-form
        ref="Form"
        :model="Form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="账号:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="模板ID:" prop="templateCode">
          <el-input v-model="Form.templateCode"></el-input>
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
  import { sysApi } from '@/api/index'
  import moment from 'moment'
  import './index.scss'
  export default {
    name: 'SmsModal',
    data() {
      return {
        tableData: [],
        Form: {
          aid: -1,
          name: '',
          templateCode: '',
          timeAdd: '',
          timeLastUpdate: '',
        },
        moment,
        showModal: false,
        add: false,
        rules: {
          name: [{ required: true, message: '请填写账户', trigger: 'blur' }],
          templateCode: [
            { required: true, message: '请填写模板ID', trigger: 'blur' },
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
    },
    methods: {
      // 获取短信列表
      async getList() {
        const { data } = await sysApi.getSmsList()
        if (data) {
          this.tableData = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //添加弹出
      showAdd() {
        this.showModal = true
        this.add = true
      },
      //编辑弹出
      showDialogEdit(item) {
        this.showModal = true
        this.add = false
        this.Form = item
      },
      //添加编辑
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
        const res = await sysApi.updateSms(this.Form)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.closeShowModal()
          this.getList()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //关闭弹出
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: -1,
          name: '',
          templateCode: '',
          timeAdd: '',
          timeLastUpdate: '',
        }
        this.$refs.Form.resetFields()
      },
      //删除
      async deleteRow(row) {
        const res = await sysApi.delSms({ aid: row.aid })
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getList()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
