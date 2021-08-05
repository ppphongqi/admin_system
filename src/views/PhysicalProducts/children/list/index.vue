<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <el-form
          :inline="true"
          :model="prodQuery"
          label-width="88px"
          label-position="right"
        >
          <el-form-item
            label="商品名称:"
            prop="name"
            style="margin-bottom: 0px"
          >
            <el-input
              v-model="prodQuery.name"
              clearable
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品分类:"
            prop="classAid"
            style="margin-bottom: 0px"
          >
            <el-select
              v-model="prodQuery.classAid"
              clearable
              style="width: 180px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeList"
                :key="item.aid"
                :label="item.name"
                :value="item.aid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" prop="state" style="margin-bottom: 0px">
            <el-select
              v-model="prodQuery.state"
              clearable
              style="width: 160px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="分销:"
            prop="isDistribution"
            style="margin-bottom: 0px"
          >
            <el-select
              v-model="prodQuery.isDistribution"
              clearable
              style="width: 160px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in distributionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="ck_buttons">
          <el-button
            style="width: 60px"
            type="primary"
            icon="el-icon-search"
            @click="search"
          ></el-button>
          <el-button type="success" icon="el-icon-plus" @click="showDialogAdd">
            添加商品
          </el-button>
        </div>
      </div>
    </div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column
        type="index"
        width="55"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        min-width="100"
        prop="name"
        label="产品名称"
        align="center"
      ></el-table-column>
      <el-table-column
        min-width="80"
        prop="coverPicture"
        label="产品图片"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 64px; height: 64px"
            :src="scope.row.coverPicture"
            :preview-src-list="[scope.row.coverPicture]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        min-width="80"
        prop="classAid"
        label="所属分类"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ getClassName(scope.row.classAid) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="80"
        prop="price"
        label="价格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="规格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="state"
        label="商品状态"
        align="center"
        min-width="88"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.state == '0'">在售</div>
          <div v-else>下架</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeAdd"
        label="创建时间"
        align="center"
        min-width="88"
      >
        <template slot-scope="scope">
          <div>{{ moment(scope.row.timeAdd).format('YYYY-MM-DD') }}</div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="88"
        prop="isDistribution"
        label="是否分销"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDistribution"
            active-color="rgb(28,134,224)"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            :active-value="'0'"
            :inactive-value="'1'"
            @change="editistribution(scope.row, $event)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        min-width="120"
        prop="introduction"
        label="描述"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="120"
      >
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
            @click="showDialogEditDetail(scope.row)"
          >
            详情
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
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 编辑实物产品-->
    <el-dialog
      :title="'编辑商品：' + chooseItem.name"
      :visible.sync="showModalEdit"
      style="margin-top: 20px"
      :before-close="closeDialog"
      top
    >
      <el-form
        :model="chooseItem"
        label-width="100px"
        :rules="ruleValidate"
        label-position="right"
      >
        <el-form-item label="商品名称:" prop="name" required>
          <el-input v-model="chooseItem.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类:" prop="classAid" required>
          <el-select v-model="chooseItem.classAid" placeholder="请选择商品分类">
            <el-option
              v-for="item in typeList"
              :key="item.aid"
              :label="item.name"
              :value="item.aid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位：" prop="unit">
          <el-input v-model="chooseItem.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="商品简介：" prop="introduction">
          <el-input
            v-model="chooseItem.introduction"
            type="textarea"
            maxlength="250"
            :rows="3"
            placeholder="请输入商品简介"
          />
        </el-form-item>
        <el-form-item label="商品封面图：" prop="coverPicture">
          <el-upload
            action="#"
            list-type="picture-card"
            :multiple="false"
            :auto-upload="false"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品规格" prop="specificationAid">
          <div class="acea-row">
            <el-select
              v-model="chooseItem.specificationAid"
              placeholder="请选择"
              class="selWidthd mr20"
            >
              <el-option
                v-for="item in specificationList"
                :key="item.aid"
                :label="item.name"
                :value="item.aid"
              />
            </el-select>
            <el-button class="mr15" @click="addTem">添加产品规格</el-button>
          </div>
        </el-form-item>
        <el-form-item label="商品状态" prop="state">
          <el-radio-group v-model="chooseItem.state">
            <el-radio label="0" class="radio">在售</el-radio>
            <el-radio label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分销商品" prop="isDistribution">
          <el-radio-group v-model="chooseItem.isDistribution">
            <el-radio label="0" class="radio">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input
            v-model="chooseItem.sort"
            style="width: 360px"
            placeholder="请输入排序"
          />
        </el-form-item>
        <el-form-item label="商品价格:" prop="price">
          <el-input v-model="chooseItem.price"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalEdit = false">取 消</el-button>
        <el-button type="primary" @click="editorConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 图片预览放大查看 -->
    <el-dialog :visible.sync="dialogProdImgVisible" :before-close="closeDialog">
      <img width="100%" :src="dialogProdImageUrl" alt="" />
    </el-dialog>

    <!-- 商品详情查看编辑 -->
    <el-dialog
      :title="'编辑商品详情：' + chooseItem.name"
      :visible.sync="showModalEditDetail"
      style="margin-top: 20px"
      :before-close="closeDialog"
      top
    >
      <vab-quill v-model="content" :min-height="400"></vab-quill>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModalEditDetail = false">取 消</el-button>
        <el-button type="primary" @click="editorDetailConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import './index.scss'
  import moment from 'moment'
  import vabQuill from '@/plugins/vabQuill'
  import { physicalProductApi } from '@/api/index'
  export default {
    components: { vabQuill },
    data() {
      return {
        prodQuery: {},
        stateOptions: [
          { value: '0', label: '在售' },
          { value: '1', label: '下架' },
        ],
        distributionOptions: [
          { value: '0', label: '是' },
          { value: '1', label: '否' },
        ],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        showModalEdit: false,
        tableData: [],
        moment,
        chooseItem: {},
        // 分类
        typeList: [],
        ruleValidate: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          classAid: [
            { required: true, message: '请选择商品分类', trigger: 'change' },
          ],
          keyword: [
            { required: true, message: '请输入商品关键字', trigger: 'blur' },
          ],
          unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
          introduction: [
            { required: true, message: '请输入商品简介', trigger: 'blur' },
          ],
          sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
          isDistribution: [
            {
              required: true,
              message: '请选择是否分销商品',
              trigger: 'change',
            },
          ],
        },
        specificationList: [],
        dialogProdImageUrl: '',
        dialogProdImgVisible: false,
        // 详情
        showModalEditDetail: false,
        content: '',
        isAddDetail: false,
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
      // 获取规格列表
      this.getSpecificationList()
    },
    methods: {
      closeDialog() {
        this.showModalEditDetail = false
        this.dialogProdImgVisible = false
        this.showModalEdit = false
      },
      // 所属分类名称获取
      getClassName(classAid) {
        let className = ''
        this.typeList.forEach((v) => {
          if (v.aid === classAid) className = v.name
        })
        return className
      },
      // 获取规格列表
      async getSpecificationList() {
        const { data } = await physicalProductApi.getEntitySpecification()
        this.specificationList = data
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val
        this.getData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getData()
      },
      showDialogAdd() {
        let editValue = []
        this.$store.dispatch('temp/setEditValue', editValue).then(() => {
          this.$router.push({
            name: 'ProductAdd',
          })
        })
      },
      showDialogEdit(item) {
        let editValue = []
        editValue.push({
          data: item,
          edit: true,
        })
        this.$store.dispatch('temp/setEditValue', editValue).then(() => {
          this.$router.push({
            name: 'ProductAdd',
          })
        })
      },
      showDialogEditDetail(item) {
        this.chooseItem = item
        this.showModalEditDetail = true
        this.isAddDetail = false
        this.getDataDetail(item)
      },
      async getDataDetail(item) {
        const params = {
          entityAid: item.aid,
        }
        const { data } = await physicalProductApi.getEntityDetail(params)
        if (!data) {
          this.content = ''
          this.isAddDetail = true
        } else this.content = data.content
      },
      handleRemove(file, fileList) {
        this.dialogProdImageUrl = ''
      },
      handlePictureCardPreview(file) {
        this.dialogProdImageUrl = file.url
        this.dialogProdImgVisible = true
      },
      deleteRow(item) {
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.deleteTableRow(item)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },

      async deleteTableRow(item) {
        const params = {
          aid: item.aid,
        }
        const res = await physicalProductApi.delEntity(params)
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.getData()
        }
      },
      search() {
        this.getData()
      },
      async getData() {
        const params = {
          page: this.currentPage,
          pageRows: this.pageSize,
        }
        let p = Object.assign(this.prodQuery, params)
        console.log(p)
        const { data } = await physicalProductApi.getEntityList(p)
        this.tableData = data.records
        this.total = data.total
      },
      async getTypeList(page = '1', pageRows = '100', name = '') {
        const params = {
          page,
          pageRows,
          name,
        }
        const { data } = await physicalProductApi.getEntityClassList(params)
        this.typeList = data.records
      },
      // 列表修改分销
      editistribution(item, event) {
        this.chooseItem = item
        this.chooseItem.isDistribution = event
        this.editorConfirm()
      },
      // 编辑确认
      async editorConfirm() {
        const params = this.chooseItem
        const { message } = await physicalProductApi.addEntity(params)
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
      // 确认编辑详情
      async editorDetailConfirm() {
        const params = {
          entityAid: this.chooseItem.aid,
          content: this.content,
        }
        if (this.isAddDetail) params.aid = -1
        const res = await physicalProductApi.addEntityDetail(params)
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.showModalEditDetail = false
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
          })
          this.showModalEditDetail = false
        }
      },
      // 添加规划
      addTem() {},
    },
  }
