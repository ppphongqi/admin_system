<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">二维码库</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
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
        prop="name"
        label="二维码名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="picture"
        label="二维码图片"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="count"
        label="可使用次数"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.prevent="showDetail(scope.$index, tableData)"
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
        <el-form-item label="二维码名称:" prop="name" :required="!detail">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="二维码图片:" prop="number" :required="!detail">
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

        <el-form-item label="序号:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>

        <el-form-item label="可使用次数:" :required="!detail">
          <el-select size="medium">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span v-if="!detail" slot="footer" class="dialog-footer">
        <el-button
          @click="
            showModal = false
            detail = false
          "
        >
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="
            showModal = false
            detail = false
          "
        >
          确 定
        </el-button>
      </span>

      <span v-else slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="
            showModal = false
            detail = false
          "
        >
          释放二维码
        </el-button>
        <el-button
          type="primary"
          @click="
            showModal = false
            detail = false
          "
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import moment from 'moment'
  let tableData = []
  let time = moment().format('YYYY-MM-DD')
  for (let i = 0; i < 7; i++) {
    tableData.push({
      count: i,
      picture: 'image',
      name: '图片',
    })
  }
  export default {
    name: 'TaskCode',
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tableData: tableData,
        showModal: false,
        Form: {
          name: '',
          number: '',
          status: [],
          desc: '',
          date1: '',
          date2: '',
        },
        detail: false,
      }
    },
    methods: {
      showDetail() {
        this.showModal = true
        this.detail = true
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
      showDialog() {
        this.showModal = true
      },
    },
  }
</script>
