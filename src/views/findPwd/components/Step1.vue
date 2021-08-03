<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
    </el-form>
    <div class="next-button-group">
      <el-button type="primary" @click="handleSubmit">下一步</el-button>
    </div>
  </div>
</template>
<script>
  import { loginApi } from '@/api/index'
  export default {
    data() {
      return {
        form: {
          phone: '17606995730',
        },
        rules: {
          phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        },
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            loginApi.findPwdPhone(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.data,
                  type: 'success',
                })
                this.$emit('change-step', 2, this.form)
              } else {
                this.$message({
                  message: '接口未返回数据',
                  type: 'warning',
                })
              }
            })
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .next-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>
