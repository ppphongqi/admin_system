<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">角色管理</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加角色
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
      <el-table-column prop="name" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="permissionClassifyList"
        label="权限"
        align="center"
      ></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="显示"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="compail(scope.row)">
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
        :page-sizes="[7, 10, 20]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      :title="add ? '添加角色' : '编辑角色'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="120px" label-position="right">
        <el-form-item label="身份名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否开启:" prop="state" required>
          <el-radio-group v-model="Form.state">
            <el-radio :label="0" value="0">开启</el-radio>
            <el-radio :label="1" value="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限:" prop="role">
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
  import { roleApi } from '@/api/index'

  export default {
    name: 'RoleManage',
    data() {
      return {
        currentPage: 1,
        PageSize: 7,
        total: 1,
        tableData: [],
        showModal: false,
        add: false,
        Form: {
          aid: '',
          name: '',
          state: 0,
        },
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
      this.getPerList()
      this.getTableData()
    },
    methods: {
      // 获取权限列表
      async getPerList() {
        const { data } = await roleApi.getPerList()
        const list = []
        // 接口格式转换tree格式
        data.forEach((item) => {
          if (item.permissionList !== []) {
            let children = []
            item.permissionList.forEach((data) => {
              children.push({
                id: data.aid,
                label: data.anotherName,
              })
            })
            let obj = {
              id: item.aid,
              label: item.name,
              children,
            }
            list.push(obj)
          } else {
            let obj = {
              id: item.aid,
              label: item.name,
            }
            list.push(obj)
          }
        })
        this.data = [...list]

        console.log(data, 'res')
      },
      // 获取选中树结构选中项
      getCheckedNodes() {
        return this.$refs.tree.getCheckedNodes()
        // console.log(this.$refs.tree.getCheckedNodes())
      },
      async modalConfirm(flag) {
        const preList = this.getCheckedNodes()
        const list = []
        preList.forEach((item) => {
          list.push(item.id)
        })
        // flag确定是新增还是修改
        if (flag) {
          let form = {
            aid: -1,
            name: this.Form.name,
            sort: 1,
            roleUserRoleDTOList: list,
          }
          const res = await roleApi.addRole(form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        } else {
          let form = {
            aid: this.Form.aid,
            name: this.Form.name,
            sort: 1,
            roleUserRoleDTOList: list,
          }
          const res = await roleApi.addRole(form)
          if (!res) {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        }
        // this.showModal = false
        // this.getCheckedNodes()
      },
      // 获取表格数据
      async getTableData(page = 1, pageRows = 7) {
        const params = {
          page,
          pageRows,
        }
        const data = await roleApi.getList(params)
        console.log(data)
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
      //修改状态
      async changeState(row) {
        console.log(row)
        const params = {
          aid: row.aid,
        }
        if (row.state) {
          params.state = 1
        } else {
          params.state = 0
        }
        console.log(params, 'params')
        const res = await roleApi.changeRoleState(params)
        if (!res) {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        } else {
          console.log(res, 'res')
          this.getTableData()
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
      deleteRow(item) {
        console.log(item)
      },
      // 添加
      showDialog() {
        this.add = true
        this.showModal = true
      },
      // 编辑
      compail(row) {
        this.add = false
        this.showModal = true
        this.Form = {
          aid: row.aid,
          name: row.name,
          state: row.state,
        }
      },
      closeShowModal() {
        this.showModal = false
        this.Form = {
          name: '',
          state: 0,
        }
      },
    },
  }
</script>
