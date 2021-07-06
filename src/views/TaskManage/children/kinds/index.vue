<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">任务分类</div>
        <div class="ck_buttons">
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
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
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
    <!-- <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div> -->

    <el-dialog
      :title="add ? '添加任务分类' : '编辑任务分类'"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="分类名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="number" align="center">
          <el-input v-model="Form.number"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-radio-group v-model="Form.status">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
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
  import { taskApi } from '@/api/index'

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
          name: '',
          number: '',
          status: 0,
        },
      }
    },
    mounted() {
      this.getList()
      this.getType()
    },
    methods: {
      // 获取任务分类列表
      async getList(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const { data } = await taskApi.getTasks(params)
        if (data) {
          this.tableData = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //获取任务类型
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
      // 添加/编辑任务分类
      async modalConfirm(flag) {
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            name: this.Form.name,
            sort: this.Form.number,
            state: this.Form.status,
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
            name: this.Form.name,
            sort: this.Form.number,
            state: this.Form.status,
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
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`)
      // },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`)
      // },
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
        this.Form = {
          name: row.name,
          number: row.sort,
          status: row.state,
        }
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          name: '',
          number: '',
          status: 0,
        }
      },
    },
  }
</script>
