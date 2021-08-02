<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ul_title">
        <div class="ul_title">用户管理</div>
        <div class="ul_buttons">
          <el-button type="success" icon="el-icon-plus" @click="addUser">
            添加用户
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
        prop="userName"
        label="用户名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="images" label="用户头像" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.images" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="用户昵称"
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
      <el-table-column
        prop="typeAid"
        label="用户类型"
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="openId"
        label="用户标识"
        align="center"
      ></el-table-column>
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
              <el-dropdown-item command="用户详情">用户详情</el-dropdown-item>
              <el-dropdown-item command="余额充值">余额充值</el-dropdown-item>
              <el-dropdown-item command="指定折扣">指定折扣</el-dropdown-item>
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
    <!-- 角色
    <el-dialog title="角色" :visible.sync="showRole" width="30%" top="25vh">
      <el-checkbox-group v-model="roleAidList">
        <el-checkbox
          v-for="(item, index) in roleList"
          :key="index"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRole = false">取 消</el-button>
        <el-button type="primary" @click="changeRole">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 指定折扣 -->
    <el-dialog
      title="指定折扣"
      :visible.sync="showDiscount"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="商品分类:" required>
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="具体折扣:" required>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer" required>
        <el-button @click="showModal = false">取 消</el-button>
        <el-button type="primary" @click="showModal = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户详情 -->
    <el-dialog
      title="用户详情"
      :visible.sync="showDetail"
      width="60%"
      top="10vh"
    >
      <user-detail></user-detail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetail = false">取 消</el-button>
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 充值 -->
    <el-dialog title="充值" :visible.sync="showCharge" width="30%" top="15vh">
      <el-form :model="ChargeForm" label-width="80px">
        <el-form-item label="充值" required>
          <el-radio-group v-model="ChargeForm.add">
            <el-radio label="增加"></el-radio>
            <el-radio label="减少"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额" required>
          <el-input v-model="ChargeForm.count"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCharge = false">取 消</el-button>
        <el-button type="primary" @click="showCharge = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { userApi } from '@/api/index'
  import UserDetail from '../../components/userDetail.vue'
  import { List } from 'echarts'
  export default {
    name: 'UserList',
    components: { UserDetail },
    data() {
      return {
        tableData: [],
        roleAidList: [],
        roleList: [],
        typeOption: [],
        roleOption: [],
        currentPage: 1,
        total: 1,
        PageSize: 7,
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
          add: false,
          count: '',
        },
        add: false,
        showModal: false,
        showRole: false,
        showDiscount: false,
        showDetail: false,
        showCharge: false,
        value: '',
        options: [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
            disabled: true,
          },
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项4',
            label: '龙须面',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
        ],
        data: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                    id: 9,
                    label: '三级 1-1-1',
                  },
                  {
                    id: 10,
                    label: '三级 1-1-2',
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              {
                id: 5,
                label: '二级 2-1',
              },
              {
                id: 6,
                label: '二级 2-2',
              },
            ],
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              {
                id: 7,
                label: '二级 3-1',
              },
              {
                id: 8,
                label: '二级 3-2',
              },
            ],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
      }
    },
    mounted() {
      this.getList()
      this.getType()
      this.getRole()
    },
    methods: {
      //获取用户列表
      async getList(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const data = await userApi.getUserList(params)
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
      discount() {
        this.showDiscount = true
      },
      detail(detail) {
        switch (detail) {
          case '用户详情':
            this.showDetail = true
            break
          case '余额充值':
            this.showCharge = true
            break
          case '指定折扣':
            this.showDiscount = true
            break
        }
      },
      handleSizeChange(val) {
        this.PageSize = val
        this.getList(1, val)
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(val, this.PageSize)
      },
    },
  }
</script>
