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
        prop="avatar"
        label="消费记录"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="订单号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="收货人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="商品价格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="count"
        label="商品数量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="count"
        label="实付金额"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="count"
        label="交易时间"
        align="center"
      ></el-table-column>
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
  let tableData = []
  for (let i = 0; i < 4; i++) {
    tableData.push({
      count: i,
      picture: 'image',
      name: '名称',
      avatar: '头像' + i,
      type: '类型',
      phone: '12345678910',
      count: '100.00',
      status: true,
    })
  }
  export default {
    name: 'UserDetail',
    data() {
      return {
        tableData: tableData,
      }
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
