<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">任务分类</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
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
        prop="date"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="任务类型"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="显示"
          ></el-switch>
        </template>
      </el-table-column>
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
      title="添加任务分类"
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
        <el-form-item label="状态:" prop="status" align="center">
          <el-radio-group v-model="Form.status">
            <el-checkbox label="显示"></el-checkbox>
            <el-checkbox label="隐藏"></el-checkbox>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">取 消</el-button>
        <el-button type="primary" @click="showModal = false">确 定</el-button>
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
      date: time,
      name: '任务名称',
      address: '上海市普陀区金沙江路 1518 弄',
      status: i < 5 ? true : false,
      type: '类型',
    })
  }
  console.log(tableData)

  export default {
    name: 'TaskKinds',
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
        },
      }
    },
    methods: {
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
