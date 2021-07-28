<template>
  <el-dialog
    title="添加/编辑商品规格"
    :visible.sync="showModal"
    top
    style="margin-top: 50px"
  >
    <el-form :model="specForm" label-width="150px" label-position="right">
      <el-form-item label="规格模板名称:" prop="name" required>
        <el-input
          v-model="specForm.name"
          placeholder="输入规格模板名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="spec">
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
      <el-button @click="showModal = false">取 消</el-button>
      <el-button type="primary" @click="submitSpec">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import './index.scss'

  export default {
    data() {
      return {
        showModal: false,
        specForm: {
          name: '',
          spec: [],
        },
      }
    },
    methods: {
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
      showModalBox(specForm) {
        this.showModal = true
        if (specForm) this.specForm = specForm
        else {
          this.specForm = {
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
        let noSubmit = false
        if (this.specForm.spec.length > 0) {
          this.specForm.spec.forEach((v) => {
            if (v.name === '') noSubmit = true
            v.values.forEach((val) => {
              if (val.value === '') noSubmit = true
            })
          })
        }
        let item = {
          name: '',
          values: [{ value: '' }],
          isEmpty: true,
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
