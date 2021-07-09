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
        label="二维码名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="imgUrl"
        label="二维码图片"
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
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
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
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="二维码名称:" prop="codeName" :required="!detail">
          <el-input v-model="Form.codeName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="二维码图片:" prop="imgUrl" :required="!detail">
          <div class="upload_wrapper">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="upload_tips">
              （图片大小为 80 * 80px最佳, 支持png、jpg、jpeg)
            </div>
          </div>
        </el-form-item>

        <el-form-item label="序号:" prop="sort">
          <el-input v-model="Form.sort" :disabled="disabled"></el-input>
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
        currentPage: 0,
        total: 0,
        tableData: [],
        showModal: false,
        detail: false,
        disabled: false,
        Form: {
          codeName: '',
          useNumber: '',
          sort: '',
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
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
          this.currentPage = data.totalPageNum
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
            name: this.Form.name,
            sort: this.Form.number,
            state: this.Form.status,
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
            name: this.Form.name,
            sort: this.Form.number,
            state: this.Form.status,
          }
          console.log(form, 'form')
          const res = await taskApi.addCode(form)
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
      addCode() {
        this.showModal = true
        this.detail = false
      },
      editCode(row) {
        this.showModal = true
        this.detail = true
        this.Form = {
          codeName: row.codeName,
          useNumber: row.useNumber,
          sort: row.sort,
        }
      },
      showDetail(row) {
        this.showModal = true
        this.detail = true
        this.disabled = true
        this.Form = {
          codeName: row.codeName,
          useNumber: row.useNumber,
          sort: row.sort,
        }
      },
      closeShowModal() {
        this.showModal = false
        this.detail = false
        this.disabled = false
        this.Form = {
          codeName: '',
          useNumber: '',
          sort: '',
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      deleteRow(item) {
        console.log(item)
      },
      handleAvatarSuccess() {},
      beforeAvatarUpload() {},
    },
  }
</script>
