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
        prop="aid"
        label="序号"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="规格模板名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productSize"
        label="商品规格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productAttr"
        label="商品属性"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="setRow(scope.row)"
          >
            设置
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editRow(scope.row)"
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
    <el-dialog
      :title="add ? '添加模板' : '修改模板'"
      :visible.sync="showModal"
      width="30%"
      top="15vh"
      :before-close="closeShowModal"
    >
      <el-form :model="Form" label-width="120px" label-position="right">
        <el-form-item label="规格名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShowModal">取 消</el-button>
        <el-button type="primary" @click="modalConfirm(add)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置模板 -->
    <el-dialog
      title="模板设置"
      :visible.sync="showSetModal"
      width="60%"
      top="15vh"
      :before-close="closeShowSetModal"
    >
      <el-button type="primary" size="small" @click="addModalInfo">
        添加
      </el-button>
      <el-table border :data="setTableData" stripe style="width: 100%">
        <el-table-column
          prop="gskAid"
          label="规格id"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gskName"
          label="规格名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gsvAid"
          label="规格值id"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gsvName"
          label="规格值"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="editRow(scope.row)"
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
    </el-dialog>
    <!-- 添加编辑规格 -->
    <el-dialog
      :title="addModal ? '添加规格' : '修改规格'"
      :visible.sync="setMoalInfo"
      width="30%"
      top="15vh"
      :before-close="closeSetMoalInfo"
    >
      <el-form :model="setForm" label-width="120px" label-position="right">
        <el-form-item label="规格名称:" prop="name" required>
          <el-input v-model="setForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSetMoalInfo">取 消</el-button>
        <el-button type="primary" @click="modalSetConfirm(addModal)">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <spec-dialog ref="specDialog" />
  </div>
</template>

<script>
  import './index.scss'
  import SpecDialog from './dialog'
  import { physicalProductApi } from '@/api/index'
  export default {
    components: {
      SpecDialog,
    },
    data() {
      return {
        tableData: [],
        setTableData: [],
        searchValue: '',
        Form: {},
        setForm: {},
        showModal: false,
        showSetModal: false,
        setMoalInfo: false,
        add: false,
        addModal: false,
      }
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
      deleteRow(item) {
        console.log(item)
      },
      //添加
      showDialog() {
        // this.$refs.specDialog.showModalBox()
        this.showModal = true
        this.add = true
      },
      // 编辑
      editRow(row) {
        this.Form = row
        this.showModal = true
        this.add = false
      },
      //关闭添加编辑
      closeShowModal() {
        this.Form = {}
        this.showModal = false
      },
      async modalConfirm(add) {
        if (add) {
          this.Form.aid = -1
        }
        console.log(this.Form)
        const res = await physicalProductApi.setEntitySpecification(this.Form)
        if (res) {
          this.getEntitySpecificationList()
          this.closeShowModal()
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
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
          this.setTableData = data
          console.log(this.setTableData, 'data')
          this.showSetModal = true
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
          return
        }
        // let specForm = {
        //   name: '123123',
        //   spec: [
        //     {
        //       name: '22',
        //       values: [
        //         {
        //           value: '3232',
        //         },
        //         {
        //           value: '323',
        //         },
        //       ],
        //     },
        //     {
        //       name: '333',
        //       values: [
        //         {
        //           value: '3333',
        //         },
        //       ],
        //     },
        //   ],
        // }
        // this.$refs.specDialog.showModalBox(specForm)
      },
      //添加规格
      addModalInfo() {
        this.setMoalInfo = true
        this.addModal = true
      },
      //详细关闭
      closeSetMoalInfo() {
        this.setMoalInfo = false
      },
      //设置关闭
      closeShowSetModal() {
        this.showSetModal = false
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
