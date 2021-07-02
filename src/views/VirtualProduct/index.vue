<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">流量业务</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加套餐
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
        prop="name"
        label="套餐名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productType"
        label="产品类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="isp"
        label="运营商"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productCode"
        label="产品编码"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="基础价"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="discountPrice"
        label="折扣价"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="使用状态"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
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
          <el-button size="mini" type="text">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                管理
                <i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>下架套餐</el-dropdown-item>
                <el-dropdown-item>上线套餐</el-dropdown-item>
                <el-dropdown-item>移除套餐</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      title="编辑套餐"
      :visible.sync="showModal"
      width="70%"
      top="15vh"
    >
      <el-form
        :inline="true"
        :model="Form"
        label-width="100px"
        label-position="right"
        class="demo-form-inline"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="套餐名称:" prop="name" required>
              <el-input v-model="Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品类型:" prop="productType" required>
              <el-input v-model="Form.productType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营商:" prop="isp" required>
              <el-select v-model="Form.isp">
                <el-option label="联通" value="联通"></el-option>
                <el-option label="移动" value="移动"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="基础价:" prop="price" required>
              <el-input v-model="Form.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="折扣价:" prop="discountPrice" required>
              <el-input v-model="Form.discountPrice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="产品编码:" prop="productCode">
            <el-row>
              <el-button>10M</el-button>
              <el-button>50M</el-button>
              <el-button>100M</el-button>
              <el-button>200M</el-button>
              <el-button>500M</el-button>
              <el-button>1G</el-button>
              <el-button>2G</el-button>
            </el-row>
            <el-row>
              <el-button>10G</el-button>
              <el-button>20G</el-button>
              <el-button>100G</el-button>
              <el-button @click="showDialog2">自定义</el-button>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="remark">
              <el-input
                v-model="textarea"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
                >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">取 消</el-button>
        <el-button type="primary" @click="showModal = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showModal2" title="自定义" width="20%" top="15vh">
      <el-form
        :inline="true"
        :model="setForm"
        label-width="100px"
        label-position="right"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-input v-model="Form.productCode" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal2 = false">取 消</el-button>
        <el-button type="primary" @click="showModal2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  let tableData = []
  for (let i = 0; i < 7; i++) {
    tableData.push({
      name: '名称',
      productType: '类型',
      productCode: '123',
      isp: '联通',
      price: '10000',
      discountPrice: '8000',
      status: '正常',
      remark: '无',
    })
  }
  console.log(tableData)

  export default {
    name: 'VirtualProduct',
    data() {
      return {
        currentPage: 5,
        tableData: tableData,
        showModal: false,
        showModal2: false,
        textarea: '',
        Form: {
          name: '',
          productType: '',
          isp: '',
          price: '',
          discountPrice: '',
          productCode: '',
          remark: '',
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
      showDialog2() {
        this.showModal2 = true
      },
      search() {
        console.log('检索')
      },
    },
  }
</script>
