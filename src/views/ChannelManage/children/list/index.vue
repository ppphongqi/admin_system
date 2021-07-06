<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">通道管理</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="addChannel">
            添加通道
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
        prop="sort"
        label="通道名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="operatorAid"
        label="运营商"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="districtList"
        label="支持地区"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="classAid"
        label="是否支持花费/流量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="priority"
        label="优先级"
        align="center"
      ></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭"
            @change="changeChannelState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showDialog3(scope.$index, tableData)"
          >
            设置折扣
          </el-button>
          <el-button type="text" size="small" @click="editChannel(scope.row)">
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
      :title="add ? '添加通道' : '编辑通道'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
    >
      <el-form :model="Form" label-width="120px" label-position="right">
        <el-form-item label="通道名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" prop="companyName" required>
          <el-input v-model="Form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="接口地址:" prop="interfaceAddress" required>
          <el-input v-model="Form.interfaceAddress"></el-input>
        </el-form-item>
        <el-form-item label="接口账号:" prop="interfaceName" required>
          <el-input v-model="Form.interfaceName"></el-input>
        </el-form-item>
        <el-form-item label="接口密码:" prop="interfacePassword" required>
          <el-input v-model="Form.interfacePassword"></el-input>
        </el-form-item>
        <el-form-item label="接口Key:" prop="interfaceKey" required>
          <el-input v-model="Form.interfaceKey"></el-input>
        </el-form-item>
        <el-form-item label="支持的运营商:" prop="isp" required>
          <el-select v-model="Form.isp" placeholder="请选择">
            <el-option
              v-for="item in isps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持的地区:" prop="area" required>
          <el-select v-model="Form.area" placeholder="请选择">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持话费/流量:" prop="if" required>
          <el-select v-model="Form.if" placeholder="请选择">
            <el-option
              v-for="item in ifs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置优先级:" prop="order" required>
          <el-select v-model="Form.order" placeholder="请选择">
            <el-option
              v-for="item in orders"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status" align="left">
          <el-radio-group v-model="Form.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal()">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="设置折扣"
      :visible.sync="showModal3"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="选择地区:" prop="area" required>
          <el-select v-model="setForm.area" placeholder="请选择">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置折扣:" prop="discount" required>
          <el-input v-model="setForm.discount"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status" align="left">
          <el-radio-group v-model="setForm.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDiscountModal()">取 消</el-button>
        <el-button type="primary" @click="discountModalConfirm()">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { channelApi } from '@/api/index'
  export default {
    name: 'ChannelList',
    data() {
      return {
        currentPage: 0,
        total: 0,
        tableData: [],
        add: false,
        showModal: false,
        showModal3: false,
        Form: {
          name: '',
          companyName: '',
          interfaceAddress: '',
          interfaceName: '',
          interfacePassword: '',
          interfaceKey: '',
          isp: '',
          area: '',
          if: '',
          order: '',
          status: 1,
        },
        setForm: {
          area: '',
          discount: '',
          status: 0,
        },
        ifs: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
        areas: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
        isps: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
        orders: [
          {
            value: '选项1',
            label: '选项1',
          },
          {
            value: '选项2',
            label: '选项2',
          },
        ],
      }
    },
    mounted() {
      this.getChannelList()
    },
    methods: {
      // 获取通道列表
      async getChannelList(page = 1, pageRow = 7) {
        const params = {
          page,
          pageRow,
        }
        const { data } = await channelApi.getChannel(params)
        if (data) {
          this.tableData = data.records
          this.currentPage = data.current
          this.total = data.total
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 添加/编辑通道
      async modalConfirm(flag) {
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            aid: -1,
            classAid: [1, 2],
            operatorAid: [1, 2],
            sort: 22,
            apiPassword: this.Form.interfacePassword,
            priority: this.Form.order,
            apiAddress: this.Form.interfaceAddress,
            districtAid: [1, 2],
            apiAccount: this.Form.interfaceName,
            apiKey: this.Form.interfaceKey,
            companyName: this.Form.companyName,
            state: 1,
            appId: '',
            accessToken: '',
            appsecret: '',
            activeQueryAddress: '',
          }
          const res = await channelApi.editChannel(form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        } else {
          let form = {
            aid: 1,
            classAid: [1, 2],
            operatorAid: [1, 2],
            sort: 22,
            apiPassword: this.Form.interfacePassword,
            priority: this.Form.order,
            apiAddress: this.Form.interfaceAddress,
            districtAid: [1, 2],
            apiAccount: this.Form.interfaceName,
            apiKey: this.Form.interfaceKey,
            companyName: this.Form.companyName,
            state: this.Form.status,
            appId: '',
            accessToken: '',
            appsecret: '',
            activeQueryAddress: '',
          }
          const res = await channelApi.editChannel(form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        }
      },
      //改变通道状态
      async changeChannelState(row) {
        const params = {
          aid: row.aid,
        }
        const res = await channelApi.channelState(params)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          this.getChannelList()
        }
      },
      //获取所有地区
      async getDistrict() {
        const params = {}
        const { data } = await channelApi.getChannelDistrict(params)
        if (data) {
          this.areas = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async discountModalConfirm() {
        let form = {}
        const res = await channelApi.discountModalConfirm(form)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      deleteRow(item) {
        console.log(item)
      },
      addChannel() {
        this.add = true
        this.showModal = true
      },
      editChannel(row) {
        this.add = false
        this.showModal = true
        console.log(row, 'row')
        this.Form = {
          name: row.name,
          companyName: row.company_name,
          interfaceAddress: row.api_address,
          interfaceName: row.api_account,
          interfacePassword: row.api_password,
          interfaceKey: row.api_key,
          isp: row.classAid,
          area: row.districtList,
          if: row.state,
          order: row.priority,
          status: row.state,
        }
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          name: '',
          companyName: '',
          interfaceAddress: '',
          interfaceName: '',
          interfacePassword: '',
          interfaceKey: '',
          isp: '',
          area: '',
          if: '',
          order: '',
          status: 1,
        }
      },
      closeDiscountModal() {
        ;(this.showModal = false),
          (this.setForm = {
            area: '',
            discount: '',
            status: 0,
          })
      },
      showDialog3() {
        this.showModal3 = true
        this.getDistrict()
      },
    },
  }
</script>
