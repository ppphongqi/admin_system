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
        <el-menu-item index="1">全部订单(1205)</el-menu-item>
        <el-menu-item index="2">实物产品(1205)</el-menu-item>
        <el-menu-item index="3">虚拟产品(1205)</el-menu-item>
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
          prop="ifBorrow"
          label="是否是借货单"
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
          prop="payNumber"
          label="实付"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.ifBorrow == '是'"
              type="text"
              size="small"
            >
              审核
            </el-button>
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
    </div>
    <el-dialog
      title="订单发货"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="选择类型:" prop="selectType" required>
          <el-select v-model="Form.selectType">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货类型:" prop="deliveryType" required>
          <el-select v-model="Form.deliveryType">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递公司:" prop="express" required>
          <el-select v-model="Form.express">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号:" prop="number">
          <el-input v-model="Form.number"></el-input>
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
  console.log(tableData)

  export default {
    name: 'RoleManage',
    data() {
      return {
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
      three() {
        console.log(3)
        this.first = false
        this.second = false
        this.third = true
      },
    },
  }
</script>
