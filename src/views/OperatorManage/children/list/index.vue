<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="op2_title">
        <div class="op2_title_wrapper">
          <div>运营商任务列表</div>
          <div>
            <el-button type="success" icon="el-icon-plus" @click="showDialog">
              添加任务
            </el-button>
          </div>
        </div>
        <div class="op2_search">
          <el-row>
            <el-col :span="0.5" class="op2_label" style="padding-top: 5px">
              aid：
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="params.aid"
                placeholder="请输入内容"
                class="input-with-select"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="1" class="op2_label" style="padding-top: 5px">
              名称：
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="params.name"
                placeholder="请输入内容"
                class="input-with-select"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="1.5" class="op2_label" style="padding-top: 5px">
              运营商：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.operatorsAid"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in operatorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1.5" class="op2_label" style="padding-top: 5px">
              业务分类：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.missionServiceClassAid"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in operatorClass"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1.5" class="op2_label" style="padding-top: 5px">
              任务状态：
            </el-col>
            <el-col :span="3">
              <el-select
                v-model="params.isDisplay"
                placeholder="请选择"
                clearable
              >
                <el-option label="显示" value="0">显示</el-option>
                <el-option label="关闭" value="1">关闭</el-option>
              </el-select>
            </el-col>
            <el-button
              type="success"
              icon="el-icon-search"
              style="margin-left: 20px"
              @click="getList"
            >
              搜索
            </el-button>
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
        label="名称"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column prop="icon" label="图标" align="center" width="150">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.icon"
            :preview-src-list="[scope.row.icon]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序值"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="operators_aid"
        label="运营商"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ getOperatorName(scope.row.operators_aid) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mission_service_class_aid"
        label="业务类型"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>
            {{ getOperatorClassName(scope.row.mission_service_class_aid) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="路径"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="qr_code"
        label="二维码路径"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="佣金"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="is_display"
        label="状态"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_display"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭"
            :active-value="0"
            :inactive-value="1"
            @change="changeStep(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="info"
        label="简述"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="details"
        label="详情"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="mission_duration"
        label="任务时长"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="effective_start_time"
        label="任务有效期开始时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{
              moment(scope.row.effective_start_time).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="effective_end_time"
        label="任务有效期结束时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <div>
            {{
              moment(scope.row.effective_end_time).format('YYYY-MM-DD HH:mm:ss')
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time_add"
        label="新增时间"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.time_add).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showDialogEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">
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
    <!-- 添加/编辑-->
    <el-dialog
      :title="add ? '添加运营商任务' : '编辑运营商任务'"
      :visible.sync="showModal"
      width="30%"
      top="25vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="域名:" prop="domainName" required>
          <el-input v-model="Form.domainName"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="state" required>
          <el-radio-group v-model="Form.state">
            <el-radio :label="0" value="0">开启</el-radio>
            <el-radio :label="1" value="1">关闭</el-radio>
          </el-radio-group>
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
  import { operatorApi, virtualProductApi } from '@/api/index'
  import moment from 'moment'
  import './index.scss'
  export default {
    name: 'DomainName',
    data() {
      return {
        moment,
        tableData: [],
        operatorList: [],
        operatorClass: [],
        Form: {},
        showModal: false,
        add: false,
        currentPage: 1,
        total: 1,
        PageSize: 10,
        params: {
          aid: '',
          name: '',
          operatorsAid: '',
          missionServiceClassAid: '',
          isDisplay: '',
          page: 1,
          pageRow: 10,
          isAllArgsSelect: 1,
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
      this.getOperatorList()
      this.getOperatorClass()
    },
    methods: {
      // 获取列表
      async getList() {
        if (
          this.params.aid !== '' ||
          this.params.name !== '' ||
          this.params.operatorsAid !== '' ||
          this.params.missionServiceClassAid !== '' ||
          this.params.isDisplay !== ''
        ) {
          this.params.isAllArgsSelect = -1
        }
        const { data } = await operatorApi.getOperatorList(this.params)
        if (data) {
          this.tableData = data.records
          this.total = data.records.length
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      // 获取运营商列表
      async getOperatorList() {
        const { data } = await virtualProductApi.getOperator()
        if (data) {
          data.forEach((v) => {
            this.operatorList.push({
              label: v.name,
              value: v.aid,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //获取运营商名称
      getOperatorName(item) {
        let name = []
        if (this.operatorList.length > 0) {
          this.operatorList.forEach((v) => {
            if (item === v.value) name.push(v.label)
          })
        }
        return name.toString()
      },
      // 获取业务分类列表
      async getOperatorClass() {
        const { data } = await operatorApi.getOperatorClass({
          state: '0',
        })
        if (data) {
          data.forEach((v) => {
            this.operatorClass.push({
              label: v.name,
              value: v.aid,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //获取业务分类名称
      getOperatorClassName(item) {
        let name = []
        if (this.operatorClass.length > 0) {
          this.operatorClass.forEach((v) => {
            if (item === v.value) name.push(v.label)
          })
        }
        return name.toString()
      },
      //添加弹出
      showDialog() {
        this.showModal = true
        this.add = true
      },
      //编辑弹出
      showDialogEdit(row) {
        this.showModal = true
        this.add = false
        this.Form = row
      },
      //关闭弹出
      closeShowModal() {
        this.showModal = false
        this.Form = {}
      },
      //添加编辑
      async modalConfirm(flag) {
        const res = await sysApi.updateDomain(this.Form)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.closeShowModal()
          this.getList()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //删除
      async deleteRow(row) {
        // const res = await operatorApi.delOperatorList({ aid: row.aid })
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getList()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //状态切换
      async changeStep(row) {
        let form = {
          aid: row.aid,
          state: String(row.state),
        }
        const res = await operatorApi.updateOperatorState(form)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getList()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      handleSizeChange(val) {
        this.PageSize = val
        this.params.pageRow = val
        this.getList()
        this.currentPage = 1
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.params.page = val
        this.params.pageRow = this.PageSize
        this.getList()
      },
    },
  }
</script>
