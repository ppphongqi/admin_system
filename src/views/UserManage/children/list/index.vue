<template>
  <div class="page_wrapper">
    <div class="page_userTitle">
      <div class="ul_title">
        <div class="ul_title">用户管理</div>
        <div class="ul_buttons">
          <el-button type="success" icon="el-icon-plus" @click="addUser">
            添加用户
          </el-button>
        </div>
      </div>
    </div>
    <div class="page_content">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">全部用户</el-menu-item>
        <el-menu-item index="2">微信公众号用户</el-menu-item>
        <el-menu-item index="3">微信小程序用户</el-menu-item>
        <el-menu-item index="4">h5用户</el-menu-item>
      </el-menu>
    </div>
    <el-form label-width="80px" label-position="right">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户搜索:">
                <el-input v-model="params.userName" class="value" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="showMore">
            <el-col :span="6">
              <el-form-item label="昵称:">
                <el-input v-model="params.nickName" class="value" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号:">
                <el-input v-model="params.phone" class="value" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱:">
                <el-input v-model="params.email" class="value" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="showMore">
            <el-col :span="6">
              <el-form-item label="类型:">
                <el-select
                  v-model="params.typeAid"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色:">
                <el-select
                  v-model="params.roleAid"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in roleOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态:">
                <el-select
                  v-model="params.isUsed"
                  placeholder="请选择"
                  clearable
                >
                  <el-option label="可用" value="0">可用</el-option>
                  <el-option label="不可用" value="1">不可用</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <div class="searchBtn">
          <el-button
            type="primary"
            icon="el-icon-search"
            class="submit"
            @click="getList"
          >
            搜索
          </el-button>
          <el-button type="text" @click="showMoreSearch">
            {{ showName }}
            <i
              :class="showMore ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"
            ></i>
          </el-button>
        </div>
      </el-row>
    </el-form>
    <div v-if="first">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="aid" label="ID" align="center"></el-table-column>
        <el-table-column prop="images" label="用户头像" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.images" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="用户昵称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userLevel"
          label="用户等级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="integral"
          label="积分"
          align="center"
        ></el-table-column>
        <el-table-column prop="isUsed" label="用户状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isUsed"
              active-color="rgb(28,134,224)"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="typeAid" label="用户类型" align="center">
          <template slot-scope="scope">
            <span>{{ getTypeName(scope.row.typeAid) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="openId"
          label="用户标识"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ getClassName(scope.row.openId) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">
              编辑
            </el-button>
            <el-dropdown style="margin-left: 10px" @command="detail">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" @click="detail">
                <el-dropdown-item
                  command="用户详情"
                  @click.native="getAid(scope.row)"
                >
                  用户详情
                </el-dropdown-item>
                <el-dropdown-item
                  command="余额充值"
                  @click.native="showChargeModal(scope.row)"
                >
                  余额充值
                </el-dropdown-item>
                <el-dropdown-item
                  command="指定折扣"
                  @click.native="getDiscountAid(scope.row)"
                >
                  指定折扣
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[7, 10, 20]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <div v-if="second">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="aid" label="ID" align="center"></el-table-column>
        <el-table-column prop="images" label="用户头像" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.images" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="用户昵称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userLevel"
          label="用户等级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="integral"
          label="积分"
          align="center"
        ></el-table-column>
        <el-table-column prop="isUsed" label="用户状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isUsed"
              active-color="rgb(28,134,224)"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="typeAid" label="用户类型" align="center">
          <template slot-scope="scope">
            <span>{{ getTypeName(scope.row.typeAid) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="openId"
          label="用户标识"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ getClassName(scope.row.openId) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">
              编辑
            </el-button>
            <el-dropdown style="margin-left: 10px" @command="detail">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" @click="detail">
                <el-dropdown-item
                  command="用户详情"
                  @click.native="getAid(scope.row)"
                >
                  用户详情
                </el-dropdown-item>
                <el-dropdown-item
                  command="余额充值"
                  @click.native="showChargeModal(scope.row)"
                >
                  余额充值
                </el-dropdown-item>
                <el-dropdown-item
                  command="指定折扣"
                  @click.native="getDiscountAid(scope.row)"
                >
                  指定折扣
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[7, 10, 20]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <div v-if="third">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="aid" label="ID" align="center"></el-table-column>
        <el-table-column prop="images" label="用户头像" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.images" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="用户昵称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userLevel"
          label="用户等级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="integral"
          label="积分"
          align="center"
        ></el-table-column>
        <el-table-column prop="isUsed" label="用户状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isUsed"
              active-color="rgb(28,134,224)"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="typeAid" label="用户类型" align="center">
          <template slot-scope="scope">
            <span>{{ getTypeName(scope.row.typeAid) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="openId"
          label="用户标识"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ getClassName(scope.row.openId) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">
              编辑
            </el-button>
            <el-dropdown style="margin-left: 10px" @command="detail">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" @click="detail">
                <el-dropdown-item
                  command="用户详情"
                  @click.native="getAid(scope.row)"
                >
                  用户详情
                </el-dropdown-item>
                <el-dropdown-item
                  command="余额充值"
                  @click.native="showChargeModal(scope.row)"
                >
                  余额充值
                </el-dropdown-item>
                <el-dropdown-item
                  command="指定折扣"
                  @click.native="getDiscountAid(scope.row)"
                >
                  指定折扣
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[7, 10, 20]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <div v-if="fourth">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="aid" label="ID" align="center"></el-table-column>
        <el-table-column prop="images" label="用户头像" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.images" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="用户昵称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userLevel"
          label="用户等级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="integral"
          label="积分"
          align="center"
        ></el-table-column>
        <el-table-column prop="isUsed" label="用户状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isUsed"
              active-color="rgb(28,134,224)"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              @change="changeState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="typeAid" label="用户类型" align="center">
          <template slot-scope="scope">
            <span>{{ getTypeName(scope.row.typeAid) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="openId"
          label="用户标识"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ getClassName(scope.row.openId) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">
              编辑
            </el-button>
            <el-dropdown style="margin-left: 10px" @command="detail">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" @click="detail">
                <el-dropdown-item
                  command="用户详情"
                  @click.native="getAid(scope.row)"
                >
                  用户详情
                </el-dropdown-item>
                <el-dropdown-item
                  command="余额充值"
                  @click.native="showChargeModal(scope.row)"
                >
                  余额充值
                </el-dropdown-item>
                <el-dropdown-item
                  command="指定折扣"
                  @click.native="getDiscountAid(scope.row)"
                >
                  指定折扣
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[7, 10, 20]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑用户 -->
    <el-dialog
      :title="add ? '添加用户' : '编辑用户'"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="用户名称:" required>
          <el-input v-model="Form.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号:" required>
          <el-input v-model="Form.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称:" required>
          <el-input v-model="Form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户头像:" required>
          <el-input v-model="Form.images"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱:" required>
          <el-input v-model="Form.email"></el-input>
        </el-form-item>
        <el-form-item label="用户QQ:">
          <el-input v-model="Form.qq"></el-input>
        </el-form-item>
        <el-form-item label="账户状态:" required>
          <el-radio-group v-model="Form.isUsed">
            <el-radio label="0" value="0">启用</el-radio>
            <el-radio label="1" value="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户权限:" required>
          <el-select v-model="Form.roleAid" placeholder="请选择">
            <el-option
              v-for="item in roleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型:" required>
          <el-select v-model="Form.typeAid" placeholder="请选择">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="折扣详情"
      :visible.sync="showDiscount"
      width="60%"
      top="25vh"
    >
      <el-button
        type="primary"
        style="margin-bottom: 10px"
        @click="addDiscount"
      >
        添加折扣
      </el-button>
      <el-table border :data="discountData" stripe style="width: 100%">
        <el-table-column
          prop="goodsName"
          label="商品名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="discount"
          label="折扣"
          align="center"
        ></el-table-column>
        <el-table-column prop="timeLastUpdate" label="更新时间" align="center">
          <template slot-scope="scope">
            <div>
              {{
                moment(scope.row.timeLastUpdate).format('YYYY-MM-DD HH:mm:ss')
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="setDiscount(scope.row)">
              修改折扣
            </el-button>
            <el-button type="text" size="small" @click="delDiscount(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" required>
        <el-button @click="showDiscount = false">取 消</el-button>
        <el-button type="primary" @click="showDiscount = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="设置折扣"
      :visible.sync="showSetDiscount"
      width="30%"
      top="15vh"
      :before-close="closeSetDiscount"
    >
      <el-form :model="setDiscountForm" label-width="80px">
        <el-form-item v-if="showSetDiscountAdd" label="商品列表" required>
          <el-select v-model="setDiscountForm.goodsAid" placeholder="请选择">
            <el-option
              v-for="item in goodsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣" required>
          <el-input v-model="setDiscountForm.discount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSetDiscount">取 消</el-button>
        <el-button type="primary" @click="setDiscountSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户详情 -->
    <el-dialog
      v-if="showDetail"
      title="用户详情"
      :visible.sync="showDetail"
      width="60%"
      top="10vh"
    >
      <user-detail :user-aid="Number(userAid)"></user-detail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetail = false">取 消</el-button>
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 充值 -->
    <el-dialog
      title="充值"
      :visible.sync="showCharge"
      width="30%"
      top="15vh"
      :before-close="closeShowCharge"
    >
      <el-form :model="ChargeForm" label-width="80px">
        <el-form-item label="充值" required>
          <el-radio-group v-model="ChargeForm.state">
            <el-radio :label="0" value="0">增加</el-radio>
            <el-radio :label="1" value="1">减少</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额" required>
          <el-input v-model="ChargeForm.balance"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowCharge">取 消</el-button>
        <el-button type="primary" @click="setCharge">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import moment from 'moment'
  import { userApi } from '@/api/index'
  import { physicalProductApi } from '@/api/index'
  import UserDetail from '../../components/userDetail.vue'
  export default {
    name: 'UserList',
    components: { UserDetail },
    data() {
      return {
        search: '',
        activeIndex: '1',
        first: true,
        second: false,
        third: false,
        fourth: false,
        moment,
        tableData: [],
        roleAidList: [],
        roleList: [],
        typeOption: [],
        roleOption: [],
        discountData: [],
        goodsOptions: [],
        currentPage: 1,
        total: 1,
        PageSize: 7,
        params: {
          typeAid: '',
          userName: '',
          phone: '',
          nickName: '',
          roleAid: '',
          isUsed: '',
          email: '',
          openId: '0',
          page: '1',
          pageRows: '7',
        },
        Form: {
          aid: -1,
          userName: '',
          phone: '',
          nickName: '',
          images: '',
          email: '',
          qq: '',
          roleAid: '',
          isUsed: '0',
          typeAid: '',
        },
        ChargeForm: {
          aid: -1,
          state: 0,
          balance: '',
        },
        setDiscountForm: {
          aid: -1,
          userAid: '',
          goodsAid: '',
          discount: '',
        },
        userAid: '',
        add: false,
        showModal: false,
        showRole: false,
        showDiscount: false,
        showDetail: false,
        showCharge: false,
        showSetDiscount: false,
        showSetDiscountAdd: false,
        value: '',
        tempUserAid: 0,
        showMore: false,
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      showName: function () {
        if (this.showMore == false) {
          //对文字进行处理
          return '展开'
        } else {
          return '收起'
        }
      },
    },
    mounted() {
      this.getList()
      this.getType()
      this.getRole()
      this.getGoods()
    },
    methods: {
      //获取用户列表
      async getList() {
        const data = await userApi.getUserList(this.params)
        console.log(data, 'data')
        if (data) {
          this.tableData = data.data
          this.total = data.totalRecord
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      showMoreSearch() {
        this.showMore = !this.showMore
      },
      //获取用户类型
      async getType() {
        const { data } = await userApi.getUserTypeList()
        data.forEach((item) => {
          this.typeOption.push({
            value: item.aid,
            label: item.name,
          })
        })
      },
      // 所属类型名称获取
      getTypeName(typeAid) {
        let typeName = ''
        this.typeOption.forEach((v) => {
          if (v.value === typeAid) typeName = v.label
        })
        return typeName
      },
      // 所属分类名称获取
      getClassName(classAid) {
        let className = ''
        if (classAid === 1) {
          className = '非微信用户'
          return className
        } else if (classAid === 0) {
          className = '微信用户'
          return className
        }
      },
      //获取用户权限
      async getRole(page = 1, pageRows = 100) {
        const params = {
          page,
          pageRows,
        }
        const { data } = await userApi.getRoleList(params)
        data.forEach((item) => {
          this.roleOption.push({
            value: item.aid,
            label: item.name,
          })
        })
      },
      //修改用户状态
      async changeState(row) {
        console.log(row)
        const params = {
          aid: row.aid,
        }
        console.log(row.isUsed, '当前')
        if (row.isUsed === '1') {
          params.state = '1'
        } else {
          params.state = '0'
        }
        console.log(params.state, '传递')
        console.log(params, 'params')
        const res = await userApi.editUserState(params)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getList()
        }
      },
      //添加/修改用户信息
      async modalConfirm(flag) {
        this.Form.typeAid = String(this.Form.typeAid)
        this.Form.roleAid = String(this.Form.roleAid)
        if (flag) {
          const res = await userApi.addUser(this.Form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          } else {
            this.$message({
              message: res.message,
              type: 'success',
            })
            this.closeShowModal()
            this.getList()
          }
        } else {
          const res = await userApi.editUser(this.Form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          } else {
            this.$message({
              message: res.message,
              type: 'success',
            })
            this.closeShowModal()
            this.getList()
          }
        }
      },
      //添加用户
      addUser() {
        this.add = true
        this.showModal = true
      },
      //修改用户
      editUser(row) {
        this.add = false
        this.showModal = true
        this.Form = row
      },
      // editUserRole(row) {
      //   this.showRole = true
      //   this.roleAidList = Array.of(row.roleAid)
      // },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: -1,
          userName: '',
          phone: '',
          nickName: '',
          images: '',
          email: '',
          qq: '',
          roleAid: '',
          isUsed: '0',
          typeAid: '',
        }
      },
      open() {
        this.showModal = true
      },
      detail(detail) {
        switch (detail) {
          case '用户详情':
            break
          case '余额充值':
            this.showCharge = true
            break
          case '指定折扣':
            this.showDiscount = true
            break
        }
      },
      //获取用户aid
      getAid(row) {
        this.userAid = row.aid
        this.showDetail = true
      },
      //余额充值
      showChargeModal(row) {
        this.ChargeForm.aid = row.aid
      },
      async setCharge() {
        this.ChargeForm.state = String(this.ChargeForm.state)
        const res = await userApi.changeBalance(this.ChargeForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getList()
          this.closeShowCharge()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      closeShowCharge() {
        this.showCharge = false
        this.ChargeForm = {
          aid: -1,
          state: 0,
          balance: '',
        }
      },
      //获取用户折扣
      async getDiscountAid(row) {
        const { data } = await userApi.getUserDiscount({ aid: row.aid })
        if (data) {
          this.discountData = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
        this.showDiscount = true
        this.tempUserAid = row.aid
      },
      //设置用户折扣
      setDiscount(row) {
        this.showSetDiscount = true
        this.showSetDiscountAdd = false
        this.setDiscountForm = {
          aid: row.aid,
          userAid: row.userAid,
          goodsAid: row.goodsAid,
          discount: row.discount,
        }
      },
      addDiscount() {
        this.showSetDiscount = true
        this.showSetDiscountAdd = true
        this.setDiscountForm.userAid = this.tempUserAid
      },
      async getGoods() {
        const params = {
          page: 1,
          pageRows: 100,
        }
        const { data } = await physicalProductApi.getEntityList(params)
        data.records.forEach((v) => {
          this.goodsOptions.push({
            label: v.name,
            value: v.aid,
          })
        })
      },
      async setDiscountSubmit() {
        const res = await userApi.setUserDiscount(this.setDiscountForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getDiscountAid({ aid: this.tempUserAid })
          this.closeSetDiscount()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      closeSetDiscount() {
        this.showSetDiscount = false
        this.setDiscountForm = {
          aid: -1,
          userAid: '',
          goodsAid: '',
          discount: '',
        }
        this.tempUserAid = 0
      },
      //删除用户折扣
      async delDiscount(row) {
        const res = await userApi.delUserDiscount({ aid: row.aid })
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getDiscountAid({ aid: this.tempUserAid })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      handleSelect(key, keyPath) {
        if (key == 1) {
          this.first = true
          this.second = false
          this.third = false
          this.fourth = false
          this.params.openId = '0'
          this.getList()
        } else if (key == 2) {
          this.first = false
          this.second = true
          this.third = false
          this.fourth = false
          this.params.openId = '1'
          this.getList()
        } else if (key == 3) {
          this.first = false
          this.second = false
          this.third = true
          this.fourth = false
          this.params.openId = '2'
          this.getList()
        } else if (key == 4) {
          this.first = false
          this.second = false
          this.third = false
          this.fourth = true
          this.params.openId = '3'
          this.getList()
        }
      },
      handleSizeChange(val) {
        this.PageSize = val
        this.params.page = 1
        this.params.pageRows = val
        this.getList()
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.params.page = val
        this.params.pageRows = this.PageSize
        this.getList()
      },
    },
  }
</script>
