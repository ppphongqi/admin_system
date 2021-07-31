<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <el-form
          :inline="true"
          label-width="100px"
          label-position="right"
        ></el-form>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showAdd">
            添加短信参数
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
        prop="ap_id"
        label="账号"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="secret_key"
        label="密码"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="ec_name"
        label="公司名称"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="sign"
        label="签名编号"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="template_id"
        label="模板id"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="template_url"
        label="模板url"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="agreement"
        label="协议类型"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column prop="is_open" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_open"
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
      <el-table-column
        prop="add_serial"
        label="拓展码"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="time_add"
        label="创建时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>{{ moment(scope.row.time_add).format('YYYY-MM-DD') }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time_last_update"
        label="最后更新时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.time_last_update).format('YYYY-MM-DD') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="150">
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
      :title="add ? '添加短信参数' : '编辑短信参数'"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="账号:" prop="apId" required>
          <el-input v-model="Form.apId"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="secretKey" required>
          <el-input v-model="Form.secretKey"></el-input>
        </el-form-item>
        <el-form-item label="模板ID:" prop="templateId" required>
          <el-input v-model="Form.templateId"></el-input>
        </el-form-item>
        <el-form-item label="模板链接:" prop="templateUrl" required>
          <el-input v-model="Form.templateUrl"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" prop="ecName" required>
          <el-input v-model="Form.ecName"></el-input>
        </el-form-item>
        <el-form-item label="协议类型:" prop="agreement" required>
          <el-input v-model="Form.agreement"></el-input>
        </el-form-item>
        <el-form-item label="签名编号:" prop="sign" required>
          <el-input v-model="Form.sign"></el-input>
        </el-form-item>
        <el-form-item label="拓展码:" prop="addSerial" required>
          <el-input v-model="Form.addSerial"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="isOpen" required>
          <el-radio-group v-model="Form.isOpen">
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
  import moment from 'moment'
  import './index.scss'
  export default {
    name: 'SmsModal',
    data() {
      return {
        tableData: [],
        Form: {
          aid: -1,
          apId: '',
          secretKey: '',
          templateId: '',
          templateUrl: '',
          ecName: '',
          agreement: '',
          sign: '',
          addSerial: '',
          isOpen: 1,
        },
        moment,
        showModal: false,
        add: false,
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD')
      },
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取短信列表
      async getList(page = 1, pageRow = 10) {
        const params = {
          page,
          pageRow,
        }
        const { data } = await sysApi.getSmsList(params)
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
          apId: row.ap_id,
          secretKey: row.secret_key,
          templateId: row.template_id,
          templateUrl: row.template_url,
          ecName: row.ec_name,
          agreement: row.agreement,
          sign: row.sign,
          addSerial: row.add_serial,
          isOpen: row.is_open,
        }
      },
      //添加编辑
      async modalConfirm(flag) {
        console.log(this.Form)
        // if (flag) {
        //   form.aid = -1
        // }
        this.Form.isOpen = '1'
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
          apId: '',
          secretKey: '',
          templateId: '',
          templateUrl: '',
          ecName: '',
          agreement: '',
          sign: '',
          addSerial: '',
          isOpen: 1,
        }
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
      //启用短信
      changeStep(row) {
        if (row.is_open == '1') {
          sysApi
            .setSmsOn({
              aid: row.aid,
            })
            .then((res) => {
              if (res) {
                this.$message({
                  message: res.message,
                  type: 'success',
                })
                this.getList()
              } else {
                this.$message({
                  message: '启用失败',
                  type: 'warning',
                })
              }
            })
        } else {
          this.$message({
            message: '不支持停用，请重新设置',
            type: 'warning',
          })
          this.getList()
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
