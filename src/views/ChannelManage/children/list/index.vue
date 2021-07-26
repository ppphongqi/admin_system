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
        type="index"
        min-width="55"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="company_name"
        label="企业名称"
        align="center"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="operatorAid"
        label="运营商"
        align="center"
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ getOpName(scope.row.operatorAid) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="districtList"
        label="支持地区"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.districtList.length > 0"
            type="text"
            @click="getDetail(scope.row.districtList)"
          >
            查看明细
          </el-button>
          <span v-else style="color: #aaa">--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="classAid"
        label="支持类型"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <span>{{ getClass(scope.row.classAid) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="priority"
        label="优先级"
        align="center"
        min-width="72"
      ></el-table-column>
      <el-table-column
        prop="api_address"
        label="接口地址"
        align="center"
        min-width="140"
      ></el-table-column>
      <el-table-column
        prop="api_account"
        label="接口账户"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="appsecret"
        label="app密钥"
        align="center"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="app_id"
        label="appId"
        align="center"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="access_token"
        label="access_token"
        align="center"
        width="250"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.access_token !== ''" class="token-box">
            {{ scope.row.access_token }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="active_query_address"
        label="主动查询地址"
        align="center"
        min-width="120"
      >
        <template slot-scope="scope">
          <span
            v-if="
              scope.row.active_query_address === '' ||
              !scope.row.active_query_address
            "
          >
            不支持
          </span>
          <span v-else>{{ scope.row.active_query_address }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_backing_callback"
        label="回调支持"
        align="center"
        min-width="80"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.is_backing_callback === 0">支持</span>
          <span v-if="scope.row.is_backing_callback === 1">不支持</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center" min-width="140">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭"
            :active-value="0"
            :inactive-value="1"
            @change="changeChannelState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="200"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showDiscountModel(scope.row, tableData)"
          >
            设置地区折扣
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="editChannelModelBox(scope.row, tableData)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      :title="add ? '添加通道' : '编辑通道'"
      :visible.sync="editChannelModel"
      width="70%"
      style="margin-top: 20px"
      top
      :before-close="hiddenEditChannelModel"
    >
      <el-form :model="Form" label-width="120px" label-position="right">
        <el-form-item label="企业名称:" prop="company_name" required>
          <el-input v-model="Form.company_name"></el-input>
        </el-form-item>
        <el-form-item label="运营商:" prop="operatorAid" required>
          <el-select v-model="Form.operatorAid" multiple placeholder="请选择">
            <el-option
              v-for="item in operatorList"
              :key="item.aid"
              :label="item.name"
              :value="item.aid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支持地区:" prop="tempIds" required>
          <el-cascader
            v-model="tempIds"
            placeholder="请选择"
            :options="districtList"
            :props="{
              multiple: true,
              value: 'aid',
              label: 'name',
              children: 'city',
            }"
            style="width: 100%"
            filterable
            @change="selectItem"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="支持类型:" prop="classAid" required>
          <el-select v-model="Form.classAid" multiple placeholder="请选择">
            <el-option
              v-for="item in classList"
              :key="item.aid"
              :label="item.name"
              :value="item.aid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置排序值:" prop="sort" required>
          <el-input v-model="Form.sort" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="设置优先级:" prop="priority" required>
          <el-input v-model="Form.priority" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="接口地址:" prop="api_address" required>
          <el-input v-model="Form.api_address"></el-input>
        </el-form-item>
        <el-form-item label="接口账户:" prop="api_account" required>
          <el-input v-model="Form.api_account"></el-input>
        </el-form-item>
        <el-form-item label="app密钥:" prop="appsecret" required>
          <el-input v-model="Form.appsecret"></el-input>
        </el-form-item>
        <el-form-item label="appId:" prop="app_id" required>
          <el-input v-model="Form.app_id"></el-input>
        </el-form-item>
        <el-form-item label="access_token:" prop="access_token" required>
          <el-input v-model="Form.access_token"></el-input>
        </el-form-item>
        <el-form-item
          label="主动查询地址:"
          prop="active_query_address"
          required
        >
          <el-input v-model="Form.active_query_address"></el-input>
        </el-form-item>
        <el-form-item label="回调支持:" prop="is_backing_callback" required>
          <el-radio-group v-model="Form.is_backing_callback">
            <el-radio :label="0">支持</el-radio>
            <el-radio :label="1">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态:" prop="state" align="left">
          <el-radio-group v-model="Form.state">
            <el-radio :label="0">开启</el-radio>
            <el-radio :label="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenEditChannelModel">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="设置折扣"
      :visible.sync="discountModel"
      width="500"
      style="margin-top: 20px"
      top
      :before-close="hiddenDiscountModel"
    >
      <el-form :model="setForm" label-width="100px" label-position="right">
        <el-form-item label="选择地区:" prop="area" required>
          <el-cascader
            v-model="setForm.area"
            placeholder="请选择"
            :options="districtList"
            :props="{
              multiple: true,
              value: 'aid',
              label: 'name',
              children: 'city',
            }"
            style="width: 100%"
            filterable
            @change="selectItem"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="设置折扣:" prop="discount" required>
          <el-input v-model="setForm.discount"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="state" align="left">
          <el-radio-group v-model="setForm.state">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenDiscountModel">取 消</el-button>
        <el-button type="primary" @click="discountModalConfirm()">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="支持地区明细"
      :visible.sync="showAddressDetail"
      width="500"
      style="margin-top: 20px"
      top
      :before-close="hiddenAddressDetail"
    >
      <div class="details">
        <p v-for="(item, index) in addressNmaes" :key="index">
          {{ index + 1 }}、{{ item }}
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { channelApi, virtualProductApi } from '@/api/index'
  export default {
    name: 'ChannelList',
    data() {
      return {
        currentPage: 1,
        pageSize: 20,
        total: 0,
        tableData: [],
        discountModel: false,
        editChannelModel: false,
        add: false,
        Form: {},
        setForm: {
          area: '',
          discount: '',
          state: 0,
        },
        operatorList: [],
        classList: [],
        districtList: [],
        showAddressDetail: false,
        addressNmaes: [],
        tempIds: [],
      }
    },
    created() {
      this.getOperatorList()
      this.getClassList()
      this.getChannelDistrictList()
    },
    mounted() {
      this.getChannelList()
    },
    methods: {
      selectItem() {
        console.log(this.tempIds, '????')
      },
      getAddressName(ids) {
        this.addressNmaes = []
        ids.forEach((v) => {
          if (v.districtAid === 1) this.addressNmaes.push('全国')
          else {
            this.districtList.forEach((v2) => {
              if (v.districtAid <= 35 && v2.aid === v.districtAid)
                this.addressNmaes.push(v2.name)
              else {
                v2.city.forEach((v3) => {
                  if (v3.aid === v.districtAid) {
                    let name = v2.name + v3.name
                    this.addressNmaes.push(name)
                  }
                })
              }
            })
          }
        })
      },
      getDetail(ids) {
        this.showAddressDetail = true
        this.getAddressName(ids)
      },
      hiddenAddressDetail() {
        this.showAddressDetail = false
      },
      // 获取运营商名称
      getOpName(ids) {
        let name = []
        if (this.operatorList.length > 0) {
          this.operatorList.forEach((v) => {
            if (ids.includes(v.aid)) name.push(v.name)
          })
        }
        return name.toString()
      },
      // 获取支持类型名称
      getClass(ids) {
        let name = []
        if (this.classList.length > 0) {
          this.classList.forEach((v) => {
            if (ids.includes(v.aid)) name.push(v.name)
          })
        }
        return name.toString()
      },
      // 获取支持类型
      async getClassList() {
        const { data } = await virtualProductApi.getGoodsVirtualClass({})
        if (data) {
          this.classList = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取地区列表
      async getChannelDistrictList() {
        const params = {}
        const { data } = await channelApi.getDistrictTwo(params)
        if (data) {
          let cities = []
          data.forEach((v) => {
            let item = v.province
            item.disable = true
            if (v.city.length > 1) this.$set(item, 'city', v.city)
            else {
              let itemCity = {
                aid: v.province.aid,
                hierarchy: v.province.hierarchy,
                name: v.province.name,
                pid: v.province.pid,
                rebate: v.province.rebate,
                sqe: v.province.sqe,
                type: v.province.type,
              }
              let itemCities = []
              itemCities.push(itemCity)
              this.$set(item, 'city', itemCities)
            }
            cities.push(item)
          })
          this.districtList = cities
          console.log(this.districtList)
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取运营商列表
      async getOperatorList() {
        const params = {}
        const { data } = await virtualProductApi.getOperator(params)
        if (data) {
          console.log(data)
          this.operatorList = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取通道列表
      async getChannelList() {
        const params = {
          page: this.currentPage,
          pageRow: this.pageSize,
        }
        const { data } = await channelApi.getChannel(params)
        if (data) {
          this.tableData = data.records
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
        console.log(this.Form)
        let ids = []
        this.tempIds.forEach((v) => {
          ids.push(v[1])
        })
        this.Form.districtAid = ids
        if (this.Form.state) {
          this.Form.state = '1'
        } else {
          this.Form.state = '0'
        }
        if (this.Form.is_backing_callback) {
          this.Form.is_backing_callback = '1'
        } else {
          this.Form.is_backing_callback = '0'
        }
        console.log(this.Form)
        let form = {
          appId: this.Form.app_id,
          accessToken: this.Form.access_token,
          aid: this.Form.aid,
          sort: this.Form.sort,
          companyName: this.Form.company_name,
          apiAddress: this.Form.api_address,
          apiAccount: this.Form.api_account,
          isBackingCallback: this.Form.is_backing_callback,
          appsecret: this.Form.appsecret,
          activeQueryAddress: this.Form.active_query_address,
          priority: this.Form.priority,
          state: this.Form.state,
          districtAid: this.Form.districtAid,
          operatorAid: this.Form.operatorAid,
          classAid: this.Form.classAid,
        }
        if (flag) {
          form.aid = -1
        }
        console.log(form)
        const res = await channelApi.editChannel(form)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.hiddenEditChannelModel()
          this.getChannelList()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
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
        this.pageSize = val
        this.getChannelList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getChannelList()
      },
      async deleteRow(item) {
        const params = {
          aid: item.aid,
        }
        const res = await channelApi.deleteChannel(params)
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getChannelList()
        }
      },
      addChannel() {
        this.add = true
        this.Form = {}
        this.editChannelModel = true
      },
      editChannelModelBox(item, data) {
        this.add = false
        this.showModal = true
        this.Form = item
        this.getAddressIds(this.Form)
        this.editChannelModel = true
      },
      getAddressIds(form) {
        let ids = form.districtList
        let tempIds = []
        ids.forEach((v) => {
          let addressIds = []
          if (v.districtAid === 0) addressIds.push(v.districtAid)
          else {
            this.districtList.forEach((v2) => {
              if (v2.aid === v.districtAid) addressIds.push(v2.aid)
              else {
                v2.city.forEach((v3) => {
                  if (v3.aid === v.districtAid) {
                    addressIds.push(v2.aid)
                    addressIds.push(v3.aid)
                  }
                })
              }
            })
          }
          tempIds.push(addressIds)
        })
        this.tempIds = tempIds
        console.log(tempIds)
      },
      hiddenEditChannelModel() {
        this.editChannelModel = false
      },
      closeDiscountModal() {
        this.showModal = false
        this.setForm = {
          area: '',
          discount: '',
          state: 0,
        }
      },
      // 设置折扣
      showDiscountModel(index, data) {
        this.discountModel = true
      },
      hiddenDiscountModel() {
        this.discountModel = false
      },
    },
  }
</script>

<style lang="scss">
  .el-table .cell {
    line-height: 28px !important;
  }
  .token-box {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
