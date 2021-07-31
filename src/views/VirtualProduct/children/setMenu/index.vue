<template>
  <div class="page_wrapper">
    <div class="page_title" style="margin-bottom: 0px">
      <div class="ck_title">
        <div class="ck_title">套餐列表</div>
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
        label="套餐名称"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="numerical_value"
        label="套餐值"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column prop="class_aid" label="父类" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ getClassName(scope.row.class_aid) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="class_child_aid"
        label="子类"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ getChildClassName(scope.row.class_child_aid) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operator_aid"
        label="运营商"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ getOperatorName(scope.row.operator_aid) }}</span>
        </template>
      </el-table-column>
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
        prop="base_price"
        label="基础价格"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="discount_price"
        label="折扣价格"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="time_add"
        label="新增时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeAdd).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time_last_update"
        label="更新时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeLastUpdate).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="remarks"
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
      width="40%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="套餐名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="套餐值:" prop="numericalValue" required>
          <el-input v-model="Form.numericalValue"></el-input>
        </el-form-item>
        <el-form-item label="基础价:" prop="basePrice" required>
          <el-input v-model="Form.basePrice"></el-input>
        </el-form-item>
        <el-form-item label="折扣价:" prop="discountPrice" required>
          <el-input v-model="Form.discountPrice"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="state" required>
          <el-radio-group v-model="Form.state">
            <el-radio :label="0" value="0">开启</el-radio>
            <el-radio :label="1" value="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父类:" prop="classAid" required>
          <el-select v-model="Form.classAid" placeholder="请选择">
            <el-option
              v-for="item in virtualClass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子类:" prop="classChildAid" required>
          <el-select v-model="Form.classChildAid" placeholder="请选择">
            <el-option
              v-for="item in virtualchildClass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营商:" prop="operatorAid" required>
          <el-select v-model="Form.operatorAid" placeholder="请选择">
            <el-option
              v-for="item in operator"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
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
            <el-button @click="showDialog2">
              {{ setProductCode }}
            </el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="流量有效期:" prop="expiration">
          <el-select v-model="Form.expiration" placeholder="请选择">
            <el-option label="一个月" :value="1"></el-option>
            <el-option label="季包" :value="3"></el-option>
            <el-option label="半年包" :value="6"></el-option>
            <el-option label="年包" :value="12"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal">取 消</el-button>
        <el-button type="primary" @click="modalConfirm()">确 定</el-button>
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
          <el-input v-model="setProductCode" placeholder="请输入"></el-input>
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
  import moment from 'moment'
  export default {
    name: 'VirtualProduct',
    data() {
      return {
        moment,
        currentPage: 1,
        total: 1,
        pageSize: 10,
        tableData: [],
        virtualClass: [],
        virtualchildClass: [],
        operator: [],
        search_value: '',
        showModal: false,
        showModal2: false,
        add: false,
        setProductCode: '自定义',
        Form: {
          aid: -1,
          name: '',
          classAid: 1,
          numericalValue: 0,
          operatorAid: 1,
          basePrice: 0,
          discountPrice: 0,
          state: 0,
          classChildAid: 1,
          expiration: 1,
        },
        setForm: {},
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getPackages()
      this.getVirtualClass()
      this.getVirtualchildClass()
      this.getVirtualOperator()
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.getPackages({ classAid: 0, page: 1, pageRow: this.pageSize })
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getPackages({ classAid: 0, page: val, pageRow: this.pageSize })
      },
      editModal(row) {
        console.log(row)
        this.showModal = true
        this.add = false
        this.Form = {
          aid: row.aid,
          name: row.name,
          classAid: row.class_aid,
          numericalValue: row.numerical_value,
          operatorAid: row.operator_aid,
          basePrice: row.base_price,
          discountPrice: row.discount_price,
          state: row.state,
          classChildAid: row.class_child_aid,
          expiration: row.expiration,
        }
      },
      showDialog() {
        this.showModal = true
        this.add = true
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: -1,
          name: '',
          classAid: 1,
          numericalValue: 0,
          operatorAid: 1,
          basePrice: 0,
          discountPrice: 0,
          state: 0,
          classChildAid: 1,
          expiration: 1,
        }
      },
      showDialog2() {
        this.showModal2 = true
      },
      search() {
        console.log('检索')
      },
      //删除
      deleteRow(item) {
        console.log(item)
      },
      // 获取套餐列表
      async getPackages(classAid = 0, page = 1, pageRow = 10) {
        const { data } = await virtualProductApi.getVirtualPackageList({
          classAid,
          page,
          pageRow,
        })
        if (data) {
          this.tableData = data.records
          this.total = data.total
          console.log(data, 'data')
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
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
      // 获取父类名称
      getClassName(ids) {
        let name = []
        if (this.virtualClass.length > 0) {
          this.virtualClass.forEach((v) => {
            if (ids === v.value) name.push(v.label)
          })
        }
        return name.toString()
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
      // 获取子类名称
      getChildClassName(ids) {
        let name = []
        if (this.virtualchildClass.length > 0) {
          this.virtualchildClass.forEach((v) => {
            if (ids === v.value) name.push(v.label)
          })
        }
        return name.toString()
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
      // 获取运营商名称
      getOperatorName(ids) {
        let name = []
        if (this.operator.length > 0) {
          this.operator.forEach((v) => {
            if (ids === v.value) name.push(v.label)
          })
        }
        return name.toString()
      },
      //修改状态
      async changeState(row) {
        console.log(row)
        const params = {
          aid: row.aid,
        }
        if (row.state) {
          params.state = '1'
        } else {
          params.state = '0'
        }
        console.log(params, 'params')
        const res = await virtualProductApi.editingVirtualPackageListState(
          params
        )
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          console.log(res, 'res')
          this.getPackages()
        }
      },
      //添加/修改虚拟产品
      async modalConfirm() {
        console.log(this.Form, 'form')
        if (this.Form.state === 0) {
          this.Form.state = '0'
        }
        const res = await virtualProductApi.editingVirtualPackageList(this.Form)
        console.log(res, 'res')
        this.closeShowModal()
        this.getPackages()
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
    },
  }
</script>
