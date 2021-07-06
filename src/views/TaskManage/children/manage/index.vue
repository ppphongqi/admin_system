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
        prop="name"
        label="任务名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionIcon"
        label="任务图标"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionClassifyName"
        label="任务分类"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="missionTypeName"
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
            v-model="scope.row.state"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="显示"
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
      :title="add ? '添加任务' : '编辑任务'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="任务名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="任务图标:" prop="missionIcon" required>
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
        <el-form-item label="任务分类:" required>
          <el-select v-model="Form.missionClassifyName" size="medium">
            <el-option
              v-for="(item, index) in kindsOption"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类型:" required>
          <el-select v-model="Form.missionTypeName" size="medium">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务佣金:" prop="missionReward" required>
          <el-input v-model="Form.missionReward"></el-input>
        </el-form-item>
        <el-form-item label="任务时间:" required>
          <el-col :span="11">
            <el-date-picker
              v-model="Form.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="Form.date2"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="任务描述:" prop="missionDescribe" required>
          <el-input v-model="Form.missionDescribe" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="状态:" prop="missionState">
          <el-radio-group v-model="Form.missionState">
            <el-radio label="0" value="0">显示</el-radio>
            <el-radio label="1" value="1">隐藏</el-radio>
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
  import './index.scss'
  import { taskApi } from '@/api/index'
  export default {
    name: 'TaskManage',
    data() {
      return {
        imageUrl: '',
        currentPage: 0,
        total: 0,
        add: false,
        tableData: [],
        showModal: false,
        Form: {
          name: '', //任务名称
          sort: '', //排序，数字越大，优先级越高
          missionClassifyName: '', // 任务分类Name
          missionTypeName: '', // 任务类型Name
          missionIcon: '', // 任务图标
          missionDescribe: '', // 任务描述
          missionReward: '', //任务酬金
          missionState: '', //任务状态（0：显示，1：禁止）
        },
        typeOption: [],
        kindsOption: [],
      }
    },
    mounted() {
      this.getList()
      this.getType()
      this.getKinds()
    },
    methods: {
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
          this.currentPage = data.totalPageNum
          this.total = data.totalRecord
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取任务类型
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
        const { data } = await taskApi.getTasks()
        data.forEach((item) => {
          console.log(item)
          this.kindsOption.push({
            id: item.aid,
            name: item.name,
          })
        })
        console.log(this.kindsOption, 'kindsOption')
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      async modalConfirm(flag) {
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            name: this.Form.name, //任务名称
            missionClassifyName: this.Form.missionClassifyName, // 任务分类Name
            missionTypeName: this.Form.missionTypeName, // 任务类型Name
            missionIcon: this.Form.missionIcon, // 任务图标
            missionDescribe: this.Form.missionDescribe, // 任务描述
            missionReward: this.Form.missionReward, //任务酬金
            missionState: this.Form.missionState, //任务状态（0：显示，1：禁止）
          }
          const res = await taskApi.addTasks(form)
          this.showModal = false
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        } else {
          let form = {
            name: this.Form.name, //任务名称
            missionClassifyName: this.Form.missionClassifyName, // 任务分类Name
            missionTypeName: this.Form.missionTypeName, // 任务类型Name
            missionIcon: this.Form.missionIcon, // 任务图标
            missionDescribe: this.Form.missionDescribe, // 任务描述
            missionReward: this.Form.missionReward, //任务酬金
            missionState: this.Form.missionState, //任务状态（0：显示，1：禁止）
          }
          console.log(form, 'form')
          const res = await taskApi.addTasks(form)
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
      deleteRow(item) {
        console.log(item)
      },
      addTask() {
        this.add = true
        this.showModal = true
      },
      editTask(row) {
        this.add = false
        this.showModal = true
        console.log(row)
        this.Form = {
          name: row.name, //任务名称
          sort: row.sort, //排序，数字越大，优先级越高
          missionClassifyName: row.missionClassifyName, // 任务分类aid
          missionTypeName: row.missionTypeName, // 任务类型aid
          missionIcon: row.missionIcon, // 任务图标
          missionDescribe: row.missionDescribe, // 任务描述
          missionReward: row.missionReward, //任务酬金
          missionState: row.missionState, //任务状态（0：显示，1：禁止）
        }
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          name: '', //任务名称
          sort: '', //排序，数字越大，优先级越高
          missionClassifyName: '', // 任务分类aid
          missionTypeName: '', // 任务类型aid
          missionIcon: '', // 任务图标
          missionDescribe: '', // 任务描述
          missionReward: '', //任务酬金
          missionState: '', //任务状态（0：显示，1：禁止）
        }
      },
      handleAvatarSuccess() {},
      beforeAvatarUpload() {},
    },
  }
</script>
