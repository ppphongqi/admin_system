<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ti_title">
        <div class="ti_title_wrapper">
          <div>运营商任务</div>
          <div class="ti_buttons">
            <el-button type="success" icon="el-icon-plus" @click="showDialog">
              添加
            </el-button>
          </div>
        </div>
        <div class="infoSearch">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              名称：
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="searchName"
                placeholder="请输入内容"
                class="input-with-select"
              ></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="infoSearch">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              运营商：
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchOperator" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="infoSearch">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              业务分类：
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchClass" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="infoSearch">
          <el-row>
            <el-col :span="2" class="ti_label" style="padding-top: 5px">
              任务状态：
            </el-col>
            <el-col :span="3">
              <el-select v-model="searchstate" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="infoSearch">
          <div class="ti_label">
            <el-button type="success" icon="el-icon-search">搜索</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        label="序号"
        type="selection"
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
          <el-image :src="scope.row.icon" fit="fill"></el-image>
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
      ></el-table-column>
      <el-table-column
        prop="mission_service_class_aid"
        label="业务类型"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="url"
        label="路径"
        width="150"
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
        width="100"
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
        width="150"
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
            {{ moment(scope.row.effective_start_time).format('YYYY-MM-DD') }}
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
            {{ moment(scope.row.effective_end_time).format('YYYY-MM-DD') }}
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
            {{ moment(scope.row.time_add).format('YYYY-MM-DD') }}
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
    <!-- 添加/编辑-->
    <el-dialog
      :title="add ? '添加域名' : '编辑域名'"
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
  import { operatorApi } from '@/api/index'
  import moment from 'moment'
  import './index.scss'
  export default {
    name: 'DomainName',
    data() {
      return {
        moment,
        tableData: [],
        Form: {},
        showModal: false,
        add: false,
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD')
      },
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取域名列表
      async getList(page = 1, pageRow = 10, isAllArgsSelect = -1) {
        const params = {
          page,
          pageRow,
          isAllArgsSelect,
        }
        const { data } = await operatorApi.getOperatorList(params)
        this.tableData = data.records
      },
      //添加弹出
      showAdd() {
        this.showModal = true
        this.add = true
      },
      //编辑弹出
      showDialogEdit(row) {
        this.showModal = true
        this.add = false
        this.Form = {
          aid: row.aid,
          domainName: row.domain_name,
          state: row.state,
        }
      },
      //添加编辑
      async modalConfirm(flag) {
        if (this.Form.state === 1) {
          this.Form.state = '1'
        } else {
          this.Form.state = '0'
        }
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
      //关闭弹出
      closeShowModal() {
        this.showModal = false
        this.Form = {
          aid: -1,
          domainName: '',
          state: 1,
        }
      },
      //删除
      async deleteRow(row) {
        const res = await sysApi.delDomain({ aid: row.aid })
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
        const res = await sysApi.changeDomainState({ aid: row.aid })
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
    },
  }
</script>

<style lang="scss" scoped></style>