</script>

<style lang="scss" scoped>
  .page_title {
    margin-bottom: 0;
    padding: 12px 0;
    .ck_title {
      height: auto;
      margin-top: 12px;
      padding: 0;
      display: block;
      .ck_buttons {
        text-align: right;
        margin-top: 12px;
      }
    }
  }
  .acea-row {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    /* 辅助类 */
  }
  .acea-row.row-middle {
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .acea-row.row-right {
    -webkit-box-pack: end;
    -moz-box-pack: end;
    -o-box-pack: end;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }
  .acea-row.row-bottom {
    -webkit-box-align: end;
    -moz-box-align: end;
    -o-box-align: end;
    -ms-flex-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }
  .acea-row.row-around {
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }
  .acea-row.row-between {
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  /* 上下左右垂直居中 */
  .acea-row.row-center-wrapper {
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -o-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  /* 上下两边居中对齐 */
  .acea-row.row-between-wrapper {
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .acea-row.row-column-around {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }
  .selWidthd {
    width: 300px;
  }
  .mr15 {
    margin-right: 15px;
  }
  .ml10 {
    margin-left: 10px;
  }
  .mr10 {
    margin-right: 10px !important;
  }
  .mr15 {
    margin-right: 15px;
  }
  .mb5 {
    margin-bottom: 5px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .mb35 {
    margin-bottom: 35px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mr50 {
    margin-right: 50px;
  }
  .mr20 {
    margin-right: 20px;
  }
  .ml40 {
    margin-left: 40px !important;
  }
  .mr5 {
    margin-right: 5px !important;
  }
</style>
<style lang="scss">
  .ql-editor {
    min-height: 400px !important;
  }
</style>
