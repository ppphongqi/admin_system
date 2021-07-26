<template>
  <div class="findPwd-container">
    <el-card class="pay-container">
      <div class="title">找回密码</div>
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="{ span: 20, offset: 2 }"
          :md="{ span: 20, offset: 2 }"
          :lg="{ span: 14, offset: 5 }"
          :xl="{ span: 12, offset: 6 }"
        >
          <el-steps :space="200" :active="active" align-center class="steps">
            <el-step title="检验手机号"></el-step>
            <el-step title="重置密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <step1 v-if="active === 1" @change-step="handleSetStep"></step1>
          <step2
            v-if="active === 2"
            :info-data="form"
            @change-step="handleSetStep"
          ></step2>
          <step3
            v-if="active === 3"
            :info-data="form"
            @change-step="handleSetStep"
          ></step3>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import Step1 from './components/Step1'
  import Step2 from './components/Step2'
  import Step3 from './components/Step3'
  export default {
    username: 'FindPwd',
    components: { Step1, Step2, Step3 },
    data() {
      const validateusername = (rule, value, callback) => {
        if ('' == value) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        active: 1,
        form: {},
        isGetphone: false,
        getPhoneIntval: null,
        phoneCode: '获取验证码',
        showRegister: false,
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        loading: false,
      }
    },
    created() {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
      this.getPhoneIntval = null
      clearInterval(this.getPhoneIntval)
    },
    methods: {
      getPhoneCode() {
        if (!isPhone(this.form.phone)) {
          //this.$baseMessage('请输入手机号', 'error')
          this.$refs['registerForm'].validateField('phone')
          return
        }
        loginApi.getMessageAuthenticationCode(this.form.phone)
        this.isGetphone = true
        let n = 60
        this.getPhoneIntval = setInterval(() => {
          if (n > 0) {
            n--
            this.phoneCode = '重新获取(' + n + 's)'
          } else {
            this.getPhoneIntval = null
            clearInterval(this.getPhoneIntval)
            this.phoneCode = '获取验证码'
            this.isGetphone = false
          }
        }, 1000)
      },
      handleReister() {
        this.$refs['registerForm'].validate(async (valid) => {
          if (valid) {
            if (this.form.loginKey != this.form.confirmPwd) {
              this.$message({
                message: '密码不一致，请重新输入',
                type: 'warning',
              })
              return
            }
            const data = await loginApi.register(this.form)
          }
        })
      },
      handleSetStep(active, form) {
        this.active = active
        if (form) this.form = Object.assign(this.form, form)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .pay-container {
    width: 70vw;
    height: 50vh;
    .steps {
      justify-content: center;
      margin-bottom: 20px;
    }
  }
  .findPwd-container {
    height: 100vh;
    background: url('~@/assets/login_images/background.jpg') center center fixed
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }
  }
</style>
