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
              <img
                v-if="formValidate.coverPicture"
                :src="formValidate.coverPicture"
                style="width: 150px; height: 150px"
              />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogProdImgVisible">
              <img width="100%" :src="dialogProdImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <!-- 规格 -->
        <el-col v-if="edit" :span="24">
          <el-form-item label="商品规格">
            <el-radio-group v-model="specModel" @change="changeModel">
              <el-radio :label="0" class="radio">单规格</el-radio>
              <el-radio :label="1">多规格</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- 单规格表格 -->
        <el-col v-if="specModel === 0 && edit" :span="24">
          <el-form-item label="">
            <el-table :data="specTable" border style="width: 100%">
              <el-table-column
                prop="img"
                label="图片"
                min-width="60"
                align="center"
              >
                <template slot-scope="scope">
                  <el-upload
                    class="table-upload"
                    action="#"
                    list-type="picture-card"
                    :multiple="false"
                    :auto-upload="false"
                    :limit="1"
                    :on-remove="handleRemove(scope.$index)"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="售价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="cost_price"
                label="成本价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.cost_price"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="older_price"
                label="原价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.older_price"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="stock"
                label="库存"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.stock" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="gdno"
                label="商品编号"
                min-width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.gdno" type="text"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="weight"
                label="重量(KG)"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.weight" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="volume"
                label="体积(m³)"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.volume" type="number"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
        <!-- 单规格表格 end -->
        <el-col v-if="specModel === 1 && edit" :span="24">
          <el-form-item label="选择规格" prop="specificationAid">
            <div class="acea-row">
              <el-select
                v-model="formValidate.specificationAid"
                placeholder="请选择"
                class="selWidthd mr20"
                :disabled="isDisabled"
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
            <el-button type="primary" @click="creatModel">生成</el-button>
          </el-form-item>
          <!-- 表格 -->
          <el-form-item v-if="hasModel" label="">
            <span>批量设置</span>
            <el-table :data="specTableForm" border style="width: 100%">
              <el-table-column
                prop="image"
                label="图片"
                min-width="60"
                align="center"
              >
                <template slot-scope="scope">
                  <el-upload
                    class="table-upload"
                    action="#"
                    list-type="picture-card"
                    :multiple="false"
                    :auto-upload="false"
                    :limit="1"
                    :on-remove="handleRemove(scope.$index)"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column
                prop="sellingPrice"
                label="销售价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.sellingPrice"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="costPrice"
                label="成本价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.costPrice"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="originalPrice"
                label="原价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.originalPrice"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="inventory"
                label="库存"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.inventory"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="gdno"
                label="商品编号"
                min-width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.gdno" type="text"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="weight"
                label="重量(KG)"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.weight" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="volume"
                label="体积(m³)"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.volume" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="adds(scope.row)">
                    批量添加
                  </el-button>
                  <span style="margin: 0 5px">|</span>
                  <el-button type="text">清空</el-button>
                </template>
              </el-table-column>
            </el-table>
            <span>商品属性</span>
            <el-table :data="specTableValue" border style="width: 100%">
              <el-table-column
                label="规格"
                prop="specification"
                min-width="150"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="image"
                label="图片"
                min-width="60"
                align="center"
              >
                <template slot-scope="scope">
                  <el-upload
                    v-if="scope.row.image === ''"
                    class="table-upload"
                    action="#"
                    list-type="picture-card"
                    :multiple="false"
                    :auto-upload="false"
                    :limit="1"
                    :on-remove="handleRemove(scope.$index)"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-image v-else :src="scope.row.image" fit="fill"></el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="sellingPrice"
                label="销售价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.sellingPrice"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="costPrice"
                label="成本价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.costPrice"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="originalPrice"
                label="原价"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.originalPrice"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="inventory"
                label="库存"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.inventory"
                    type="number"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="gdno"
                label="商品编号"
                min-width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.gdno" type="text"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="weight"
                label="重量(KG)"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.weight" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="volume"
                label="体积(m³)"
                min-width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.volume" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="editRow(scope.row)">
                    修改
                  </el-button>
                  <el-button type="text" @click="deleteRow(scope.row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!-- 多规格 end -->
        </el-col>
        <!-- 规格 end -->

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
    <spec-dialog ref="specDialog" />
  </div>
</template>

