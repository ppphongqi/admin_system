<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">任务分类</div>
        <div class="class_buttons">
          <el-upload
            ref="excelUpload"
            action="http://localhost/api/pc/mission/excelImport"
            accept=".xlsx"
            :limit="1"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :http-request="handleUpload"
            style="margin-right: 10px"
          >
            <el-button type="primary">导入模板</el-button>
          </el-upload>
          <el-button type="primary" @click="downloadFile">导出模板</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addTask">
            添加分类
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
        label="分类名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeAdd"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeLastUpdate"
        label="更新时间"
        align="center"
      ></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTask(scope.row)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-if="showModal"
      :title="add ? '添加任务分类' : '编辑任务分类'"
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
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="number" align="center">
          <el-input v-model="Form.number" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-radio-group v-model="Form.status">
            <el-radio :label="0" value="0">显示</el-radio>
            <el-radio :label="1" value="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal()">取 消</el-button>
        <el-button type="primary" @click="submit(add)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { taskApi } from '@/api/index'
  import axios from 'axios'
  export default {
    name: 'TaskKinds',
    data() {
      return {
        currentPage: 0,
        total: 0,
        tableData: [],
        typeOption: [],
        showModal: false,
        add: false,
        Form: {
          aid: '',
          name: '',
          number: '',
          status: 0,
        },
        rules: {
          name: [
            { required: true, message: '请填写分类名称', trigger: 'blur' },
          ],
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取任务分类列表
      async getList(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const { data } = await taskApi.getTaskClassList(params)
        console.log(data, 'data')
        if (data) {
          this.tableData = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //修改任务状态
      async changeState(row) {
        console.log(row)
        const params = {
          aid: row.aid,
        }
        if (row.state) {
          params.state = '1'
        } else {
          params.state = '0'
        }
        console.log(params, 'params')
        const res = await taskApi.changeTaskClassStatus(params)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          console.log(res, 'res')
          this.getList()
        }
      },
      submit(flag) {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.modalConfirm(flag)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 添加/编辑任务分类
      async modalConfirm(flag) {
        console.log(flag, 'flag')
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            aid: -1,
            name: this.Form.name,
            sort: this.Form.number,
          }
          if (this.Form.status === 0) {
            form.state = '0'
          } else {
            form.state = '1'
          }
          console.log(form, 'addform')
          const res = await taskApi.addTaskClass(form)
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
            this.closeShowModal()
            this.getList()
          }
        } else {
          let form = {
            aid: this.Form.aid,
            name: this.Form.name,
            sort: this.Form.number,
          }
          if (this.Form.status === 0) {
            form.state = '0'
          } else {
            form.state = '1'
          }
          console.log(form, 'editform')
          const res = await taskApi.addTaskClass(form)
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
            this.closeShowModal()
            this.getList()
          }
        }
      },
      //删除任务分类
      async deleteRow(row) {
        const params = {
          aid: row.aid,
        }
        const res = await taskApi.delTaskClass(params)
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
          this.getList()
        }
      },
      addTask() {
        this.add = true
        this.showModal = true
      },
      editTask(row) {
        this.add = false
        this.showModal = true
        this.Form = {
          aid: row.aid,
          name: row.name,
          number: row.sort,
          status: row.state,
        }
        console.log(this.Form, 'form')
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: '',
          name: '',
          number: '',
          status: 0,
        }
        this.$refs.Form.resetFields()
      },
      //导入
      handleUpload(param) {
        let formData = new FormData()
        formData.append('serviceFile', param.file)
        axios({
          method: 'post',
          url: 'http://localhost/api/pc/mission/excelImport',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: formData,
        }).then((res) => {
          this.handleSuccess(res.data.message)
        })
      },
      handleSuccess(msg) {
        this.$refs.excelUpload.clearFiles()
        this.$message({
          message: msg,
          type: 'success',
        })
        this.getList()
      },
      beforeUpload(file) {
        let isLt2M = true
        isLt2M = file.size / 1024 / 1024 < 100
        if (!isLt2M) {
          this.loading = false
          this.$message.error('上传文件大小不能超过 100MB!')
        }
        this.filename = file.name
        return isLt2M
      },
      //下载
      downloadFile() {
        const url =
          'http://wanmouyun.oss-cn-shenzhen.aliyuncs.com/模板/2021-08-12/4de4d2e2-936a-4172-bbf2-66665ba812b4.xlsx'
        axios({
          method: 'get',
          url: url,
          responseType: 'blob',
        })
          .then((response) => {
            if (response.message) {
              this.$message.error(response.message)
              return
            }
            let blob = new Blob([response.data])
            let link = document.createElement('a')
            let url = window.URL.createObjectURL(blob)
            link.href = url
            link.download = '测试下载.xlsx'
            link.click()
            URL.revokeObjectURL(url) //释放内存
          })
          .catch((e) => {})
      },
    },
  }
</script>
