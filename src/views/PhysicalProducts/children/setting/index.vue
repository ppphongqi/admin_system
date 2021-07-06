<template>
  <div class="page_wrapper">
    <div class="page_title" style="margin-bottom: 0px">
      <div class="ck_title">
        <div class="ck_title">规格设置</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加规格
          </el-button>
        </div>
      </div>
    </div>
    <div class="page_search">
      <el-form label-width="60px" label-position="left">
        <el-form-item label="搜索:">
          <el-input v-model="value3" style="width: 220px"></el-input>
          <el-button
            style="width: 60px"
            type="primary"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        prop="number"
        label="序号"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="规格名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productSize"
        label="商品规格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productAttr"
        label="商品属性"
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
      title="商品规格"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="规格名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="内存:" prop="productSize" align="left">
          <el-radio-group v-model="Form.size">
            <el-radio-button label="64G"></el-radio-button>
            <el-radio-button label="128G"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品属性:" prop="productAttr">
          <el-input v-model="Form.attr" style="width: 200px"></el-input>
          <el-button style="width: 60px" type="primary">添加</el-button>
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
  let tableData = []
  for (let i = 0; i < 7; i++) {
    tableData.push({
      number: i,
      name: '规格名称',
      productSize: '64G',
      productAttr: '属性',
    })
  }
  console.log(tableData)

  export default {
    data() {
      return {
        currentPage: 5,
        tableData: tableData,
        showModal: false,
        Form: {
          name: '',
          size: '',
          attr: '',
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
      search() {
        console.log('检索')
      },
    },
  }
</script>
