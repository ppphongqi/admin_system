<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <el-form :inline="true" label-width="100px" label-position="right">
          <el-form-item label="商品名称:" style="margin-bottom: 0px">
            <el-select
              v-model="value1"
              style="width: 240px"
              placeholder="请选择"
              align-items="center"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型:" style="margin-bottom: 0px">
            <el-select
              v-model="value2"
              style="width: 240px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称:" style="margin-bottom: 0px">
            <el-row>
              <el-col>
                <el-input v-model="value3" style="width: 240px"></el-input>
                <el-button
                  style="width: 60px"
                  type="primary"
                  icon="el-icon-search"
                  @click="search"
                ></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialogAdd">
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
            @click.native.prevent="showDialogEdit(scope.$index, tableData)"
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
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      title="添加分类"
      :visible.sync="showModalAdd"
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
            <el-radio label="显示"></el-radio>
            <el-radio label="隐藏"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalAdd = false">取 消</el-button>
        <el-button type="primary" @click="showModalAdd = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑分类"
      :visible.sync="showModalEdit"
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
            <el-radio label="显示"></el-radio>
            <el-radio label="隐藏"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalEdit = false">取 消</el-button>
        <el-button type="primary" @click="showModalEdit = false">
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
      date: time,
      name: '任务名称',
      status: i < 5 ? true : false,
    })
  }
  console.log(tableData)
  export default {
    data() {
      return {
        value: '',
        value1: '',
        value2: '',
        value3: '',
        options1: [
          {
            value: '商品1',
            label: '商品1',
          },
          {
            value: '商品2',
            label: '商品2',
          },
        ],
        options2: [
          {
            value: '类型1',
            label: '类型1',
          },
          {
            value: '类型2',
            label: '类型2',
          },
        ],
        currentPage: 5,
        showModalAdd: false,
        showModalEdit: false,
        Form: {
          name: '',
          number: '',
          status: [],
        },
        tableData: tableData,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      showDialogAdd() {
        this.showModalAdd = true
      },
      showDialogEdit() {
        this.showModalEdit = true
      },
      deleteRow(item) {
        console.log(item)
      },
      search() {
        console.log('检索')
      },
    },
  }
</script>

<style lang="scss" scoped></style>
