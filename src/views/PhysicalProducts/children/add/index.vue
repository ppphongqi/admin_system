<template>
  <div class="add_wrapper">
    <el-tabs
      v-model="activeName"
      style="margin-left: 20px; margin-top: 30px; height: 10%"
    >
      <el-tab-pane label="商品信息" name="1"></el-tab-pane>
      <el-tab-pane label="商品详情" name="2"></el-tab-pane>
    </el-tabs>
    <el-form
      ref="formOne"
      v-loading="fullscreenLoading"
      :rules="ruleValidate"
      :model="formValidate"
      label-width="120px"
      style="display: flex; flex-direction: column; width: 100%"
    >
      <el-row v-show="activeName == 1" :gutter="24">
        <el-col>
          <el-form-item label="商品名称：" prop="name">
            <el-input
              v-model="formValidate.name"
              maxlength="249"
              style="width: 360px"
              placeholder="请输入商品名称"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="商品分类：" prop="classAid">
            <el-select
              v-model="formValidate.classAid"
              style="width: 360px"
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
        </el-col>
        <el-col>
          <el-form-item label="商品关键字：">
            <el-input
              v-model="formValidate.keyword"
              style="width: 360px"
              placeholder="请输入商品关键字"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="单位：" prop="unit">
            <el-input
              v-model="formValidate.unit"
              style="width: 360px"
              placeholder="请输入单位"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="商品简介：" prop="introduction">
            <el-input
              v-model="formValidate.introduction"
              style="width: 80%"
              type="textarea"
              maxlength="250"
              :rows="3"
              placeholder="请输入商品简介"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col>
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
            <el-dialog :visible.sync="dialogProdImgVisible">
              <img width="100%" :src="dialogProdImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品规格" prop="specificationAid">
            <div class="acea-row">
              <el-select
                v-model="formValidate.specificationAid"
                placeholder="请选择"
                class="selWidthd mr20"
                :disabled="isDisabled"
              >
                <el-option
                  v-for="item in specificationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-button class="mr15" @click="addTem">添加产品规格</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="商品状态" prop="state">
            <el-radio-group v-model="formValidate.state">
              <el-radio label="0" class="radio">在售</el-radio>
              <el-radio label="1">下架</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="分销商品" prop="isDistribution">
            <el-radio-group v-model="formValidate.isDistribution">
              <el-radio label="0" class="radio">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="排序：" prop="sort">
            <el-input
              v-model="formValidate.sort"
              style="width: 360px"
              placeholder="请输入排序"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">下一步</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- </div> -->
    <!-- 商品详情 -->
    <div v-if="activeName == 2" class="add_main">
      <el-row :gutter="24">
        <el-col :span="2">详情:</el-col>
        <el-col :span="22">
          <vab-quill v-model="content" :min-height="400"></vab-quill>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 30px">
        <el-col :span="5">
          <el-button v-if="activeName !== 1" @click="sendBack">
            上一步
          </el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { physicalProductApi } from '@/api/index'
  import vabQuill from '@/plugins/vabQuill'
  export default {
    name: 'PhySicalProductsAdd',
    components: { vabQuill },
    data() {
      return {
        content: '',
        isDisabled: false,
        fullscreenLoading: false,
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
          // coverPicture: [
          //   { required: true, message: '请上传商品图', trigger: 'change' },
          // ],
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
        activeName: '1',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        formValidate: {},
        // 分类
        typeList: [],
        specificationList: [],
        dialogProdImageUrl: '',
        dialogProdImgVisible: false,
        addProdItem: null,
      }
    },
    created() {
      // 获取分类列表
      this.getTypeList()
      // 获取规格列表
      // this.getSpecificationList()
    },
    methods: {
      // 获取分类列表
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
      // 获取规格列表
      async getSpecificationList(page = '1', pageRows = '100', name = '') {
        const params = {
          page,
          pageRows,
          name,
        }
        const { data } = await physicalProductApi.getEntityClassList(params)
        this.specificationList = data.records
      },
      validate(prop, status, error) {
        if (status === false) {
          this.$message.warning(error)
        }
      },
      imgUpload() {},
      handleRemove(file, fileList) {
        this.dialogProdImageUrl = ''
      },
      handlePictureCardPreview(file) {
        this.dialogProdImageUrl = file.url
        this.dialogProdImgVisible = true
      },
      // 添加产品规格
      addTem() {},
      onSubmit() {
        if (this.activeName === '1') {
          this.$refs['formOne'].validate((valid) => {
            if (valid) {
              this.addProd()
            } else {
              return false
            }
          })
        }
        if (this.activeName === '2') {
          if (this.content === '') {
            this.$message({
              message: '请填写商品详情信息',
              type: 'warning',
            })
            return false
          }
          this.addProdDetail()
        }
      },
      // 新增商品
      async addProd() {
        this.addProdItem = null
        const params = this.formValidate
        params.aid = -1
        const res = await physicalProductApi.addEntity(params)
        if (res.code === 10000) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          const num = Number(this.activeName) + 1
          this.activeName = `${num}`
          this.addProdItem = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
          })
        }
      },
      // 新增商品详情
      async addProdDetail() {
        if (!this.addProdItem) {
          this.$message({
            message: '未识别到需要添加详情的商品，请重新添加或者去编辑！',
            type: 'warning',
          })
          const num = Number(this.activeName) - 1
          this.activeName = `${num}`
          return false
        }
        const params = {
          aid: -1,
          entityAid: this.addProdItem.aid,
          content: this.content,
        }
        const res = await physicalProductApi.addEntityDetail(params)
        if (res.code === 10000) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.$router.push({
            name: 'ProductList',
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning',
          })
        }
      },
      sendBack() {
        if (this.activeName > 1) {
          const num = Number(this.activeName) - 1
          this.activeName = `${num}`
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .add_wrapper {
    // min-height: 80vh;
    width: 100%;
    background: #fff;
  }
  .add_main {
    width: 100%;
    padding: 10px 30px;
  }
  .upLoadPicBox {
    display: inline-block;
    cursor: pointer;
    .pictrue {
      width: 60px;
      height: 60px;
      border: 1px dotted rgba(0, 0, 0, 0.1);
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .upLoad {
      width: 58px;
      height: 58px;
      line-height: 58px;
      border: 1px dotted rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.02);
      display: flex;
      justify-content: center;
      align-items: center;
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
