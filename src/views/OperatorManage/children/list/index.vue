<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="op2_title">
        <div class="op2_title_wrapper">
          <div>运营商任务列表</div>
          <div>
            <el-button type="success" icon="el-icon-plus" @click="showDialog">
              添加任务
            </el-button>
          </div>
        </div>
        <div class="op2_search">
          <el-row>
            <el-col :span="0.5" class="op2_label" style="padding-top: 5px">
              aid：
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="params.aid"
                placeholder="请输入内容"
                class="input-with-select"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="1" class="op2_label" style="padding-top: 5px">
              名称：
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="params.name"
                placeholder="请输入内容"
                class="input-with-select"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="1.5" class="op2_label" style="padding-top: 5px">
              运营商：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.operatorsAid"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in operatorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1.5" class="op2_label" style="padding-top: 5px">
              业务分类：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.missionServiceClassAid"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in operatorClass"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1.5" class="op2_label" style="padding-top: 5px">
              任务状态：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.isDisplay"
                placeholder="请选择"
                clearable
              >
                <el-option label="显示" value="0">显示</el-option>
                <el-option label="关闭" value="1">关闭</el-option>
              </el-select>
            </el-col>
            <el-button
              type="success"
              icon="el-icon-search"
              style="margin-left: 20px"
              @click="getList"
            >
              搜索
            </el-button>
          </el-row>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column prop="icon_aid" label="图标" align="center" width="150">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.icon_aid"
            :preview-src-list="[scope.row.icon_aid]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="qr_code_aid"
        label="二维码"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-image
            :src="scope.row.qr_code_aid"
            :preview-src-list="[scope.row.qr_code_aid]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序值"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="operators_aid"
        label="运营商"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ getOperatorName(scope.row.operators_aid) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mission_service_class_aid"
        label="业务类型"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>
            {{ getOperatorClassName(scope.row.mission_service_class_aid) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="路径"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="佣金"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="is_display"
        label="状态"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_display"
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
        prop="info"
        label="简述"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="details"
        label="详情"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="mission_duration"
        label="任务时长"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="effective_start_time"
        label="任务有效期开始时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{
              moment(scope.row.effective_start_time).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="effective_end_time"
        label="任务有效期结束时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{
              moment(scope.row.effective_end_time).format('YYYY-MM-DD HH:mm:ss')
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time_add"
        label="新增时间"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.time_add).format('YYYY-MM-DD HH:mm:ss') }}
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
    <!-- 添加/编辑-->
    <el-dialog
      :title="add ? '添加运营商任务' : '编辑运营商任务'"
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
        <el-form-item label="任务名称:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="运营商:" prop="operatorsAid">
          <el-select v-model="Form.operatorsAid" placeholder="请选择" clearable>
            <el-option
              v-for="item in operatorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型:" prop="missionServiceClassAid">
          <el-select
            v-model="Form.missionServiceClassAid"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in operatorClass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标:" prop="fileToIconAid">
          <el-upload
            ref="operatorIconUpload"
            class="operatorIcon-uploader"
            :action="action"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessIcon"
            :before-upload="beforeAvatarUpload"
            :data="{ module: 'img' }"
          >
            <img
              v-if="Form.fileToIconAid"
              :src="Form.fileToIconAid"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="二维码:" prop="qrCodeAid">
          <el-upload
            ref="operatorQrUpload"
            class="operatorQr-uploader"
            :action="action"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessQr"
            :before-upload="beforeAvatarUpload"
            :data="{ module: 'img' }"
          >
            <img v-if="Form.qrCodeAid" :src="Form.qrCodeAid" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="任务链接:" prop="url">
          <el-input v-model="Form.url"></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="info">
          <el-input v-model="Form.info"></el-input>
        </el-form-item>
        <el-form-item label="佣金:" prop="price">
          <el-input v-model="Form.price"></el-input>
        </el-form-item>
        <el-form-item label="详情:" prop="details">
          <el-input v-model="Form.details"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="effectiveStartTime">
          <el-date-picker
            v-model="Form.effectiveStartTime"
            type="datetime"
            placeholder="选择日期"
            style="width: 100%"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="effectiveEndTime">
          <el-date-picker
            v-model="Form.effectiveEndTime"
            type="datetime"
            placeholder="选择日期"
            style="width: 100%"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="任务时长:" prop="missionDuration">
          <el-input v-model="Form.missionDuration"></el-input>
        </el-form-item>
        <el-form-item label="是否显示:" prop="isDisplay">
          <el-radio-group v-model="Form.isDisplay">
            <el-radio :label="0" value="0">显示</el-radio>
            <el-radio :label="1" value="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序值:" prop="sort">
          <el-input v-model="Form.sort"></el-input>
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
  import { operatorApi, virtualProductApi } from '@/api/index'
  import moment from 'moment'
  import './index.scss'
  export default {
    name: 'DomainName',
    data() {
      return {
        moment,
        action: 'http://localhost/api/pc/oss/upload',
        tableData: [],
        operatorList: [],
        operatorClass: [],
        Form: {
          aid: -1,
          name: '',
          operatorsAid: '',
          missionServiceClassAid: '',
          fileToIconAid: '',
          qrCodeAid: '',
          url: '',
          info: '',
          price: '',
          details: '',
          effectiveStartTime: '',
          effectiveEndTime: '',
          missionDuration: '',
          isDisplay: '',
          sort: '',
        },
        showModal: false,
        add: false,
        currentPage: 1,
        total: 1,
        PageSize: 10,
        params: {
          aid: '',
          name: '',
          operatorsAid: '',
          missionServiceClassAid: '',
          isDisplay: '',
          page: 1,
          pageRow: 10,
          isAllArgsSelect: 1,
        },
        rules: {
          name: [
            { required: true, message: '请填写任务名称', trigger: 'blur' },
          ],
          operatorsAid: [
            { required: true, message: '请选择运营商', trigger: 'change' },
          ],
          missionServiceClassAid: [
            { required: true, message: '请选择业务类型', trigger: 'change' },
          ],
          fileToIconAid: [
            { required: true, message: '请上传任务图标', trigger: 'change' },
          ],
          qrCodeAid: [
            { required: true, message: '请上传二维码', trigger: 'change' },
          ],
          url: [{ required: true, message: '请填写任务链接', trigger: 'blur' }],
          info: [
            { required: true, message: '请填写任务描述', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请填写任务佣金', trigger: 'blur' },
          ],
          details: [
            { required: true, message: '请填写任务详情', trigger: 'blur' },
          ],
          effectiveStartTime: [
            { required: true, message: '请选择开始时间', trigger: 'change' },
          ],
          effectiveEndTime: [
            { required: true, message: '请选择结束时间', trigger: 'change' },
          ],
          missionDuration: [
            { required: true, message: '请填写任务时长', trigger: 'blur' },
          ],
          isDisplay: [
            { required: true, message: '请选择是否显示', trigger: 'change' },
          ],
          sort: [{ required: true, message: '请填写排序值', trigger: 'blur' }],
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
      this.getOperatorList()
      this.getOperatorClass()
    },
    methods: {
      // 获取列表
      async getList() {
        if (
          this.params.aid !== '' &&
          this.params.name !== '' &&
          this.params.operatorsAid !== '' &&
          this.params.missionServiceClassAid !== '' &&
          this.params.isDisplay !== ''
        ) {
          this.params.isAllArgsSelect = -1
        } else {
          this.params.isAllArgsSelect = 1
        }
        const { data } = await operatorApi.getOperatorList(this.params)
        if (data) {
          this.tableData = data.records
          this.total = data.records.length
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取运营商列表
      async getOperatorList() {
        const { data } = await virtualProductApi.getOperator()
        if (data) {
          data.forEach((v) => {
            this.operatorList.push({
              label: v.name,
              value: v.aid,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //获取运营商名称
      getOperatorName(item) {
        let name = []
        if (this.operatorList.length > 0) {
          this.operatorList.forEach((v) => {
            if (item === v.value) name.push(v.label)
          })
        }
        return name.toString()
      },
      // 获取业务分类列表
      async getOperatorClass() {
        const { data } = await operatorApi.getOperatorClass({
          state: '0',
        })
        if (data) {
          data.forEach((v) => {
            this.operatorClass.push({
              label: v.name,
              value: v.aid,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //获取业务分类名称
      getOperatorClassName(item) {
        let name = []
        if (this.operatorClass.length > 0) {
          this.operatorClass.forEach((v) => {
            if (item === v.value) name.push(v.label)
          })
        }
        return name.toString()
      },
      //添加弹出
      showDialog() {
        this.showModal = true
        this.add = true
      },
      //编辑弹出
      showDialogEdit(row) {
        this.showModal = true
        this.add = false
        this.Form = {
          aid: row.aid,
          name: row.name,
          operatorsAid: row.operators_aid,
          missionServiceClassAid: row.mission_service_class_aid,
          fileToIconAid: row.icon_aid,
          qrCodeAid: row.qr_code_aid,
          url: row.url,
          info: row.info,
          price: row.price,
          details: row.details,
          effectiveStartTime: moment(row.effective_start_time).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          effectiveEndTime: moment(row.effective_end_time).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          missionDuration: row.mission_duration,
          isDisplay: row.is_display,
          sort: row.sort,
        }
      },
      //关闭弹出
      closeShowModal() {
        this.$refs.Form.resetFields()
        this.showModal = false
        this.Form = {
          aid: -1,
          name: '',
          operatorsAid: '',
          missionServiceClassAid: '',
          fileToIconAid: '',
          qrCodeAid: '',
          url: '',
          info: '',
          price: '',
          details: '',
          effectiveStartTime: '',
          effectiveEndTime: '',
          missionDuration: '',
          isDisplay: '',
          sort: '',
        }
      },
      //添加编辑
      modalConfirm() {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.Form.isDisplay = String(this.Form.isDisplay)
            operatorApi.updateOperatorList(this.Form).then((res) => {
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
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //删除
      async deleteRow(row) {
        const res = await operatorApi.delOperatorList({ aid: row.aid })
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
        let form = {
          aids: [row.aid],
          state: String(row.is_display),
        }
        const res = await operatorApi.updateOperatorState(form)
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
      //上传图标
      handleAvatarSuccessIcon(response, file, fileList) {
        this.Form.fileToIconAid = response.message
        this.$refs.operatorIconUpload.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      //上传二维码
      handleAvatarSuccessQr(response, file, fileList) {
        this.Form.qrCodeAid = response.message
        this.$refs.operatorQrUpload.clearFiles()
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
      handleSizeChange(val) {
        this.PageSize = val
        this.params.pageRow = val
        this.getList()
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.params.page = val
        this.params.pageRow = this.PageSize
        this.getList()
      },
    },
  }
</script>

<style lang="scss">
  .operatorIcon-uploader {
    .el-upload {
      width: 40px;
      height: 40px;
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
      font-size: 18px;
      color: #8c939d;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .avatar {
      width: 40px;
      height: 40px;
      display: block;
    }
  }
  .operatorQr-uploader {
    .el-upload {
      width: 40px;
      height: 40px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 18px;
      color: #8c939d;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .avatar {
      width: 40px;
      height: 40px;
      display: block;
    }
  }
</style>
