<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ul_title">
        <div class="ul_title">用户管理</div>
        <div class="ul_buttons">
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="showModal = true"
          >
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
        prop="avatar"
        label="用户头像"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户昵称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="用户类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="count"
        label="余额"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="discount(scope.$index, tableData)"
          >
            指定折扣
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="open(scope.$index, tableData)"
          >
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
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
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

    <!-- 编辑用户 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="真实姓名:" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" required>
          <el-input v-model="Form.number"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="生日:">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="Form.desc" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">取 消</el-button>
        <el-button type="primary" @click="showModal = false">确 定</el-button>
      </span>
    </el-dialog>
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
  import UserDetail from '../../components/userDetail.vue'
  let tableData = []
  for (let i = 0; i < 7; i++) {
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
    name: 'UserList',
    components: { UserDetail },
    data() {
      return {
        tableData: tableData,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        Form: {
          desc: '',
          name: '',
          number: '',
        },
        ChargeForm: {
          add: false,
          count: '',
        },
        showModal: false,
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
    methods: {
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
        }
      },
      handleSizeChange() {},
      handleCurrentChange() {},
    },
  }
</script>
