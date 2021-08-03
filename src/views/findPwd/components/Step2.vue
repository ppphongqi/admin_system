<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="手机号：">
        {{ infoData.phone }}
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPwd">
        <el-input v-model="form.confirmPwd" type="password" />
      </el-form-item>
      <el-form-item label="验证码：" prop="code">
        <el-input v-model="form.code" type="text" />
      </el-form-item>
    </el-form>
    <div class="next-button-group">
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        提交
      </el-button>
      <el-button @click="handlePrev">上一步</el-button>
    </div>
  </div>
</template>
<script>
  import { loginApi } from '@/api/index'
  export default {
    props: {
      infoData: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    data() {
      return {
        form: {
          phone: '',
          newPassword: '123456',
          confirmPwd: '123456',
          code: '',
        },
        rules: {
          newPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          confirmPwd: [
            { required: true, message: '请确认密码', trigger: 'blur' },
          ],
          code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        },
        loading: false,
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            this.form.phone = this.infoData.phone
            loginApi.findUpdatePwd(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.message,
                  type: 'success',
                })
                this.$emit('change-step', 3)
              }
            })
            this.loading = false
          } else {
            this.loading = false
          }
        })
      },
      handlePrev() {
        this.form = {}
        this.$emit('change-step', 1)
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