<script>
  import { physicalProductApi } from '@/api/index'
  import SpecDialog from '../setting/dialog'
  import vabQuill from '@/plugins/vabQuill'
  export default {
    name: 'PhySicalProductsAdd',
    components: { vabQuill, SpecDialog },
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
        // 规格
        specModel: 0,
        specTable: [
          {
            img: '',
            price: 0,
            cost_price: 0,
            older_price: 0,
            stock: 999,
            gdno: '1234567891234',
            weight: 2.4,
            volume: 0.65,
          },
        ],
        specForm: {
          name: '123123',
          spec: [
            {
              name: '22',
              values: [
                {
                  value: '3232',
                },
                {
                  value: '323',
                },
              ],
            },
            {
              name: '333',
              values: [
                {
                  value: '3333',
                },
              ],
            },
          ],
        },
        hasModel: false,
        add: true,
        source: false,
        specificationValue: [],
        specTableForm: [
          {
            aid: -1,
            image: '',
            sellingPrice: '0',
            costPrice: '0',
            originalPrice: '0',
            inventory: '999',
            gdno: '1234567891234',
            weight: '2.4',
            volume: '0.65',
          },
        ],
        tempSepc: [],
        specTableValue: [],
        edit: false,
      }
    },
    created() {
      // 获取分类列表
      this.getTypeList()
      // 获取规格列表
      this.getSpecificationList()
      if (this.$route.query.data) {
        this.formValidate = this.$route.query.data
        this.edit = this.$route.query.edit
        console.log(this.$route.query, this.formValidate, this.edit)
      }
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
      },
      // 获取规格列表
      async getSpecificationList() {
        const { data } = await physicalProductApi.getEntitySpecification()
        this.specificationList = data
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
      // 更改模板
      changeModel() {
        this.hasModel = false
      },
      // 添加产品规格
      addTem() {
        this.$refs.specDialog.showModalBox(this.source, this.add)
      },
      // 添加新规格
      addNewSpec() {
        let noAdd = false
        if (this.specForm.spec.length > 0) {
          this.specForm.spec.forEach((v) => {
            if (v.name === '') noAdd = true
            v.values.forEach((val) => {
              if (val.value === '') noAdd = true
            })
          })
        }
        let item = {
          name: '',
          values: [{ value: '' }],
          isEmpty: true,
        }
        if (noAdd) {
          this.$message({
            message: '警告哦，先填写完成当前属性',
            type: 'warning',
          })
          return false
        }
        if (!noAdd) this.specForm.spec.push(item)
      },
      // 取消
      subNewSpec(index) {
        this.specForm.spec.splice(index, 1)
      },
      // 确定添加
      submitSpecVal(index) {
        if (this.specForm.spec[index].name === '') {
          this.$message({
            message: '警告哦，先填写完成当前属性名称',
            type: 'warning',
          })
          return false
        }
        let len = this.specForm.spec[index].values.length
        if (this.specForm.spec[index].values[len - 1].value === '') {
          this.$message({
            message: '警告哦，先填写完成当前属性值',
            type: 'warning',
          })
          return false
        }
        this.specForm.spec[index].isEmpty = false
      },
      // 添加规格属性值
      addSpecVal(index, i) {
        let len = this.specForm.spec[index].values.length
        if (this.specForm.spec[index].values[len - 1].value === '') {
          this.$message({
            message: '警告哦，先填写完成当前属性值',
            type: 'warning',
          })
          return false
        }
        this.specForm.spec[index].values.push({ value: '' })
      },
      // 清除整体属性
      clearSpec(index) {
        this.specForm.spec.splice(index, 1)
      },
      // 清除值
      clearInput(index, i) {
        if (this.specForm.spec[index].values.length > 1) {
          this.specForm.spec[index].values.splice(i, 1)
        }
      },
      // 生成模板
      async creatModel() {
        const { data } = await physicalProductApi.getEntitySpecificationInfo({
          aid: this.formValidate.specificationAid,
        })
        if (data) {
          let List = []
          data.forEach((v) => {
            if (v.gskName === null) {
              List = []
            } else {
              List.push({
                name: v.gskName,
                value: v.gsvName,
              })
            }
          })
          let obj = {}
          List.forEach((v) => {
            let { name } = v
            if (!obj[name]) {
              obj[name] = []
            }
            obj[name].push(v.value)
          })
          let arr = Object.values(obj) //转换成功的数据
          var sarr = [[]]
          for (var i = 0; i < arr.length; i++) {
            var tarr = []
            for (var j = 0; j < sarr.length; j++)
              for (var k = 0; k < arr[i].length; k++)
                tarr.push(sarr[j].concat(arr[i][k]))
            sarr = tarr
          }
          this.tempSepc = sarr
        }
        this.getSpecTableValue()
        this.hasModel = true
      },
      //获取商品属性详情
      getSpecTableValue() {
        physicalProductApi
          .getEntityProperty({ aid: this.$route.query.data.aid })
          .then((res) => {
            if (res) {
              console.log(res.data)
              this.specTableValue = res.data
            } else {
              this.$message({
                message: '接口未返回数据',
                type: 'warning',
              })
            }
          })
      },
      adds(row) {
        let form = row
        form.goodsEntityAid = this.formValidate.aid
        this.tempSepc.forEach((v) => {
          form.specification = v.toString()
          physicalProductApi.setEntityProperty(form).then((res) => {
            if (res) {
              this.$message({
                message: res.message,
                type: 'success',
              })
            } else {
              this.$message({
                message: '请求失败',
                type: 'warning',
              })
            }
          })
        })
        this.getSpecTableValue()
      },
      // *********提交
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
        if (res.code === 200) {
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
        if (res.code === 200) {
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
      editRow(item) {
        physicalProductApi.setEntityProperty(item).then((res) => {
          if (res) {
            this.$message({
              message: res.message,
              type: 'success',
            })
          } else {
            this.$message({
              message: '请求失败',
              type: 'warning',
            })
          }
        })
      },
      deleteRow(item) {
        console.log(item)
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
<style lang="scss">
  .table-upload {
    width: 60px;
    height: 60px;
    .el-upload--picture-card {
      width: 60px !important;
      height: 60px !important;
      line-height: 60px !important;
      i {
        line-height: normal !important;
      }
    }
  }
</style>
