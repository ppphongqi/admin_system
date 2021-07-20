<template>
  <div class="page_wrapper">
    <div class="page_title" style="margin-bottom: 0px">
      <div class="ck_title">
        <div class="ck_title">产品列表</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加产品
          </el-button>
        </div>
      </div>
    </div>
    <div class="page_search">
      <el-form label-width="60px" label-position="left">
        <el-form-item label="搜索:">
          <el-input v-model="search_value" style="width: 220px"></el-input>
          <el-button
            style="width: 60px"
            type="primary"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="tableData" stripe style="width: 200%">
      <el-table-column
        prop="name"
        label="产品名称"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="产品编号"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="sourceAid"
        label="来源"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="priority"
        label="优先级"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column prop="state" label="状态" align="center" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="activityStartTime"
        label="活动开始时间"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="activityEndTime"
        label="活动结束时间"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="offShelfTime"
        label="下架时间"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editModal(scope.row)">
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
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      :title="add ? '添加套餐' : '编辑套餐'"
      :visible.sync="showModal"
      width="70%"
      top="15vh"
      :before-close="closeShowModal"
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
                <el-option
                  v-for="item in operator"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
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
        <el-button @click="closeShowModal = false">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
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
  import { virtualProductApi } from '@/api/index'

  export default {
    name: 'VirtualProduct',
    data() {
      return {
        currentPage: 1,
        total: 1,
        pageSize: 7,
        tableData: [],
        virtualClass: [],
        virtualchildClass: [],
        operator: [],
        search_value: '',
        showModal: false,
        showModal2: false,
        add: false,
        textarea: '',
        Form: {
          aid: -1,
          priority: '',
          packageAid: '',
          sourceAid: '',
          stock: '',
          state: '',
          name: '',
          remark: '',
          offShelfTime: '',
          activityStartTime: '',
          activityEndTime: '',
          sort: '',
          channelList: [],
          operatorList: [],
        },
        setForm: {},
      }
    },
    mounted() {
      this.getData({ page: 1, pageRow: 10 })
      this.getVirtualClass()
      this.getVirtualchildClass()
      this.getVirtualOperator()
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.getData({ page: 1, pageRow: this.pageSize })
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getData({ page: val, pageRow: this.pageSize })
      },
      editModal(row) {
        console.log(row)
        this.showModal = true
        this.add = false
        this.Form = row
      },
      showDialog() {
        this.showModal = true
        this.add = true
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {}
      },
      showDialog2() {
        this.showModal2 = true
      },
      search() {
        console.log('检索')
      },
      // 获取表格数据
      async getData(content) {
        const {
          name,
          code,
          packageAid,
          sourceAid,
          state,
          startTime,
          endTime,
          timeAdd,
          classAid,
          childClassAid,
          page,
          pageRow,
        } = content
        const params = {
          name: name || '',
          code: code || '',
          packageAid: packageAid || '',
          sourceAid: sourceAid || '',
          state: state || '',
          startTime: startTime || '',
          endTime: endTime || '',
          timeAdd: timeAdd || '',
          classAid: classAid || '',
          childClassAid: childClassAid || '',
          page: page || '',
          pageRow: pageRow || '',
        }
        const data = await virtualProductApi.getGoodsVirtual(params)
        this.tableData = data.data
        console.log(data, 'data')
      },
      //获取业务父类
      async getVirtualClass() {
        const { data } = await virtualProductApi.getGoodsVirtualClass()
        data.forEach((item) => {
          this.virtualClass.push({
            value: item.aid,
            label: item.name,
          })
        })
        console.log(this.virtualClass, 'virtualClass')
      },
      //获取业务子类
      async getVirtualchildClass() {
        const { data } = await virtualProductApi.getGoodsVirtualChildClass()
        data.forEach((item) => {
          this.virtualchildClass.push({
            value: item.aid,
            label: item.name,
          })
        })
        console.log(this.virtualchildClass, 'virtualchildClass')
      },
      //获取运营商
      async getVirtualOperator() {
        const { data } = await virtualProductApi.getOperator()
        data.forEach((item) => {
          this.operator.push({
            value: item.aid,
            label: item.name,
          })
        })
        console.log(this.operator, 'operator')
      },
      //修改状态
      async changeState(row) {
        console.log(row)
        const params = {
          aid: row.aid,
        }
        if (row.state) {
          params.state = 1
        } else {
          params.state = 0
        }
        console.log(params, 'params')
        const res = await virtualProductApi.updateGoodsVirtualState(params)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          console.log(res, 'res')
          this.getData({ page: 1, pageRow: 10 })
        }
      },
      //添加/修改虚拟产品
      async modalConfirm(flag) {
        console.log(flag, 'flag')
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            aid: -1,
          }
          console.log(form, 'addform')
          const res = await virtualProductApi.editingGoodsVirtual(form)
          console.log(res, 'res')
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
          }
          console.log(form, 'editform')
          const res = await virtualProductApi.editingGoodsVirtual(form)
          this.showModal = false
          console.log(res, 'res')
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        }
      },
      // 获取套餐列表
      async getVirtualPackageList() {
        const params = {
          classAid: 0,
        }
        // const {data}
      },
    },
  }
</script>
