<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">域名设置</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showAdd">
            添加域名
          </el-button>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column prop="aid" label="序号" align="center"></el-table-column>
      <el-table-column
        prop="domain_name"
        label="域名"
        align="center"
      ></el-table-column>
      <el-table-column prop="is_open" label="是否开启" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_open"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭"
            :active-value="0"
            :inactive-value="1"
            @change="changeStep(scope.row)"
          ></el-switch>
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
      :title="add ? '添加域名' : '编辑域名'"
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
        <el-form-item label="域名:" prop="domainName">
          <el-input v-model="Form.domainName"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <el-radio-group v-model="Form.state">
            <el-radio :label="0" value="0">开启</el-radio>
            <el-radio :label="1" value="1">关闭</el-radio>
          </el-radio-group>
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
  import { sysApi } from '@/api/index'
  import './index.scss'
  export default {
    name: 'DomainName',
    data() {
      return {
        tableData: [],
        Form: {
          aid: -1,
          domainName: '',
          state: 1,
        },
        showModal: false,
        add: false,
        rules: {
          domainName: [
            { required: true, message: '请填写域名', trigger: 'blur' },
          ],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取域名列表
      async getList(page = 1, pageRow = 10) {
        const params = {
          page,
          pageRow,
        }
        const { data } = await sysApi.getDomainList(params)
        console.log(data)
        this.tableData = data.records
      },
      //添加弹出
      showAdd() {
        this.showModal = true
        this.add = true
      },
      //编辑弹出
      showDialogEdit(row) {
        this.showModal = true
        this.add = false
        this.Form = {
          aid: row.aid,
          domainName: row.domain_name,
          state: row.state,
        }
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
        if (this.Form.state === 1) {
          this.Form.state = '1'
        } else {
          this.Form.state = '0'
        }
        const res = await sysApi.updateDomain(this.Form)
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
          domainName: '',
          state: 1,
        }
        this.$refs.Form.resetFields()
      },
      //删除
      async deleteRow(row) {
        const res = await sysApi.delDomain({ aid: row.aid })
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
      //状态切换
      async changeStep(row) {
        const res = await sysApi.changeDomainState({ aid: row.aid })
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
