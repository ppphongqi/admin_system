<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">二维码库</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="addCode">
            添加二维码
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
        prop="codeName"
        label="二维码状态"
        align="center"
      ></el-table-column>
      <el-table-column prop="imgUrl" label="二维码图片" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.imgUrl" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="二维码链接"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionTypeName"
        label="类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="useNumber"
        label="可使用次数"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editCode(scope.row)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.prevent="showDetail(scope.row)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[7, 20, 40]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      :title="detail ? '二维码详情' : '添加二维码'"
      :visible.sync="showModal"
      width="30%"
      top="20vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="二维码名称:" prop="codeName" :required="!detail">
          <el-input v-model="Form.codeName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item
          label="二维码类型:"
          prop="missionClassifyName"
          :required="!detail"
        >
          <el-select
            v-model="Form.missionClassifyName"
            :disabled="disabled"
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
          v-if="Form.missionClassifyName == '1'"
          label="二维码图片:"
          prop="imgUrl"
          :required="!detail"
        >
          <div class="upload_wrapper">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              action="http://localhost/api/pc/oss/upload"
              :limit="3"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :disabled="disabled"
              :data="{ module: 'img' }"
            >
              <div v-for="url in imgUrlList" :key="url.index">
                <img :src="url.imgUrl" class="avatar" />
              </div>
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="upload_tips">
              （图片大小为 80 * 80px最佳, 支持png、jpg、jpeg)
            </div>
          </div>
        </el-form-item>
        <el-form-item
          v-if="Form.missionClassifyName == '2'"
          label="二维码地址:"
          prop="url"
          :required="!detail"
        >
          <el-input v-model="Form.url" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="可使用次数:" prop="useNumber" :required="!detail">
          <el-select
            v-model="Form.useNumber"
            :disabled="disabled"
            size="medium"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span v-if="!detail" slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal()">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(!detail)">
          确 定
        </el-button>
      </span>

      <span v-else slot="footer" class="dialog-footer">
        <el-button type="danger" @click="closeShowModal()">
          释放二维码
        </el-button>
        <el-button type="primary" @click="modalConfirm(!detail)">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { taskApi } from '@/api/index'
  export default {
    name: 'TaskCode',
    data() {
      return {
        imageUrl: '',
        currentPage: 1,
        total: 1,
        PageSize: 7,
        tableData: [],
        typeOption: [],
        showModal: false,
        detail: false,
        disabled: false,
        Form: {
          aid: '',
          missionClassifyName: 2,
          codeName: '',
          useNumber: '',
          url: '',
        },
        imgUrlList: [],
      }
    },
    mounted() {
      this.getList()
      this.getType()
    },
    methods: {
      changeselect() {
        this.$set
        console.log('ok')
      },
      // 获取二维码列表
      async getList(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const data = await taskApi.getTaskQrCodeList(params)
        console.log(data, 'data')
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
      // 添加/修改二维码
      async modalConfirm(flag) {
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            aid: -1,
            useNumber: this.Form.useNumber,
            url: this.Form.url,
            missionTypeAid: this.Form.missionClassifyName,
            name: this.Form.codeName,
            imgUrlList: this.imgUrlList,
          }
          const res = await taskApi.addCode(form)
          this.showModal = false
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        } else {
          let form = {
            aid: this.Form.aid,
            useNumber: this.Form.useNumber,
            url: this.Form.url,
            missionTypeAid: this.Form.missionClassifyName,
            name: this.Form.codeName,
            imgUrl: this.imgUrlList,
          }
          console.log(form, 'form')
          const res = await taskApi.updateCode(form)
          this.showModal = false
          console.log(res, 'form')
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        }
      },
      //获取二维码类型
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
      //获取二维码状态getTaskQrCodeState
      async getCodeState() {
        const res = await taskApi.getTaskQrCodeState()
        console.log(res, 'res')
      },
      addCode() {
        this.showModal = true
        this.detail = false
        this.disabled = false
      },
      editCode(row) {
        this.showModal = true
        this.detail = true
        this.disabled = false
        this.Form = row
        if (row.missionTypeName == '二维码模式') {
          this.Form.missionClassifyName = 1
        } else if (row.missionTypeName == '链接模式') {
          this.Form.missionClassifyName = 2
        }
        if (row.imgUrl == null) {
          this.imgUrlList = []
        } else {
          this.imgUrlList = Array({ imgUrl: row.imgUrl })
        }
      },
      showDetail(row) {
        this.showModal = true
        this.detail = true
        this.disabled = true
        this.Form = row
        if (row.missionTypeName == '二维码模式') {
          this.Form.missionClassifyName = 1
        } else if (row.missionTypeName == '链接模式') {
          this.Form.missionClassifyName = 2
        }
        if (row.imgUrl == null) {
          this.imgUrlList = []
        } else {
          this.imgUrlList = Array({ imgUrl: row.imgUrl })
        }
      },
      closeShowModal() {
        this.showModal = false
        this.detail = false
        this.disabled = false
        this.Form = {
          codeName: '',
          useNumber: '',
          url: '',
          aid: '',
          missionClassifyName: 2,
        }
        this.imgUrlList = []
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
      handleAvatarSuccess(response, file, fileList) {
        this.imgUrlList.push({ imgUrl: response.message })
        console.log(this.imgUrlList)
        this.$refs.upload.clearFiles()
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
    },
  }
</script>
