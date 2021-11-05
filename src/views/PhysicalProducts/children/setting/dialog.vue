<template>
  <el-dialog
    v-if="showModal"
    title="添加/编辑商品规格"
    :visible.sync="showModal"
    top
    style="margin-top: 50px"
    :before-close="closeShowModal"
  >
    <el-form
      ref="specForm"
      :model="specForm"
      :rules="rules"
      label-width="150px"
      label-position="right"
    >
      <el-form-item label="规格模板名称:" prop="name">
        <el-input
          v-model="specForm.name"
          placeholder="输入规格模板名称"
          @change="addModal"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格内容" prop="spec">
        <div v-for="(item, index) in specForm.spec" :key="index" class="spec">
          <div v-if="item.isEmpty" style="display: inline-block">
            <span class="title">规格名称：</span>
            <el-input
              v-model="item.name"
              clearable
              placeholder="规格名称"
            ></el-input>
            <span class="title">规格值：</span>
            <el-input
              v-for="(val, i) in item.values"
              :key="i"
              v-model="val.value"
              clearable
              placeholder="规格值"
            ></el-input>
            <el-button size="mini" type="primary" @click="submitSpecVal(index)">
              确 定
            </el-button>
            <el-button size="mini" @click="subNewSpec(index)">取 消</el-button>
          </div>
          <div v-if="!item.isEmpty">
            <div>
              <el-tag closable @close="clearSpec(index)">
                {{ item.name }}
              </el-tag>
            </div>
            <el-input
              v-for="(val, i) in item.values"
              :key="i"
              v-model="val.value"
              clearable
              placeholder="规格值"
              @blur="setValue(index, $event)"
              @clear="clearInput(index, i)"
            ></el-input>
            <el-button size="mini" type="primary" @click="addSpecVal(index)">
              添加
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-button size="mini" type="primary" @click="addNewSpec">
          + 添加新规格
        </el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeShowModal">取 消</el-button>
      <el-button type="primary" @click="submitSpec">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import './index.scss'
  import { physicalProductApi } from '@/api/index'
  export default {
    data() {
      return {
        add: false,
        source: false,
        oneAddName: false,
        showModal: false,
        specForm: {
          name: '',
          spec: [],
        },
        rules: {
          name: [
            { required: true, message: '请填写规格名称', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      //添加模板
      addModal() {
        if (this.add) {
          let item = {
            aid: -1,
            name: this.specForm.name,
          }
          physicalProductApi.setEntitySpecification(item).then((res) => {
            if (res) {
              this.$message({
                message: res.message,
                type: 'success',
              })
              this.add = false
              this.oneAddName = true
              this.specForm.gsAid = res.data.aid
            } else {
              this.$message({
                message: '接口未返回数据',
                type: 'warning',
              })
            }
          })
        }
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
      async getSpec() {
        const { data } = await physicalProductApi.getEntitySpecificationInfo({
          aid: this.specForm.gsAid,
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
          this.specForm = {
            gsAid: data[0].gsAid,
            name: data[0].gsName,
            spec: info,
          }
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
          return
        }
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
        let form = {
          aid: -1,
          name: this.specForm.name,
          key: this.specForm.spec[index].name,
          value: this.specForm.spec[index].values[len - 1].value,
        }
        physicalProductApi.setEntitySpecificationKey(form).then((res) => {
          if (res) {
            this.$message({
              message: res.message,
              type: 'success',
            })
            this.specForm.spec[index].isEmpty = false
            this.getSpec()
          } else {
            this.$message({
              message: '设置失败',
              type: 'warning',
            })
          }
        })
      },
      // 添加规格属性值
      addSpecVal(index) {
        let len = this.specForm.spec[index].values.length
        if (this.specForm.spec[index].values[len - 1].value === '') {
          this.$message({
            message: '警告哦，先填写完成当前属性值',
            type: 'warning',
          })
          return false
        }
        this.specForm.spec[index].values.push({ gsvAid: '', value: '' })
      },
      //更新属性值
      setValue(index, e) {
        let form = {
          keyAid: this.specForm.spec[index].gskAid,
          value: e.target.value,
        }
        physicalProductApi.setEntitySpecificationValue(form).then((res) => {
          if (res) {
            this.$message({
              message: res.message,
              type: 'success',
            })
            console.log(this.specForm.spec)
          } else {
            this.$message({
              message: '设置失败',
              type: 'warning',
            })
          }
        })
      },
      // 清除整体属性
      clearSpec(index) {
        physicalProductApi
          .delEntitySpecificationKey({
            aid: this.specForm.spec[index].gskAid,
          })
          .then((res) => {
            if (res) {
              this.$message({
                message: res.message,
                type: 'success',
              })
              this.specForm.spec.splice(index, 1)
            } else {
              this.$message({
                message: '删除失败',
                type: 'warning',
              })
            }
          })
      },
      // 清除值
      clearInput(index, i) {
        if (this.specForm.spec[index].values.length === 1) {
          this.$message({
            message: '最少需要一个属性值,只可更新，不可删除！',
            type: 'warning',
          })
          return
        }
        physicalProductApi
          .delEntitySpecificationValue({
            aid: this.specForm.spec[index].values[i].gsvAid,
          })
          .then((res) => {
            if (res) {
              this.$message({
                message: res.message,
                type: 'success',
              })
              if (this.specForm.spec[index].values.length > 1) {
                this.specForm.spec[index].values.splice(i, 1)
              }
            } else {
              this.$message({
                message: '删除失败',
                type: 'warning',
              })
            }
          })
      },
      showModalBox(source, add, specForm) {
        this.showModal = true
        this.source = source
        this.add = add
        if (specForm) this.specForm = specForm
        else {
          this.specForm = {
            gsAid: '',
            name: '',
            spec: [],
          }
        }
      },
      // 提交规格
      submitSpec() {
        if (this.specForm.name === '') {
          this.$message({
            message: '警告哦，填写规格模板名称',
            type: 'warning',
          })
          return false
        }
        if (this.specForm.spec.length === 0) {
          this.$message({
            message: '警告哦，至少需要一条规格值',
            type: 'warning',
          })
          return false
        }
        let noSubmit = false
        if (this.specForm.spec.length > 0) {
          this.specForm.spec.forEach((v) => {
            if (v.name === '') noSubmit = true
            v.values.forEach((val) => {
              if (val.value === '') noSubmit = true
            })
          })
        }
        if (noSubmit) {
          this.$message({
            message: '警告哦，先填写完成当前属性',
            type: 'warning',
          })
          return false
        }
        let specForm = JSON.parse(JSON.stringify(this.specForm))
        specForm.spec.map((v) => {
          delete v.isEmpty
        })
        console.log('提交')
        console.log(specForm)
        this.oneAddName = false
        this.showModal = false
        if (this.source) {
          this.$parent.getEntitySpecificationList()
        } else {
          this.$parent.getSpecificationList()
        }
      },
      //关闭模板
      async closeShowModal() {
        if (this.oneAddName) {
          const { data } = await physicalProductApi.getEntitySpecification()
          if (data) {
            data.forEach((v) => {
              if (this.specForm.name === v.name) {
                physicalProductApi
                  .delEntitySpecification({
                    aid: v.aid,
                  })
                  .then((res) => {
                    if (res) {
                      this.$message({
                        message: res.message,
                        type: 'success',
                      })
                      this.oneAddName = false
                    } else {
                      this.$message({
                        message: '接口未返回数据',
                        type: 'warning',
                      })
                    }
                  })
              }
            })
          } else {
            this.$message({
              message: '接口未返回数据',
              type: 'warning',
            })
          }
        }
        this.$refs.specForm.resetFields()
        this.showModal = false
        if (this.source) {
          this.$parent.getEntitySpecificationList()
        } else {
          this.$parent.getSpecificationList()
        }
      },
    },
  }
</script>
<style lang="scss" scopeed>
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
