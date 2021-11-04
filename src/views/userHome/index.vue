<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">个人中心</div>
        <div class="ck_buttons"></div>
      </div>
    </div>
    <el-form
      ref="Form"
      :model="Form"
      :rules="rules"
      label-width="120px"
      label-position="right"
      style="width: 70%; margin: 0 auto"
    >
      <el-form-item label="账号:" prop="nickName">
        <el-input v-model="Form.nickName" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="userName">
        <el-input v-model="Form.userName"></el-input>
      </el-form-item>
      <el-form-item label="原始密码:" prop="originalPwd">
        <el-input v-model="Form.originalPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input v-model="Form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码:" prop="confirmPwd">
        <el-input v-model="Form.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import './index.scss'
  import { sysApi } from '@/api/index'
  import { recordRoute } from '@/config'
  export default {
    name: 'UserHome',
    data() {
      return {
        Form: {
          aid: this.$store.state.user.Uid,
          nickName: this.$store.state.user.nickName,
          userName: this.$store.state.user.username,
          originalPwd: '',
          newPassword: '',
          confirmPwd: '',
        },
        rules: {
          userName: [
            { required: true, message: '请填写姓名', trigger: 'blur' },
          ],
          originalPwd: [
            { required: true, message: '请填写原始密码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '请填写新密码', trigger: 'blur' },
          ],
          confirmPwd: [
            { required: true, message: '请再次填写新密码', trigger: 'blur' },
          ],
        },
      }
    },
    mounted() {},
    methods: {
      submit() {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.submitUpdatePwd()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      async submitUpdatePwd() {
        const res = await sysApi.updatePwd(this.Form)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          setTimeout(() => {
            this.$router.push('/index')
            this.loginout()
          }, 1000)
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async loginout() {
        await this.$store.dispatch('user/logout')
        if (recordRoute) {
          const fullPath = this.$route.fullPath
          this.$router.push(`/login?redirect=${fullPath}`)
        } else {
          this.$router.push('/login')
        }
      },
    },
  }
</script>
