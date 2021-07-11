<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <el-form :inline="true" label-width="100px" label-position="right">
          <el-form-item label="商品名称:" style="margin-bottom: 0px">
            <el-select
              v-model="value1"
              style="width: 240px"
              placeholder="请选择"
              align-items="center"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型:" style="margin-bottom: 0px">
            <el-select
              v-model="value2"
              style="width: 240px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称:" style="margin-bottom: 0px">
            <el-row>
              <el-col>
                <el-input v-model="value3" style="width: 240px"></el-input>
                <el-button
                  style="width: 60px"
                  type="primary"
                  icon="el-icon-search"
                  @click="search"
                ></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div class="ck_buttons">
          <el-button type="success" icon="el-icon-plus" @click="showDialogAdd">
            添加商品
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
        label="产品名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        align="center"
      ></el-table-column>
      <el-table-column prop="state" label="商品状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state == 0">在售</div>
          <div v-else>下架</div>
        </template>
      </el-table-column>
      <el-table-column prop="timeAdd" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>{{ moment(scope.row.timeAdd).format('YYYY-MM-DD') }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="isDistribution"
        label="是否分销商品"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.isDistribution == '0'"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="是"
          ></el-switch>
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 增加实物产品-->
    <el-dialog
      title="增加实物产品"
      :visible.sync="showModalAdd"
      width="30%"
      top="25vh"
    >
      <el-form :model="Form" label-width="100px" label-position="right">
        <el-form-item label="商品名称:" prop="name" required>
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类:" prop="classAid" required>
          <el-select v-model="Form.classAid" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.name"
              :value="item.aid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格:" prop="price" required>
          <el-input v-model="Form.price"></el-input>
        </el-form-item>
        <el-form-item label="是否上架:" prop="state" required>
          <el-switch v-model="Form.state"></el-switch>
        </el-form-item>
        <el-form-item label="是否分销:" prop="isDistribution" required>
          <el-switch v-model="Form.isDistribution"></el-switch>
        </el-form-item>
        <el-form-item label="排序值:" prop="sort" align="center">
          <el-input v-model="Form.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalAdd = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑实物产品-->
    <el-dialog
      title="编辑分类"
      :visible.sync="showModalEdit"
      width="30%"
      top="25vh"
    >
      <el-form :model="chooseItem" label-width="100px" label-position="right">
        <el-form-item label="商品名称:" prop="name" required>
          <el-input v-model="chooseItem.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类:" prop="classAid" required>
          <el-select v-model="chooseItem.classAid" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.name"
              :value="item.aid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格:" prop="price" required>
          <el-input v-model="chooseItem.price"></el-input>
        </el-form-item>
        <el-form-item label="是否上架:" prop="state" required>
          <el-switch v-model="chooseItem.state"></el-switch>
        </el-form-item>
        <el-form-item label="是否分销:" prop="isDistribution" required>
          <el-switch v-model="chooseItem.isDistribution"></el-switch>
        </el-form-item>
        <el-form-item label="排序值:" prop="sort" align="center">
          <el-input v-model="chooseItem.sort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalEdit = false">取 消</el-button>
        <el-button type="primary" @click="editorConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import moment from 'moment'
  import { physicalProductApi } from '@/api/index'
  export default {
    data() {
      return {
        value: '',
        value1: '',
        value2: '',
        value3: '',
        options1: [
          {
            value: '商品1',
            label: '商品1',
          },
          {
            value: '商品2',
            label: '商品2',
          },
        ],
        options2: [
          {
            value: '类型1',
            label: '类型1',
          },
          {
            value: '类型2',
            label: '类型2',
          },
        ],
        currentPage: 5,
        showModalAdd: false,
        showModalEdit: false,
        // 新增Form
        Form: {
          aid: -1,
          name: '',
          classAid: '',
          price: '',
          state: false,
          isDistribution: false,
          sort: 100,
        },
        tableData: [],
        moment,
        chooseItem: {},
        // 分类
        typeList: [],
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD')
      },
    },
    mounted() {
      // 获取表格数据
      this.getData()

      // 获取分类列表
      this.getTypeList()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      showDialogAdd() {
        this.showModalAdd = true
      },
      showDialogEdit(item) {
        this.chooseItem = item
        this.chooseItem.state == '0'
          ? (this.chooseItem.state = true)
          : (this.chooseItem.state = false)
        this.chooseItem.isDistribution == '0'
          ? (this.chooseItem.isDistribution = true)
          : (this.chooseItem.isDistribution = false)
        this.showModalEdit = true
      },
      deleteRow(item) {
        console.log(item)
      },
      search() {
        console.log('检索')
      },
      async getData(page = 1, pageRows = 10) {
        const params = {
          page,
          pageRows,
        }
        const { data } = await physicalProductApi.getEntityList(params)
        this.tableData = data.records
      },
      async getTypeList(page = '1', pageRows = '100', name = '') {
        const params = {
          page,
          pageRows,
          name,
        }
        const { data } = await physicalProductApi.getEntityClassList(params)
        this.typeList = data.records
        console.log(this.typeList, 'typeList')
      },

      // 确认添加
      async addConfirm() {
        if (this.Form.state == true) {
          this.Form.state = 0
        } else {
          this.Form.state = 1
        }
        if (this.Form.isDistribution == true) {
          this.Form.isDistribution = 0
        } else {
          this.Form.isDistribution = 1
        }
        const { aid, name, classAid, price, state, isDistribution, sort } =
          this.Form
        const { data, message } = await physicalProductApi.addEntity({
          aid,
          name,
          classAid,
          price,
          state,
          isDistribution,
          sort,
        })
        if (message == '成功') {
          this.$message({
            message: '新增成功',
            type: 'success',
          })
          this.showModalAdd = false
          this.getData()
        } else {
          this.$message.error('新增失败')
        }
      },

      // 编辑确认
      async editorConfirm() {
        const params = this.chooseItem
        params.state ? (params.state = 0) : (params.state = 1)
        params.isDistribution
          ? (params.isDistribution = 0)
          : (params.isDistribution = 1)
        const { data, message } = await physicalProductApi.addEntity(params)
        if (message == '成功') {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.getData()
          this.showModalEdit = false
        } else {
          this.$message.error('修改失败')
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
