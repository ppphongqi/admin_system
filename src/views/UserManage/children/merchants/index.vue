<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="mer_title">
        <div>商家认证</div>
        <div class="mer_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加商家
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
        label="图片"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="商家名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="营业执照"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="统一社会编码"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
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
            详情
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            审核
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
  </div>
</template>

<script>
  import './index.scss'

  let tableData = []
  for (let i = 0; i < 7; i++) {
    tableData.push({
      date: 11,
      name: '任务名称',
      address: '上海市普陀区金沙江路 1518 弄',
      status: i < 5 ? true : false,
      type: '类型',
    })
  }
  export default {
    name: 'Merchants',
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tableData: tableData,
      }
    },
    methods: {
      showDialog() {},
      handleSizeChange() {},
      handleCurrentChange() {},
    },
  }
</script>

<style lang="scss" scoped></style>
