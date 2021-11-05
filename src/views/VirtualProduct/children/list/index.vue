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
      <el-table-column
        prop="stock"
        label="库存"
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
          <el-button type="text" size="small" @click="deleteRow(scope.row)">
            删除
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
      v-if="showModal"
      :title="add ? '添加产品' : '编辑产品'"
      :visible.sync="showModal"
      width="40%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form
        ref="Form"
        :model="Form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="名称:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="优先级:" prop="priority">
          <el-input v-model="Form.priority"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="Form.sort"></el-input>
        </el-form-item>
        <el-form-item label="来源:" prop="sourceAid">
          <el-input v-model="Form.sourceAid"></el-input>
        </el-form-item>
        <el-form-item label="库存:" prop="stock">
          <el-input v-model="Form.stock"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <el-radio-group v-model="Form.state">
            <el-radio :label="0" value="0">开启</el-radio>
            <el-radio :label="1" value="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间:" prop="activityStartTime">
          <el-date-picker
            v-model="Form.activityStartTime"
            type="datetime"
            placeholder="选择日期"
            style="width: 100%"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="activityEndTime">
          <el-date-picker
            v-model="Form.activityEndTime"
            type="datetime"
            placeholder="选择日期"
            style="width: 100%"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="下架时间:" prop="offShelfTime">
          <el-date-picker
            v-model="Form.offShelfTime"
            type="datetime"
            placeholder="选择日期"
            style="width: 100%"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="套餐:" prop="packageAid">
          <el-select v-model="Form.packageAid" placeholder="请选择">
            <el-option
              v-for="item in packages"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持的通道:" prop="channelList">
          <el-select v-model="Form.channelList" multiple placeholder="请选择">
            <el-option
              v-for="item in channel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营商:" prop="operatorList">
          <el-select v-model="Form.operatorList" multiple placeholder="请选择">
            <el-option
              v-for="item in operator"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="Form.remark" type="textarea"></el-input>
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
  import { virtualProductApi, channelApi } from '@/api/index'

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
        packages: [],
        channel: [],
        operator: [],
        search_value: '',
        showModal: false,
        add: false,
        textarea: '',
        Form: {
          aid: -1,
          priority: 0,
          packageAid: 1,
          sourceAid: 1,
          stock: 0,
          state: 0,
          name: '',
          remark: '',
          offShelfTime: '',
          activityStartTime: '',
          activityEndTime: '',
          sort: 0,
          channelList: [],
          operatorList: [],
        },
        rules: {
          name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
          priority: [
            { required: true, message: '请填写优先级', trigger: 'blur' },
          ],
          sort: [{ required: true, message: '请填写排序值', trigger: 'blur' }],
          sourceAid: [
            { required: true, message: '请填写来源', trigger: 'blur' },
          ],
          stock: [{ required: true, message: '请填写库存', trigger: 'blur' }],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
          activityStartTime: [
            { required: true, message: '请选择开始时间', trigger: 'change' },
          ],
          activityEndTime: [
            { required: true, message: '请选择结束时间', trigger: 'change' },
          ],
          offShelfTime: [
            { required: true, message: '请选择下架时间', trigger: 'change' },
          ],
          packageAid: [
            { required: true, message: '请选择套餐', trigger: 'change' },
          ],
          channelList: [
            { required: true, message: '请选择支持通道', trigger: 'blur' },
          ],
          operatorList: [
            { required: true, message: '请选择运营商', trigger: 'blur' },
          ],
        },
      }
    },
    mounted() {
      this.getData({ page: 1, pageRow: 10 })
      this.getVirtualClass()
      this.getVirtualchildClass()
      this.getVirtualOperator()
      this.getChannel()
      this.getPackages()
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
        this.Form = {
          aid: row.aid,
          packageAid: row.packageAid,
          sourceAid: row.source_aid,
          stock: row.stock,
          state: row.state,
          name: row.name,
          activityStartTime: row.activity_start_time,
          activityEndTime: row.activity_end_time,
          offShelfTime: row.off_shelf_time,
          sort: row.sort,
          priority: row.priority,
          channelList: row.channelList,
          operatorList: row.operatorList,
          remark: row.remark,
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
          priority: 0,
          packageAid: 1,
          sourceAid: 1,
          stock: 0,
          state: 0,
          name: '',
          remark: '',
          offShelfTime: '',
          activityStartTime: '',
          activityEndTime: '',
          sort: 0,
          channelList: [],
          operatorList: [],
        }
        this.$refs.Form.resetFields()
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
        const { data } = await virtualProductApi.getGoodsVirtual(params)
        this.tableData = data.records
        this.total = data.total
        console.log(data.records, 'data')
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
      //获取通道
      async getChannel() {
        const { data } = await channelApi.getChannel({ page: 1, pageRow: 100 })
        if (data) {
          data.records.forEach((item) => {
            this.channel.push({
              value: item.aid,
              label: item.company_name,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
        console.log(this.channel, 'channel')
      },
      // 获取套餐列表
      async getPackages() {
        const { data } = await virtualProductApi.getVirtualPackageList({
          classAid: 0,
          page: 1,
          pageRow: 100,
        })
        if (data) {
          data.records.forEach((item) => {
            this.packages.push({
              value: item.aid,
              label: item.name,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
        console.log(this.packages, 'packages')
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
      modalConfirm() {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.submit()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //添加/修改虚拟产品
      async submit() {
        if (this.Form.state === 0) {
          this.Form.state = '0'
        }
        const res = await virtualProductApi.editingGoodsVirtual(this.Form)
        console.log(res, 'res')
        this.closeShowModal()
        this.getData({ page: 1, pageRow: 10 })
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //删除虚拟产品
      deleteRow(item) {
        console.log(item)
      },
    },
  }
</script>
