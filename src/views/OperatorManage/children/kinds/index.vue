<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="op1_title">
        <div class="op1_title_wrapper">
          <div>运营商任务分类</div>
          <div>
            <el-button
              type="success"
              icon="el-icon-plus"
              @click="addOperatorClass"
            >
              添加分类
            </el-button>
          </div>
        </div>
        <div class="Status">
          <el-row>
            <el-col :span="2" class="op1_label" style="padding-top: 5px">
              运营商：
            </el-col>
            <el-col :span="3">
              <el-select v-model="status" placeholder="请选择">
                <el-option label="全部" value="2">全部</el-option>
                <el-option label="启用" value="0">启用</el-option>
                <el-option label="禁用" value="1">禁用</el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="success" icon="el-icon-search" @click="getList">
                搜索
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序值"
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
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="timeAdd" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeAdd).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeLastUpdate"
        label="最后更新时间"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeLastUpdate).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editOperatorClass(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteOperatorClass(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="add ? '添加分类' : '编辑分类'"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
      :before-close="closeShowModal"
    >
      <el-form
        ref="Form"
        :model="Form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序值:" prop="sort">
          <el-input v-model="Form.sort"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <el-radio-group v-model="Form.state">
            <el-radio :label="0" value="0">启用</el-radio>
            <el-radio :label="1" value="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal()">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import { operatorApi } from '@/api/index'
  import moment from 'moment'
  export default {
    name: 'OperatorKinds',
    data() {
      return {
        moment,
        status: '2',
        tableData: [],
        showModal: false,
        add: false,
        Form: {
          aid: -1,
          name: '',
          sort: '',
          state: 0,
        },
        rules: {
          name: [
            { required: true, message: '请填写分类名称', trigger: 'blur' },
          ],
          sort: [{ required: true, message: '请填写排序值', trigger: 'blur' }],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        },
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
      // 获取运营商分类列表
      async getList() {
        const { data } = await operatorApi.getOperatorClass({
          state: this.status,
        })
        if (data) {
          this.tableData = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 添加/编辑运营商分类
      modalConfirm() {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.Form.state = String(this.Form.state)
            operatorApi.updateOperatorClass(this.Form).then((res) => {
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
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      //修改运营商分类状态
      async changeState(row) {
        const params = {
          aid: row.aid,
          state: String(row.state),
        }
        const res = await operatorApi.updateOperatorClassState(params)
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
      //删除运营商分类
      async deleteOperatorClass(row) {
        const res = await operatorApi.delOperatorClass({ aid: row.aid })
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
      addOperatorClass() {
        this.add = true
        this.showModal = true
      },
      editOperatorClass(item) {
        this.add = false
        this.showModal = true
        this.Form = item
      },
      closeShowModal() {
        this.$refs.Form.resetFields()
        this.showModal = false
        this.Form = {
          aid: -1,
          name: '',
        }
      },
    },
  }
</script>
