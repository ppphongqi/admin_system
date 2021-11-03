<template>
  <div class="page_wrapper">
    <div class="page_title" style="margin-bottom: 0px">
      <div class="ck_title">
        <div class="ck_title">订单管理</div>
      </div>
    </div>
    <div class="page_content">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          全部订单({{ entityNum + virtualNum }})
        </el-menu-item>
        <el-menu-item index="2">实物产品({{ entityNum }})</el-menu-item>
        <el-menu-item index="3">虚拟产品({{ virtualNum }})</el-menu-item>
      </el-menu>
    </div>
    <!-- 金额信息块 -->
    <div class="money_clock3">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="money_clock3_items"
      >
        <div class="money_clock3_items_left">
          <div class="img_test" :style="{ background: item.color }"></div>
        </div>
        <div class="money_clock3_items_right">
          <div class="money_clock3_items_right_top">6333</div>
          <div class="money_clock3_items_right_down">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="continer">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="订单状态:">
          <el-radio-group v-model="status">
            <el-radio-button label="top">全部</el-radio-button>
            <el-radio-button label="right">待支付</el-radio-button>
            <el-radio-button label="bottom">待发货</el-radio-button>
            <el-radio-button label="left">待收货</el-radio-button>
            <el-radio-button label="1">已完成</el-radio-button>
            <el-radio-button label="2">退款中</el-radio-button>
            <el-radio-button label="3">已退款</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付方式:">
          <el-radio-group v-model="payMode">
            <el-radio-button label="top">全部</el-radio-button>
            <el-radio-button label="right">支付宝</el-radio-button>
            <el-radio-button label="bottom">微信</el-radio-button>
            <el-radio-button label="left">余额</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-row>
            <el-col :span="3">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="搜索：">
          <el-row>
            <el-col :span="3">
              <el-input v-model="serach" class="input-with-select">
                <el-select
                  slot="prepend"
                  v-model="select"
                  placeholder="全部"
                  style="width: 74px"
                >
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 全部订单 -->
      <el-table
        v-if="first"
        border
        :data="tableData"
        stripe
        style="width: 100%; margin-top: 10px; margin-bottom: 100px"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="订单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户信息"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="info"
          label="商品信息"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="from"
          label="渠道来源"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pay"
          label="支付方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="原价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="discountPrice"
          label="折扣价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showDialog(scope.row)">
              发货
            </el-button>
            <el-dropdown style="margin-left: 10px">
              <el-button type="text">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>订单详情</el-dropdown-item>
                <el-dropdown-item>订单记录</el-dropdown-item>
                <el-dropdown-item>小栗打印</el-dropdown-item>
                <el-dropdown-item>订单备注</el-dropdown-item>
                <el-dropdown-item>立即退款</el-dropdown-item>
                <el-dropdown-item>删除订单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 实物产品 -->
      <el-table
        v-if="second"
        border
        :data="entityTableData"
        stripe
        style="width: 100%; margin-top: 10px; margin-bottom: 100px"
      >
        <el-table-column
          type="index"
          label="序号"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="订单号"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="下单用户名称"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="toUserAid"
          label="商品卖家"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="entityName"
          label="商品信息"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="specification"
          label="规格属性"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="discountPrice"
          label="折扣价格"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="quantity"
          label="购买商品数量"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="prices"
          label="总金额"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="isDelete"
          label="是否为删除状态"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isDelete === '1'">是</div>
            <div v-if="scope.row.isDelete === '0'">否</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="paymentName"
          label="支付类型"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="stateName"
          label="订单状态"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="trackingNumber"
          label="快递单号"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="personalDeliveryClassAid"
          label="发货类型"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="courierCompany"
          label="快递公司"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="addressAid"
          label="用户收货地址"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <span>
              {{ getArea(scope.row.area, scope.row.address) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="area"
          label="省市县"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="街道"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="timeAdd"
          label="创建时间"
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
              {{
                moment(scope.row.timeLastUpdate).format('YYYY-MM-DD HH:mm:ss')
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.paymentClassAid === 4"
              type="text"
              size="small"
              @click="audit(scope.row)"
            >
              审核
            </el-button>
            <el-button type="text" size="small" @click="sendEdit(scope.row)">
              发货
            </el-button>
            <el-dropdown style="margin-left: 10px">
              <el-button type="text">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>订单详情</el-dropdown-item>
                <el-dropdown-item>订单记录</el-dropdown-item>
                <el-dropdown-item>小栗打印</el-dropdown-item>
                <el-dropdown-item>订单备注</el-dropdown-item>
                <el-dropdown-item>立即退款</el-dropdown-item>
                <el-dropdown-item>删除订单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 虚拟产品 -->
      <el-table
        v-if="third"
        border
        :data="tableData"
        stripe
        style="width: 100%; margin-top: 10px; margin-bottom: 100px"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="订单时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="分销商"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="info"
          label="产品名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="from"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pay"
          label="归属地"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="原价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="discountPrice"
          label="折扣价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quitNumber"
          label="回滚次"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-dropdown style="margin-left: 10px">
              <el-button
                type="text"
                el-icon-arrow-down
                @click.native.prevent="deleteRow(scope.row)"
              >
                管理
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>订单详情</el-dropdown-item>
                <el-dropdown-item>操作记录</el-dropdown-item>
                <el-dropdown-item>订单备注</el-dropdown-item>
                <el-dropdown-item>立即退款</el-dropdown-item>
                <el-dropdown-item>删除订单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div> -->
    </div>
    <el-dialog
      title="订单发货"
      :visible.sync="sendFormModal"
      width="30%"
      top="25vh"
      :before-close="closeSendFormModal"
    >
      <el-form
        ref="sendForm"
        :model="sendForm"
        :rules="sendFormRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="快递单号:" prop="trackingNumber">
          <el-input v-model="sendForm.trackingNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="发货类型:" prop="personalDeliveryClassAid">
          <el-select v-model="sendForm.personalDeliveryClassAid">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递公司:" prop="courierCompany">
          <el-input v-model="sendForm.courierCompany" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendFormModal = false">取 消</el-button>
        <el-button type="primary" @click="sendProduct">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="订单审核"
      :visible.sync="auditModal"
      width="30%"
      top="25vh"
      :before-close="closeAuditModal"
    >
      <el-form
        ref="auditForm"
        :model="auditForm"
        :rules="auditFormRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="订单编号:" prop="code">
          <el-input v-model="auditForm.code" clearable></el-input>
        </el-form-item>
        <el-form-item label="审核状态:" prop="checkState">
          <el-select v-model="auditForm.checkState">
            <el-option label="待审核" value="0">待审核</el-option>
            <el-option label="通过" value="1">通过</el-option>
            <el-option label="不通过" value="2">不通过</el-option>
            <el-option label="订单完成" value="3">订单完成</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditModal = false">取 消</el-button>
        <el-button type="primary" @click="auditOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import moment from 'moment'
  import { orderApi } from '@/api/index'
  let tableData = []
  for (let i = 0; i < 3; i++) {
    tableData.push({
      number: '123321',
      name: '客户1',
      info: '商品',
      from: '电商',
      pay: '支付宝',
      price: '￥1000',
      discountPrice: '￥900',
      payNumber: '￥900',
      quitNumber: i,
      status: i < 5 ? '正常' : '异常',
      ifBorrow: i < 2 ? '是' : '否',
    })
  }

  export default {
    name: 'RoleManage',
    data() {
      return {
        moment,
        params: {
          stateAid: '',
          paymentAid: '',
          timeAdd: '',
          keyword: '',
          page: 1,
          pageRows: 10,
        },
        orderTableData: [],
        entityTableData: [],
        virtualTableData: [],
        entityNum: 0,
        virtualNum: 0,
        sendFormModal: false,
        sendForm: {
          aid: -1,
          trackingNumber: '',
          personalDeliveryClassAid: 1,
          courierCompany: '',
        },
        auditModal: false,
        auditForm: {
          code: '',
          checkState: '0',
        },
        currentPage: 5,
        tableData: tableData,
        activeIndex: '1',
        status: '',
        payMode: '',
        date: '',
        serach: '',
        select: '',
        showModal: false,
        first: true,
        second: false,
        third: false,
        Form: {
          selectType: '',
          deliveryType: '',
          express: '',
          number: '',
        },
        list: [
          {
            title: '订单数量',
            color: 'rgb(254,224,141)',
          },
          {
            title: '订单金额',
            color: 'rgb(149,138,246)',
          },
          {
            title: '今日订单数量',
            color: 'rgb(18,210,105)',
          },
          {
            title: '今日订单金额',
            color: 'rgb(255,144,148)',
          },
        ],
        sendFormRules: {
          trackingNumber: [
            { required: true, message: '请填写快递单号', trigger: 'blur' },
          ],
          personalDeliveryClassAid: [
            { required: true, message: '请选择发货类型', trigger: 'change' },
          ],
          courierCompany: [
            { required: true, message: '请填写快递公司', trigger: 'blur' },
          ],
        },
        auditFormRules: {
          code: [
            { required: true, message: '请填写订单编号', trigger: 'blur' },
          ],
          checkState: [
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ],
        },
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getEntityList()
    },
    methods: {
      //获取实体产品订单
      async getEntityList() {
        const { data } = await orderApi.getEntityOrder(this.params)
        this.entityTableData = data
        this.entityNum = data.length
      },
      //编辑发货
      sendEdit(item) {
        this.sendFormModal = true
        this.sendForm.aid = item.aid
      },
      //确认发货
      sendProduct() {
        this.$refs.sendForm.validate((valid) => {
          if (valid) {
            orderApi.sendEntityOrder(this.sendForm).then((res) => {
              if (res) {
                this.$message({
                  message: res.message,
                  type: 'success',
                })
                this.getEntityList()
                this.closeSendFormModal()
              } else {
                this.$message({
                  message: '接口未返回数据',
                  type: 'warning',
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //关闭发货编辑框
      closeSendFormModal() {
        this.$refs.sendForm.resetFields()
        this.sendFormModal = false
        this.sendForm = {
          aid: -1,
          trackingNumber: '',
          personalDeliveryClassAid: 1,
          courierCompany: '',
        }
      },
      //借记单审核
      audit(item) {
        this.auditModal = true
        this.auditForm.code = item.code
      },
      //审核发货
      auditOrder() {
        this.$refs.auditForm.validate((valid) => {
          if (valid) {
            orderApi.auditEntityLend(this.auditForm).then((res) => {
              if (res) {
                this.$message({
                  message: res.message,
                  type: 'success',
                })
                this.getEntityList()
                this.closeAuditModal()
              } else {
                this.$message({
                  message: '接口未返回数据',
                  type: 'warning',
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //关闭借记单审核框
      closeAuditModal() {
        this.$refs.auditForm.resetFields()
        this.auditModal = false
        this.auditForm = {
          code: '',
          checkState: '0',
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
      showDialog() {
        this.showModal = true
      },
      getArea(area1, area2) {
        if (!area1 && !area2) {
          return '无'
        }
        if (area1) {
          area1 = area1.replace(/,/g, '')
        }
        if (area2) {
          area2 = area2.replace(/,/g, '')
        }
        return area1 + area2
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        if (key == 1) {
          console.log(1)
          this.first = true
          this.second = false
          this.third = false
        } else if (key == 2) {
          console.log(2)
          this.first = false
          this.second = true
          this.third = false
        } else if (key == 3) {
          console.log(3)
          this.first = false
          this.second = false
          this.third = true
        }
      },
    },
  }
</script>
