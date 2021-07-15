<template>
  <div class="add_wrapper">
    <el-tabs
      v-model="activeName"
      style="margin-left: 20px; margin-top: 30px; height: 10%"
      @tab-click="handleClick"
    >
      <el-tab-pane label="商品信息" name="1"></el-tab-pane>
      <el-tab-pane label="商品详情" name="2"></el-tab-pane>
      <el-tab-pane label="其他设置" name="3"></el-tab-pane>
    </el-tabs>
    <!-- 商品信息 -->
    <!-- <div
      v-if="activeName == 1"
      v-loading="fullscreenLoading"
      :rules="ruleValidate"
      class="add_main"
    > -->
    <el-form
      ref="form"
      v-loading="fullscreenLoading"
      :rules="ruleValidate"
      :model="formValidate"
      label-width="120px"
      style="display: flex; flex-direction: column; width: 40%"
    >
      <el-row v-show="activeName == 1" :gutter="24">
        <el-col v-bind="grid2">
          <el-form-item label="商品名称：" prop="storeName">
            <el-input
              v-model="formValidate.name"
              maxlength="249"
              placeholder="请输入商品名称"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid2">
          <el-form-item label="商品分类：" prop="cateIds">
            <el-cascader
              v-model="formValidate.cateIds"
              :options="merCateList"
              :props="props2"
              clearable
              class="selWidth"
              :show-all-levels="false"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid2">
          <el-form-item label="商品关键字：">
            <el-input
              v-model="formValidate.keyword"
              placeholder="请输入商品关键字"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid2">
          <el-form-item label="单位：" prop="unitName">
            <el-input
              v-model="formValidate.unitName"
              placeholder="请输入单位"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid2">
          <el-form-item label="商品简介：">
            <el-input
              v-model="formValidate.storeInfo"
              type="textarea"
              maxlength="250"
              :rows="3"
              placeholder="请输入商品简介"
              :disabled="isDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid2">
          <el-form-item label="商品封面图：" prop="image">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="24">
          <el-form-item label="商品轮播图：" prop="sliderImages">
            <div class="acea-row">
              <div
                v-for="(item, index) in formValidate.sliderImages"
                :key="index"
                class="pictrue"
                draggable="true"
                @dragstart="handleDragStart($event, item)"
                @dragover.prevent="handleDragOver($event, item)"
                @dragenter="handleDragEnter($event, item)"
                @dragend="handleDragEnd($event, item)"
              >
                <img :src="item" />
                <i
                  v-if="!isDisabled"
                  class="el-icon-error btndel"
                  @click="handleRemove(index)"
                />
              </div>
              <div
                v-if="formValidate.sliderImages.length < 10 && !isDisabled"
                class="upLoadPicBox"
                @click="modalPicTap('2')"
              >
                <div class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </div>
          </el-form-item>
        </el-col> -->

        <el-col :span="24">
          <el-form-item label="产品规格" prop="tempId">
            <div class="acea-row">
              <el-select
                v-model="formValidate.tempId"
                placeholder="请选择"
                class="selWidthd mr20"
                :disabled="isDisabled"
              >
                <el-option
                  v-for="item in shippingList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-button v-show="!isDisabled" class="mr15" @click="addTem">
                添加产品规格
              </el-button>
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24">
          <el-form-item label="商品状态" props="specType">
            <el-radio-group
              v-model="formValidate.specType"
              :disabled="isDisabled"
              @change="onChangeSpec(formValidate.specType)"
            >
              <el-radio :label="0" class="radio">在售</el-radio>
              <el-radio :label="1">下架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否为分销商品" props="isSub">
            <el-radio-group
              v-model="formValidate.isSub"
              :disabled="isDisabled"
              @change="onChangetype(formValidate.isSub)"
            >
              <el-radio :label="0" class="radio">是</el-radio>
              <el-radio :label="1">不是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
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
        <el-col :span="1">详情:</el-col>
        <el-col :span="21">
          <vab-quill
            v-model="content"
            :min-height="400"
            :options="options"
          ></vab-quill>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 30px">
        <el-col :span="5">
          <el-button v-if="activeName !== 1" @click="sendBack">
            上一步
          </el-button>
          <el-button type="primary" @click="onSubmit">下一步</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 其他设置 -->
    <div v-if="activeName == 3" class="add_main">
      <el-form
        ref="form"
        v-loading="fullscreenLoading"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="120px"
        style="
          display: flex;
          flex-direction: column;
          width: 40%;
          text-align: left;
        "
      >
        <el-row :gutter="24">
          <el-col :span="24" style="text-align: left">
            <el-form-item
              label="商品状态"
              props="specType"
              style="text-align: left"
            >
              <el-radio-group
                v-model="formValidate.specType"
                :disabled="isDisabled"
                @change="onChangeSpec(formValidate.specType)"
              >
                <el-radio :label="0" class="radio">在售</el-radio>
                <el-radio :label="1">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否为分销商品" props="isSub">
              <el-radio-group
                v-model="formValidate.isSub"
                :disabled="isDisabled"
                @change="onChangetype(formValidate.isSub)"
              >
                <el-radio :label="0" class="radio">是</el-radio>
                <el-radio :label="1">不是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row :gutter="24">
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
  const defaultObj = {
    image: '',
    sliderImages: [],
    sliderImage: '',
    storeName: '',
    storeInfo: '',
    keyword: '',
    cateIds: [], // 商品分类id
    cateId: null, // 商品分类id传值
    unitName: '',
    sort: 0,
    giveIntegral: 0,
    ficti: 0,
    isShow: false,
    isBenefit: false,
    isNew: false,
    isGood: false,
    isHot: false,
    isBest: false,
    tempId: '',
    attrValue: [
      {
        image: '',
        price: 0,
        cost: 0,
        otPrice: 0,
        stock: 0,
        barCode: '',
        weight: 0,
        volume: 0,
      },
    ],
    attr: [],
    selectRule: '',
    isSub: false,
    content: '',
    specType: false,
    id: 0,
    couponIds: [],
    coupons: [],
    activity: ['默认', '秒杀', '砍价', '拼团'],
  }
  export default {
    name: 'PhySicalProductsAdd',
    components: { vabQuill },
    data() {
      return {
        content: '',
        isDisabled: false,
        fullscreenLoading: false,
        ruleValidate: {
          storeName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          cateIds: [
            {
              required: true,
              message: '请选择商品分类',
              trigger: 'change',
              type: 'array',
              min: '1',
            },
          ],
          keyword: [
            { required: true, message: '请输入商品关键字', trigger: 'blur' },
          ],
          unitName: [
            { required: true, message: '请输入单位', trigger: 'blur' },
          ],
          storeInfo: [
            { required: true, message: '请输入商品简介', trigger: 'blur' },
          ],
          tempId: [
            { required: true, message: '请选择运费模板', trigger: 'change' },
          ],
          image: [
            { required: true, message: '请上传商品图', trigger: 'change' },
          ],
          sliderImages: [
            {
              required: true,
              message: '请上传商品轮播图',
              type: 'array',
              trigger: 'change',
            },
          ],
          specType: [
            { required: true, message: '请选择商品规格', trigger: 'change' },
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
        grid2: {
          xl: 24,
          lg: 12,
          md: 12,
          sm: 24,
          xs: 24,
        },
        formValidate: Object.assign({}, defaultObj),
      }
    },
    methods: {
      validate(prop, status, error) {
        if (status === false) {
          this.$message.warning(error)
        }
      },
      imgUpload() {},
      handleDragStart(e, item) {
        if (!this.isDisabled) this.dragging = item
      },
      handleDragEnd(e, item) {
        if (!this.isDisabled) this.dragging = null
      },
      handleDragOver(e) {
        if (!this.isDisabled) e.dataTransfer.dropEffect = 'move'
      },
      handleDragEnter(e, item) {
        if (!this.isDisabled) {
          e.dataTransfer.effectAllowed = 'move'
          if (item === this.dragging) {
            return
          }
          const newItems = [...this.formValidate.sliderImages]
          const src = newItems.indexOf(this.dragging)
          const dst = newItems.indexOf(item)
          newItems.splice(dst, 0, ...newItems.splice(src, 1))
          this.formValidate.sliderImages = newItems
        }
      },
      handleRemove(file) {
        console.log(file)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleDownload(file) {
        console.log(file)
      },
      onSubmit() {
        if (this.activeName < 3) {
          const num = Number(this.activeName) + 1
          this.activeName = `${num}`
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
