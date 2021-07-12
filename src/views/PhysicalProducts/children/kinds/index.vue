<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <el-form
          :inline="true"
          label-width="100px"
          label-position="right"
        ></el-form>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showAdd">
            添加分类
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
        prop="name"
        label="商品分类名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序值"
        align="center"
      ></el-table-column>
      <el-table-column prop="time_add" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>{{ moment(scope.row.time_add).format('YYYY-MM-DD') }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="time_last_update"
        label="最后更新时间"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{ moment(scope.row.time_last_update).format('YYYY-MM-DD') }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
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

    <!-- 增加实物产品-->
    <el-dialog
      title="增加实物产品分类"
      :visible.sync="showModalAdd"
      width="30%"
      top="25vh"
    >
      <el-form :model="addForm" label-width="100px" label-position="right">
        <el-form-item label="分类名称:" prop="name" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="number" align="center">
          <el-input v-model="addForm.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalAdd = false">取 消</el-button>
        <el-button type="primary" @click="addKinds">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑实物产品-->
    <el-dialog
      title="编辑实物产品分类"
      :visible.sync="editorShow"
      width="30%"
      top="25vh"
    >
      <el-form :model="chooseItem" label-width="100px" label-position="right">
        <el-form-item label="分类名称:" prop="name" required>
          <el-input v-model="chooseItem.name"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="number" align="center">
          <el-input v-model="chooseItem.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editorShow = false">取 消</el-button>
        <el-button type="primary" @click="editorItem">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示 -->
    <el-dialog title="提示" :visible.sync="deleteShow" width="30%">
      <span>确定删除该分类？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { physicalProductApi } from '@/api/index'
  import moment from 'moment'
  import './index.scss'
  export default {
    name: 'PhsicalKinds',
    data() {
      return {
        // 删除确认框
        deleteShow: false,
        // 添加框
        showModalAdd: false,
        // 编辑框
        editorShow: false,
        // 选中项
        chooseItem: {},
        addForm: {
          name: '',
          sort: '100',
        },
        tableData: [],
        moment,
        editor: false,
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      showAdd() {
        this.showModalAdd = true
      },
      // 获取分类列表
      async getData(page = '1', pageRows = '7', name = '') {
        const params = {
          page,
          pageRows,
          name,
        }
        const { data } = await physicalProductApi.getEntityClassList(params)
        this.tableData = data.records
      },
      // 添加分类
      async addKinds() {
        if (!this.editor) {
          this.addForm.aid = '-1'
        }
        const { data, message } = await physicalProductApi.addEntityClass(
          this.addForm
        )
        if (message !== '成功' || !message) {
          this.$message.error('接口请求失败')
          return
        }
        this.$message({
          message: '新增成功',
          type: 'success',
        })
        this.showModalAdd = false
        this.getData(1, 7)
      },
      // 删除分类
      async deleteItem() {
        const { aid } = this.chooseItem
        const params = {
          aid,
        }
        const { data, message } = await physicalProductApi.delEntityClass(
          params
        )
        if (message == '成功') {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.deleteShow = false
        } else {
          this.$message.error('删除失败')
        }
        this.getData(1, 7)
      },
      showDialogEdit(item) {
        this.chooseItem = item
        this.editorShow = true
        console.log(this.chooseItem)
      },
      async editorItem() {
        const { aid, name, sort } = this.chooseItem
        const params = { aid, name, sort }
        const { data, message } = await physicalProductApi.addEntityClass(
          params
        )
        if (message == '成功') {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.getData(1, 7)
          this.editorShow = false
        } else {
          this.$message.error('修改失败')
        }
      },
      deleteRow(item) {
        this.chooseItem = item
        this.deleteShow = true
      },
    },
  }
</script>

<style lang="scss" scoped></style>
