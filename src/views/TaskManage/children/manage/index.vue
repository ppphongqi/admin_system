<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">任务管理</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="addTask">
            添加任务
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
        prop="aid"
        width="55"
        label="ID"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="任务名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="missionIcon" label="任务图标" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.missionIcon" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="missionTypeName"
        label="任务分类"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionClassifyName"
        label="任务类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionDescribe"
        label="任务描述"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionReward"
        label="任务佣金"
        align="center"
      ></el-table-column>
      <el-table-column prop="missionState" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.missionState"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="显示"
            @change="changestate(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addCode(scope.row)">
            追加二维(链接)
          </el-button>
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
      ref="dialog"
      :title="add ? '添加任务' : '编辑任务'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form
        ref="Form"
        :model="Form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="任务名称:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="Form.sort"></el-input>
        </el-form-item>
        <el-form-item label="任务图标:" prop="missionIcon">
          <div class="upload_wrapper">
            <el-upload
              ref="uploadIcon"
              class="avatar-uploader"
              :action="action"
              :limit="1"
              :show-file-list="false"
              :on-success="handleAvatarSuccessIcon"
              :before-upload="beforeAvatarUpload"
              :data="{ module: 'img' }"
            >
              <img v-if="iconUrl" :src="iconUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="upload_tips">
              （图片大小为 80 * 80px最佳, 支持png、jpg、jpeg)
            </div>
          </div>
        </el-form-item>
        <el-form-item label="任务分类:" prop="missionClassifyName">
          <el-select v-model="Form.missionClassifyName" size="medium">
            <el-option
              v-for="(item, index) in kindsOption"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类型:" prop="missionTypeName">
          <el-select
            v-model="Form.missionTypeName"
            :disabled="!add"
            size="medium"
            @change="$forceUpdate()"
          >
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="add && Form.missionTypeName == '1'"
          label="二维码图片:"
          prop="missionCode"
        >
          <div class="upload_wrapper">
            <el-upload
              ref="uploadFileZIP"
              action="#"
              accept=".zip"
              :auto-upload="false"
              :show-file-list="true"
              :file-list="zipList"
              :disabled="zipList.length === 0 ? false : true"
              :on-change="changeUploadZip"
              :before-upload="beforeUploadZip"
              :limit="1"
            >
              <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                type="primary"
              >
                上传文件
              </el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          v-if="add && Form.missionTypeName == '2'"
          label="二维码地址:"
          prop="url"
        >
          <el-input v-model="Form.url"></el-input>
        </el-form-item>
        <el-form-item label="详情:" prop="html">
          <el-button
            v-if="content.length === 0"
            type="primary"
            @click="showDialogAddDetail"
          >
            添加详情
          </el-button>
          <el-button v-else type="primary" @click="showDialogEditDetail">
            修改详情
          </el-button>
        </el-form-item>
        <el-form-item label="任务佣金:" prop="missionReward">
          <el-input v-model="Form.missionReward"></el-input>
        </el-form-item>
        <el-form-item label="可领取次数:" prop="getNumber">
          <el-input v-model="Form.getNumber"></el-input>
        </el-form-item>
        <el-form-item label="任务时间:" prop="date1">
          <el-col :span="11">
            <el-date-picker
              v-model="Form.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              ref="date2"
              v-model="Form.date2"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="任务描述:" prop="missionDescribe">
          <el-input v-model="Form.missionDescribe" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="missionState">
          <el-radio-group v-model="Form.missionState">
            <el-radio :label="0" value="0">显示</el-radio>
            <el-radio :label="1" value="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情查看编辑 -->
    <el-dialog
      title="编辑任务详情"
      :visible.sync="showModalEditDetail"
      style="margin-top: 20px"
      :before-close="closeDialog"
      top
    >
      <vab-quill v-model="content" :min-height="400"></vab-quill>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalEditDetail = false">取 消</el-button>
        <el-button type="primary" @click="editorDetailConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传测试 -->
    <el-dialog
      title="上传"
      :visible.sync="showModalUpload"
      style="margin-top: 20px"
      :before-close="closeModalUpload"
      top
      @opened="open()"
    >
      <el-upload
        ref="uploadFileList"
        action="#"
        :file-list="fileList"
        :auto-upload="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccessThree"
        multiple
      >
        <el-button slot="trigger" size="small" type="primary">
          选取文件
        </el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件,大小不能超过1M
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalUpload = false">关 闭</el-button>
        <el-button
          style="margin-left: 10px"
          size="small"
          type="primary"
          @click="submitUpload"
        >
          上 传
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="追加二维(链接)"
      :visible.sync="addCodeModal"
      width="30%"
      top="20vh"
      :before-close="closeCodeModal"
    >
      <el-form :model="addCodeForm" label-width="100px" label-position="right">
        <el-form-item label="二维码类型:" prop="missionTypeAid">
          <el-select
            v-model="addCodeForm.missionTypeAid"
            disabled
            size="medium"
            @change="$forceUpdate()"
          >
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="addCodeForm.missionTypeAid == '1'"
          label="二维码图片:"
          prop="imgUrl"
        >
          <div class="upload_wrapper">
            <el-upload
              ref="uploadAddCode"
              class="addCode-uploader"
              action="#"
              :limit="1"
              :show-file-list="true"
              :auto-upload="false"
              :file-list="zipList"
              :disabled="zipList.length === 0 ? false : true"
              :on-change="changeUploadAddCode"
              :before-upload="beforeAvatarUpload"
              accept=".zip"
            >
              <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                type="primary"
              >
                上传文件
              </el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          v-if="addCodeForm.missionTypeAid == '2'"
          label="二维码地址:"
          prop="url"
        >
          <el-input v-model="addCodeForm.url"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCodeModal()">取 消</el-button>
        <el-button type="primary" @click="addCodeSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { taskApi } from '@/api/index'
  import vabQuill from '@/plugins/vabQuill'
  import { baseURL } from '@/config'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    name: 'TaskManage',
    components: { vabQuill },
    data() {
      var validate2 = (rule, value, callback) => {
        let date2 = this.$refs.date2.value
        if (value && date2) {
          callback()
        } else {
          if (!value) {
            callback(new Error('请填写开始时间'))
          }
          if (!date2) {
            callback(new Error('请填写结束时间'))
          }
        }
      }
      return {
        action: '',
        actionZip: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        imgUrlList: [],
        iconUrl: '',
        currentPage: 1,
        total: 1,
        PageSize: 7,
        add: false,
        tableData: [],
        file: [],
        showModal: false,
        Form: {
          aid: '', //任务id
          name: '', //任务名称
          sort: '', //排序，数字越大，优先级越高
          missionTypeName: 1, // 任务分类Name
          missionClassifyName: '', // 任务类型Name
          missionIcon: '', // 任务图标
          missionDescribe: '', // 任务描述
          getNumber: '',
          missionReward: '', //任务酬金
          missionValidityTime: '', //任务有效期
          missionState: 0, //任务状态（0：显示，1：禁止）
          date1: '',
          date2: '',
          url: '',
        },
        typeOption: [],
        kindsOption: [],
        maxFileLen: 0,
        // 详情
        showModalEditDetail: false,
        content: '',
        isAddDetail: false,
        fileList: [],
        showModalUpload: false,
        fullscreenLoading: false,
        addCodeModal: false,
        addCodeForm: {
          url: '',
          missionAid: 1,
          missionTypeAid: 1,
        },
        imgUrlAddCodeList: [],
        moment,
        zipList: [],
        rules: {
          name: [
            { required: true, message: '请填写任务名称', trigger: 'blur' },
          ],
          sort: [{ required: true, message: '请填写排序值', trigger: 'blur' }],
          missionIcon: [
            { required: true, message: '请上传任务图标', trigger: 'change' },
          ],
          missionClassifyName: [
            { required: true, message: '请选择任务分类', trigger: 'change' },
          ],
          missionTypeName: [
            { required: true, message: '请填写任务类型', trigger: 'change' },
          ],
          // missionCode: [
          //   { required: true, message: '请上传任务二维码', trigger: 'change' },
          // ],
          url: [{ required: true, message: '请填二维码地址', trigger: 'blur' }],
          // html: [
          //   { required: true, message: '请填写任务详情', trigger: 'change' },
          // ],
          missionReward: [
            { required: true, message: '请填写任务佣金', trigger: 'blur' },
          ],
          getNumber: [
            {
              required: true,
              message: '请填写任务可领取次数',
              trigger: 'blur',
            },
          ],
          date1: [{ required: true, validator: validate2, trigger: 'blur' }],
          missionDescribe: [
            { required: true, message: '请填写任务描述', trigger: 'blur' },
          ],
          missionState: [
            { required: true, message: '请选择任务状态', trigger: 'change' },
          ],
        },
      }
    },
    created() {
      this.action = baseURL + '/pc/oss/upload'
      this.actionZip = '/pc/oss/uploadZip'
    },
    mounted() {
      this.getList()
      this.getType()
      this.getKinds()
    },
    methods: {
      submitUpload() {
        this.$refs.uploadFileList.submit()
      },
      // 获取任务列表
      async getList(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const data = await taskApi.getTaskList(params)
        if (data) {
          console.log(data, 'data')
          this.tableData = data.data
          this.total = data.totalRecord
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取类型
      async getType() {
        const { data } = await taskApi.getType()
        data.forEach((item) => {
          this.typeOption.push({
            value: item.aid,
            label: item.name,
          })
        })
        console.log(this.typeOption, 'typeOption')
      },
      // 获取任务分类
      async getKinds() {
        const { data } = await taskApi.getTaskClassList()
        data.forEach((item) => {
          console.log(item)
          this.kindsOption.push({
            id: item.aid,
            name: item.name,
          })
        })
        console.log(this.kindsOption, 'kindsOption')
      },
      //修改任务状态
      async changestate(row) {
        const params = {
          aid: row.aid,
          missionState: row.missionState,
        }
        const res = await taskApi.updateTaskState(params)
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
      modalConfirm(flag) {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.submitModalConfirm(flag)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //添加/修改任务
      async submitModalConfirm(flag) {
        // let isBefore = moment(this.Form.date1).isBefore(
        //   moment().format('YYYY-MM-DD')
        // )
        // if (!isBefore) {
        //   this.$message({
        //     message: '开始日期只能为今日之前',
        //     type: 'warning',
        //   })
        //   return
        // }
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            aid: -1,
            name: this.Form.name, //任务名称
            sort: this.Form.sort, //任务排序
            missionClassifyAid: this.Form.missionClassifyName, // 任务分类Name
            missionTypeAid: this.Form.missionTypeName, // 任务类型Name
            missionIcon: this.iconUrl, //任务图标
            missionDescribe: this.Form.missionDescribe, // 任务描述
            missionReward: this.Form.missionReward, //任务酬金
            getNumber: this.Form.getNumber, //可领取次数
            missionValidityTime: this.Form.date1 + ',' + this.Form.date2, //任务有效期
            missionState: String(this.Form.missionState), //任务状态（0：显示，1：禁止）
          }
          // 二维码图标/路径
          if (this.Form.missionTypeName == '1') {
            form.imgUrlList = this.imgUrlList
            form.url = ' '
          } else if (this.Form.missionTypeName == '2') {
            form.imgUrlList = []
            form.url = this.Form.url
          }
          form.html = this.content
          console.log(form, 'form')
          const res = await taskApi.addTasks(form)
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
            aid: this.Form.aid, //任务id
            name: this.Form.name, //任务名称
            sort: this.Form.sort, //任务排序
            missionIcon: this.iconUrl, //任务图标
            missionClassifyAid: this.Form.missionClassifyName, // 任务分类Name
            missionTypeAid: this.Form.missionTypeName, // 任务类型Name
            missionDescribe: this.Form.missionDescribe, // 任务描述
            missionReward: this.Form.missionReward, //任务酬金
            getNumber: this.Form.getNumber, //可领取次数
            missionValidityTime: this.Form.date1 + ',' + this.Form.date2, //任务有效期
            missionState: String(this.Form.missionState), //任务状态（0：显示，1：禁止）
          }
          // 二维码图标/路径
          // if (this.Form.missionTypeName == '1') {
          //   form.imgUrlList = this.imgUrlList
          //   form.url = ' '
          // } else if (this.Form.missionTypeName == '2') {
          //   form.imgUrlList = []
          //   form.url = this.Form.url
          // }
          form.html = this.content
          console.log(form, 'form')
          const res = await taskApi.editTasks(form)
          console.log(res, 'form')
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
      handleSizeChange(val) {
        this.PageSize = val
        this.getList(1, val)
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(val, this.PageSize)
      },
      async deleteRow(item) {
        console.log(item.aid)
        const res = await taskApi.delTasks({ ids: item.aid })
        if (res) {
          this.getList()
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '删除失败',
            type: 'warning',
          })
        }
      },
      addTask() {
        this.add = true
        this.showModal = true
        this.Form.missionState = 0
        if (this.content === '<p><br></p>') {
          this.content = ''
        }
      },
      open() {
        this.$refs.uploadFileList.$children[0].$refs.input.webkitdirectory = true
      },
      async editTask(row) {
        this.add = false
        this.showModal = true
        const params = {
          aid: row.aid,
        }
        const { data } = await taskApi.getTaskData(params)
        console.log(data, 'data')
        this.Form = {
          aid: data.aid,
          name: data.name, //任务名称
          sort: data.sort, //排序，数字越大，优先级越高
          missionClassifyName: data.missionClassifyAid, // 任务分类aid
          missionTypeName: data.missionTypeAid, // 任务类型aid
          missionDescribe: data.missionDescribe, // 任务描述
          missionReward: data.missionReward, //任务酬金
          getNumber: data.getNumber, //可领取次数
          missionValidityTime: data.missionValidityTime, //任务有效期
          missionState: data.missionState, //任务状态（0：显示，1：禁止）
        }
        this.Form.date1 = this.Form.missionValidityTime.split(',')[0]
        this.Form.date2 = this.Form.missionValidityTime.split(',')[1]
        if (data.missionIcon) {
          this.iconUrl = data.missionIcon
        } else {
          this.iconUrl = ''
        }
        if (data.imgUrlList) {
          this.imgUrlList = data.imgUrlList
        } else {
          this.imgUrlList = []
        }
        if (data.html) {
          this.content = data.html
        }
        console.log(this.Form)
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: '',
          name: '', //任务名称
          sort: '', //排序，数字越大，优先级越高
          missionClassifyName: '', // 任务分类aid
          missionTypeName: 1, // 任务类型aid
          missionIcon: '', // 任务图标
          missionDescribe: '', // 任务描述
          missionReward: '', //任务酬金
          getNumber: '', //可领取次数
          missionValidityTime: '', //任务有效期
          missionState: '', //任务状态（0：显示，1：禁止）
        }
        this.iconUrl = ''
        this.imgUrlList = []
        this.content = ''
        this.zipList = []
        this.$refs.Form.resetFields()
      },
      showDialogAddDetail() {
        this.showModalEditDetail = true
      },
      showDialogEditDetail(item) {
        this.showModalEditDetail = true
      },
      editorDetailConfirm() {
        this.showModalEditDetail = false
        if (this.content === '<p><br></p>') {
          this.content = ''
        }
      },
      closeDialog() {
        this.showModalEditDetail = false
      },
      showUpload() {
        this.showModalUpload = true
      },
      closeModalUpload() {
        this.showModalUpload = false
      },
      handleAvatarSuccessIcon(response, file, fileList) {
        this.iconUrl = response.message
        console.log(this.iconUrl)
        this.$refs.uploadIcon.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      changeUpload(file, fileList) {
        console.log(file, fileList, '1')
        let currLength = fileList.length
        this.maxFileLen = Math.max(currLength, this.maxFileLen)
        setTimeout(() => {
          if (currLength != this.maxFileLen) return
          this.uploadFileList(fileList)
        }, 0)
      },
      uploadFileList(fileList) {
        let formData = new FormData()
        fileList.forEach((v) => {
          formData.append('fileList', v.raw)
        })
        formData.append('module', 'img')
        axios({
          method: 'post',
          url: '/pc/oss/uploadList',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: formData,
        }).then((res) => {
          console.log(res)
          this.handleAvatarSuccessOne(res.data.data)
        })
      },
      handleAvatarSuccessOne(data) {
        console.log(Object.values(data))
        let resList = Object.values(data)
        resList.forEach((v) => {
          this.imgUrlList.push({ imgUrl: v })
        })
        this.$refs.uploadFileList.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      handleAvatarSuccessTwo(response, file, fileList) {
        console.log(file)
        this.imgUrlList.push({ imgUrl: response.message })
        console.log(this.imgUrlList)
        this.$refs.upload.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      handleAvatarSuccessThree(response, file, fileList) {
        this.imgUrlList.push({
          imgUrl: response.message,
        })
        console.log(this.imgUrlList)
        // this.$refs.uploadFileList.clearFiles()
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
      uploadFileZip(fileList) {
        let formData = new FormData()
        fileList.forEach((v) => {
          formData.append('fileZip', v.raw)
        })
        formData.append('module', 'img')
        this.fullscreenLoading = true
        axios({
          method: 'post',
          url: this.actionZip,
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 600000,
          data: formData,
        }).then((res) => {
          if (res.data.data) {
            this.handleSuccessZip(res.data.data, fileList)
            this.fullscreenLoading = false
          } else {
            this.$message({
              message: '上传失败',
              type: 'warning',
            })
            this.fullscreenLoading = false
          }
        })
      },
      changeUploadZip(file, fileList) {
        let currLength = fileList.length
        this.maxFileLen = Math.max(currLength, this.maxFileLen)
        setTimeout(() => {
          if (currLength != this.maxFileLen) return
          this.uploadFileZip(fileList)
        }, 0)
      },
      handleSuccessZip(data, fileList) {
        let resList = Object.values(data)
        resList.forEach((v) => {
          this.imgUrlList.push({ imgUrl: v })
        })
        this.zipList = fileList
        this.$refs.uploadFileZIP.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      beforeUploadZip(file) {
        let isLt2M = true
        isLt2M = file.size / 1024 / 1024 < 100
        if (!isLt2M) {
          this.loading = false
          this.$message.error('上传文件大小不能超过 100MB!')
        }
        this.filename = file.name
        return isLt2M
      },
      addCode(row) {
        this.addCodeModal = true
        if (row.missionClassifyName == '二维码模式') {
          this.addCodeForm.missionTypeAid = 1
        } else if (row.missionClassifyName == '链接模式') {
          this.addCodeForm.missionTypeAid = 2
        }
        this.addCodeForm.missionAid = row.aid
      },
      uploadFileAddCode(fileList) {
        let formData = new FormData()
        fileList.forEach((v) => {
          formData.append('fileZip', v.raw)
        })
        formData.append('module', 'img')
        this.fullscreenLoading = true
        axios({
          method: 'post',
          url: this.actionZip,
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 600000,
          data: formData,
        }).then((res) => {
          if (res.data.data) {
            this.handleAddCodeSuccess(res.data.data, fileList)
            this.fullscreenLoading = false
          } else {
            this.$message({
              message: '上传失败',
              type: 'warning',
            })
          }
          this.fullscreenLoading = false
        })
      },
      changeUploadAddCode(file, fileList) {
        let currLength = fileList.length
        this.maxFileLen = Math.max(currLength, this.maxFileLen)
        setTimeout(() => {
          if (currLength != this.maxFileLen) return
          this.uploadFileAddCode(fileList)
        }, 0)
      },
      handleAddCodeSuccess(data, fileList) {
        let resList = Object.values(data)
        resList.forEach((v) => {
          this.imgUrlAddCodeList.push({ imgUrl: v })
        })
        this.zipList = fileList
        this.$refs.uploadAddCode.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      async addCodeSubmit() {
        if (this.addCodeForm.missionTypeAid === 1) {
          this.addCodeForm.url = ''
          this.addCodeForm.imgUrlList = this.imgUrlAddCodeList
        } else if (this.addCodeForm.missionTypeAid === 2) {
          this.imgUrlAddCodeList = []
        }
        console.log(this.addCodeForm)
        const res = await taskApi.addCodeOrUrl(this.addCodeForm)
        if (res) {
          this.getList()
          this.closeCodeModal()
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '失败',
            type: 'warning',
          })
        }
      },
      closeCodeModal() {
        this.addCodeModal = false
        this.addCodeForm = {
          url: '',
          missionAid: 1,
          missionTypeAid: 1,
        }
        this.imgUrlAddCodeList = []
        this.zipList = []
      },
    },
  }
</script>
