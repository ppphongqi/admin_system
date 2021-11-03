<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">轮播图列表</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="addRotation">
            添加轮播图
          </el-button>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        label="ID"
        prop="aid"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column prop="url" label="轮播图" align="center">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.url"
            :preview-src-list="[scope.row.url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="link"
        label="跳转链接"
        align="center"
      ></el-table-column>
      <el-table-column prop="classifyAid" label="分类名称" align="center">
        <template slot-scope="scope">
          <span>{{ getClassName(scope.row.classifyAid) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state == '0'">启用</div>
          <div v-else>禁用</div>
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
          <el-button type="text" size="small" @click="editRotation(scope.row)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRotation(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="add ? '添加轮播图' : '编辑轮播图'"
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
        <el-form-item label="轮播图设置:" prop="url">
          <el-upload
            ref="rotationUpload"
            class="rotation-uploader"
            :action="action"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessRotation"
            :before-upload="beforeAvatarUpload"
            :data="{ module: 'img' }"
          >
            <img v-if="Form.url" :src="Form.url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <el-radio-group v-model="Form.state">
            <el-radio label="0" value="0">启用</el-radio>
            <el-radio label="1" value="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类:" prop="classifyAid">
          <el-select v-model="Form.classifyAid" placeholder="请选择">
            <el-option
              v-for="item in rotationClass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接:" prop="link">
          <el-input v-model="Form.link"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal()">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { rotationApi } from '@/api/index'
  import moment from 'moment'
  export default {
    name: 'RotationList',
    data() {
      return {
        moment,
        tableData: [],
        rotationClass: [],
        showModal: false,
        add: false,
        action: 'http://localhost/api/pc/oss/upload',
        Form: {
          aid: -1,
          name: '',
          url: '',
          link: '',
          state: '0',
          classifyAid: '',
          timeAdd: '',
          timeLastUpdate: '',
        },
        rules: {
          url: [{ required: true, message: '请设置轮播图', trigger: 'change' }],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
          classifyAid: [
            { required: true, message: '请选择轮播分类', trigger: 'change' },
          ],
          link: [
            { required: true, message: '请填写跳转地址', trigger: 'blur' },
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
      this.getClass()
    },
    methods: {
      // 获取轮播图列表
      async getList() {
        const { data } = await rotationApi.getRotation()
        if (data) {
          this.tableData = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //获取轮播图分类
      async getClass() {
        const { data } = await rotationApi.getRotationClass()
        data.forEach((item) => {
          this.rotationClass.push({
            value: item.aid,
            label: item.name,
          })
        })
      },
      //获取分类名称
      getClassName(item) {
        let name = []
        if (this.rotationClass.length > 0) {
          this.rotationClass.forEach((v) => {
            if (item === v.value) name.push(v.label)
          })
        }
        return name.toString()
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
      // 添加/编辑轮播图
      async submit() {
        this.Form.state = String(this.Form.state)
        const res = await rotationApi.updateRotation(this.Form)
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
      },
      handleAvatarSuccessRotation(response, file, fileList) {
        this.Form.url = response.message
        this.$refs.rotationUpload.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      beforeAvatarUpload(file) {
        let isLt2M = true
        isLt2M = file.size / 1024 / 1024 < 100
        if (!isLt2M) {
          this.loading = false
          this.$message.error('上传文件大小不能超过 100MB!')
        }
        this.filename = file.name
        return isLt2M
      },
      //删除轮播图
      async deleteRotation(row) {
        const res = await rotationApi.delRotation({ aid: [row.aid] })
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
      addRotation() {
        this.add = true
        this.showModal = true
      },
      editRotation(item) {
        this.add = false
        this.showModal = true
        this.Form = item
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: -1,
          name: '',
          url: '',
          link: '',
          state: '0',
          classifyAid: '',
          timeAdd: '',
          timeLastUpdate: '',
        }
        this.$refs.Form.resetFields()
      },
    },
  }
</script>

<style lang="scss">
  .rotation-uploader {
    .el-upload {
      width: 60px;
      height: 60px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 10px;
      color: #8c939d;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .avatar {
      width: 60px;
      height: 60px;
      display: block;
    }
  }
</style>
