<template>
  <div class="user_detail">
    <div class="user_detail_title">
      <div class="user_detail_title_left">
        <img class="user_detail_title_left_img" />
      </div>
      <div class="user_detail_title_right">
        <div class="user_detail_title_right_top">用户昵称：</div>
        <div class="user_detail_title_right_down">
          <div class="user_detail_title_right_down_items">余额: 0</div>
          <div class="user_detail_title_right_down_items">总计订单: 0</div>
          <div class="user_detail_title_right_down_items">总消费金额: 0</div>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        prop="code"
        label="订单编号"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="userId"
        label="下订用户ID"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="toUserAid"
        label="商品卖家ID"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="entityAid"
        label="实物商品ID"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="specification"
        label="规格属性"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="discountPrice"
        label="折扣价格"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="quantity"
        label="购买商品数量"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="prices"
        label="总金额"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="isDelete"
        label="是否删除"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ getDelName(scope.row.isDelete) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymentClassAid"
        label="支付类型"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="orderStateAid"
        label="订单状态"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="trackingNumber"
        label="快递单号"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="personalDeliveryClassAid"
        label="发货类型"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="courierCompany"
        label="快递公司"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="addressAid"
        label="收货地址"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="timeLastUpdate"
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
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { userApi } from '@/api/index'
  import moment from 'moment'
  export default {
    name: 'UserDetail',
    props: {
      userAid: {
        type: Number,
        default: null,
      },
    },
    data() {
      return {
        moment,
        currentPage: 1,
        pageSize: 10,
        total: 1,
        tableData: [],
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getList()
    },
    methods: {
      //获取用户详情列表
      async getList(aid = this.userAid, page = 1, pageRows = 7) {
        const params = {
          aid,
          page,
          pageRows,
        }
        const { data } = await userApi.getUserDetails(params)
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
      getDelName(item) {
        let name = ''
        if (item === '1') {
          name = '是'
        } else if (item === '0') {
          name = '否'
        }
        return name
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getList(this.userAid, 1, val)
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(this.userAid, val, this.pageSize)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .user_detail {
    width: 100%;
    height: 550px;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    position: relative;
    &_title {
      height: 100px;
      padding: 0 30px 0 30px;
      display: flex;
      flex-direction: row;
      &_left {
        width: 12%;
        height: 100%;
        // background: red;
        &_img {
          width: 95px;
          height: 95px;
          border-radius: 50%;
          background: pink;
        }
      }
      &_right {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        &_top {
          font-size: 18px;
          font-weight: bolder;
        }
        &_down {
          width: 100%;
          display: flex;
          flex-direction: row;
          &_items {
            margin-right: 150px;
            font-size: 13px;
            color: #999;
          }
        }
      }
    }
  }
</style>
