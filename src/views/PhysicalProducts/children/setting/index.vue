<template>
  <div class="page_wrapper">
    <div class="page_title" style="margin-bottom: 0px">
      <div class="ck_title">
        <div class="ck_title">规格设置</div>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialog">
            添加规格
          </el-button>
        </div>
      </div>
    </div>
    <div class="page_search">
      <el-form label-width="60px" label-position="left">
        <el-form-item label="搜索:">
          <el-input v-model="searchValue" style="width: 220px"></el-input>
          <el-button
            style="width: 60px"
            type="primary"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="规格模板名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="timeAdd" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeAdd).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time_last_update" label="更新时间" align="center">
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.timeLastUpdate).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            type="text"
            size="small"
            @click.native.prevent="setRow(scope.row)"
          >
            设置
          </el-button> -->
          <el-button
            type="text"
            size="small"
            @click.native.prevent="setRow(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <spec-dialog ref="specDialog" />
  </div>
</template>

<script>
  import './index.scss'
  import SpecDialog from './dialog'
  import { physicalProductApi } from '@/api/index'
  import moment from 'moment'
  export default {
    components: {
      SpecDialog,
    },
    data() {
      return {
        moment,
        tableData: [],
        setTableData: [],
        searchValue: '',
        Form: {},
        setForm: {},
        showModal: false,
        showSetModal: false,
        setMoalInfo: false,
        add: true,
        source: true,
        addModal: false,
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getEntitySpecificationList()
    },
    methods: {
      // 获取列表
      async getEntitySpecificationList() {
        const { data } = await physicalProductApi.getEntitySpecification()
        if (data) {
          this.tableData = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //删除
      async deleteRow(item) {
        const res = await physicalProductApi.delEntitySpecification({
          aid: item.aid,
        })
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getEntitySpecificationList()
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //添加
      showDialog() {
        this.$refs.specDialog.showModalBox(this.source, this.add)
      },
      search() {
        console.log('检索')
      },
      //设置
      async setRow(row) {
        const { data } = await physicalProductApi.getEntitySpecificationInfo({
          aid: row.aid,
        })
        if (data) {
          let List = []
          data.forEach((v) => {
            if (v.gskName === null) {
              List = []
            } else {
              List.push({
                gskAid: v.gskAid,
                name: v.gskName,
                gsvAid: v.gsvAid,
                value: v.gsvName,
              })
            }
          })
          let obj = {}
          List.forEach((v) => {
            let { gskAid, name } = v
            if (!obj[name]) {
              obj[name] = {
                gskAid,
                name,
                values: [],
              }
            }
            obj[name].values.push({ gsvAid: v.gsvAid, value: v.value })
          })
          let info = Object.values(obj) //转换成功的数据
          let specForm = {
            gsAid: row.aid,
            name: row.name,
            spec: info,
          }
          this.$refs.specDialog.showModalBox(this.source, !this.add, specForm)
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
          return
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .spec {
    margin-bottom: 12px;
    span.title {
      width: auto;
      min-width: 48px;
    }
    .el-input {
      width: 88px;
      margin-right: 12px;
      .el-input__inner {
        padding: 0 6px;
      }
    }
  }
</style>
