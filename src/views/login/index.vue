<template>
  <div class="login-container">
    <!-- <el-alert
      title="beautiful boys and girls欢迎加入vue-admin-beautifulQQ群：972435319"
      type="success"
      :closable="false"
      style="position: fixed"
    ></el-alert> -->
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <div class="login-form">
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到{{ title }}！</div>
          <el-form
            ref="phoneForm"
            :model="phoneForm"
            :rules="phoneRules"
            label-position="left"
          >
            <el-form-item style="margin-top: 40px" prop="phone">
              <span class="svg-container svg-container-admin">
                <vab-icon :icon="['fas', 'user']" />
              </span>
              <el-input
                v-model.trim="phoneForm.phone"
                v-focus
                placeholder="请输入账号"
                tabindex="1"
                type="text"
              />
            </el-form-item>
            <el-form-item prop="loginKey">
              <span class="svg-container">
                <vab-icon :icon="['fas', 'lock']" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model.trim="phoneForm.loginKey"
                :type="passwordType"
                tabindex="2"
                placeholder="请输入密码"
                @keyup.enter.native="handleLogin"
              />
              <span
                v-if="passwordType === 'password'"
                class="show-password"
                @click="handlePassword"
              >
                <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
              </span>
              <span v-else class="show-password" @click="handlePassword">
                <vab-icon :icon="['fas', 'eye']"></vab-icon>
              </span>
            </el-form-item>
            <el-form-item prop="verificationCode">
              <el-col :span="10">
                <span class="svg-container">
                  <vab-icon :icon="['fas', 'lock']" />
                </span>
                <el-input
                  ref="password"
                  v-model.trim="phoneForm.verificationCode"
                  tabindex="2"
                  placeholder="验证码"
                  @keyup.enter.native="handleLogin"
                />
              </el-col>
              <el-col :span="5">
                <img class="login_code" :src="image" />
              </el-col>
              <el-col :span="5">
                <div class="code_tips" @click.prevent="getCode">换一换</div>
              </el-col>
            </el-form-item>
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form>
          <!-- <el-tabs v-model="activeName" stretch>
            <el-tab-pane label="手机号登录" name="first">

            </el-tab-pane> -->
          <!-- <el-tab-pane label="短信登录" name="second">
              <el-form
                ref="codeForm"
                :model="codeForm"
                :rules="codeRules"
                label-position="left"
              >
                <el-form-item style="margin-top: 40px" prop="phone">
                  <span class="svg-container svg-container-admin">
                    <vab-icon :icon="['fas', 'user']" />
                  </span>
                  <el-input
                    v-model.trim="codeForm.phone"
                    v-focus
                    placeholder="请输入手机号"
                    tabindex="1"
                    type="text"
                  />
                </el-form-item>
                <el-form-item prop="code">
                  <span class="svg-container">
                    <vab-icon :icon="['fas', 'lock']" />
                  </span>
                  <el-input
                    v-model.trim="codeForm.code"
                    type="text"
                    placeholder="手机验证码"
                  ></el-input>
                  <el-button
                    type="primary"
                    class="show-pwd phone-code"
                    :disabled="isGetphone"
                    @click="getPhoneCode"
                  >
                    {{ phoneCode }}
                  </el-button>
                </el-form-item>
                <el-button
                  :loading="loading"
                  class="login-btn"
                  type="primary"
                  @click="handleLoginOfCode"
                >
                  登录
                </el-button>
              </el-form>
            </el-tab-pane> -->
          <!-- <el-tab-pane label="账号登录" name="third">
              <el-form
                ref="userNameForm"
                :model="userNameForm"
                :rules="userNameRules"
                label-position="left"
              >
                <el-form-item style="margin-top: 40px" prop="userName">
                  <span class="svg-container svg-container-admin">
                    <vab-icon :icon="['fas', 'user']" />
                  </span>
                  <el-input
                    v-model.trim="userNameForm.userName"
                    v-focus
                    placeholder="请输入用户名"
                    tabindex="1"
                    type="text"
                  />
                </el-form-item>
                <el-form-item prop="loginKey">
                  <span class="svg-container">
                    <vab-icon :icon="['fas', 'lock']" />
                  </span>
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model.trim="userNameForm.loginKey"
                    :type="passwordType"
                    tabindex="2"
                    placeholder="请输入密码"
                  />
                  <span
                    v-if="passwordType === 'password'"
                    class="show-password"
                    @click="handlePassword"
                  >
                    <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
                  </span>
                  <span v-else class="show-password" @click="handlePassword">
                    <vab-icon :icon="['fas', 'eye']"></vab-icon>
                  </span>
                </el-form-item>
                <el-form-item prop="verificationCode">
                  <el-col :span="10">
                    <span class="svg-container">
                      <vab-icon :icon="['fas', 'lock']" />
                    </span>
                    <el-input
                      ref="password"
                      v-model.trim="userNameForm.verificationCode"
                      tabindex="2"
                      placeholder="验证码"
                      @keyup.enter.native="handleLoginUserName"
                    />
                  </el-col>
                  <el-col :span="5">
                    <img class="login_code" :src="image" />
                  </el-col>
                  <el-col :span="5">
                    <div class="code_tips" @click.prevent="getCode">换一换</div>
                  </el-col>
                </el-form-item>
                <el-button
                  :loading="loading"
                  class="login-btn"
                  type="primary"
                  @click="handleLoginUserName"
                >
                  登录
                </el-button>
              </el-form>
            </el-tab-pane> -->
          <!-- <el-tab-pane label="邮箱登录" name="fourth">
              <el-form
                ref="emailForm"
                :model="emailForm"
                :rules="emailRules"
                label-position="left"
              >
                <el-form-item style="margin-top: 40px" prop="phone">
                  <span class="svg-container svg-container-admin">
                    <vab-icon :icon="['fas', 'user']" />
                  </span>
                  <el-input
                    v-model.trim="emailForm.email"
                    v-focus
                    placeholder="请输入用户名"
                    tabindex="1"
                    type="text"
                  />
                </el-form-item>
                <el-form-item prop="loginKey">
                  <span class="svg-container">
                    <vab-icon :icon="['fas', 'lock']" />
                  </span>
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model.trim="emailForm.loginKey"
                    :type="passwordType"
                    tabindex="2"
                    placeholder="请输入密码"
                    @keyup.enter.native="handleLoginEmail"
                  />
                  <span
                    v-if="passwordType === 'password'"
                    class="show-password"
                    @click="handlePassword"
                  >
                    <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
                  </span>
                  <span v-else class="show-password" @click="handlePassword">
                    <vab-icon :icon="['fas', 'eye']"></vab-icon>
                  </span>
                </el-form-item>
                <el-button
                  :loading="loading"
                  class="login-btn"
                  type="primary"
                  @click="handleLoginEmail"
                >
                  登录
                </el-button>
              </el-form>
            </el-tab-pane> -->
          <!-- </el-tabs> -->
          <el-row>
            <el-col :span="12">
              <!-- <router-link to="/register">
                <div style="margin-top: 20px">注册</div>
              </router-link> -->
            </el-col>
            <el-col :span="12">
              <router-link to="/findPwd">
                <div style="margin-top: 20px">忘记密码</div>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isPassword, isPhone } from '@/utils/validate'
  import { loginApi } from '../../api/index'
  export default {
    name: 'Login',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
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
      const validateVerification = (rule, value, callback) => {
        if ('' == value) {
          callback(new Error('验证码不能为空'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'first',
        isGetphone: false,
        getPhoneIntval: null,
        phoneCode: '获取验证码',
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        phoneForm: {
          phone: '',
          loginKey: '',
          verificationCode: '',
        },
        codeForm: {
          phone: '',
          code: '',
        },
        userNameForm: {
          userName: '',
          loginKey: '',
          verificationCode: '',
        },
        emailForm: {
          email: '',
          loginKey: '',
        },
        image: '',
        phoneRules: {
          phone: [
            {
              required: true,
              trigger: 'blur',
              validator: validateusername,
            },
          ],
          loginKey: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
          verificationCode: [
            {
              required: true,
              trigger: 'blur',
              validator: validateVerification,
            },
          ],
        },
        userNameRules: {
          userName: [
            {
              required: true,
              trigger: 'blur',
              validator: validateusername,
            },
          ],
          loginKey: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
          verificationCode: [
            {
              required: true,
              trigger: 'blur',
              validator: validateVerification,
            },
          ],
        },
        codeRules: {
          phone: [
            {
              required: true,
              trigger: 'blur',
              validator: validateusername,
            },
          ],
          code: [
            {
              required: true,
              trigger: 'blur',
              validator: validateVerification,
            },
          ],
        },
        emailRules: {
          email: [
            {
              required: true,
              trigger: 'blur',
              validator: validateusername,
            },
          ],
          loginKey: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = 'hidden'
      this.getCode()
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
      this.getPhoneIntval = null
      clearInterval(this.getPhoneIntval)
    },
    mounted() {
      this.phoneForm.phone = 'admin'
      this.phoneForm.loginKey = 'admin123456'
      // setTimeout(() => {
      //   this.handleLogin()
      // }, 3000)
    },
    methods: {
      getPhoneCode() {
        if (!isPhone(this.codeForm.phone)) {
          //this.$baseMessage('请输入手机号', 'error')
          this.$refs['codeForm'].validateField('phone')
          return
        }
        this.isGetphone = true
        loginApi.getMessageAuthenticationCode({ phone: this.codeForm.phone })
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
      handlePassword() {
        this.passwordType === 'password'
          ? (this.passwordType = '')
          : (this.passwordType = 'password')
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.phoneForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/login', this.phoneForm)
              .then(() => {
                // console.log('logining')
                const routerPath =
                  this.redirect === '/404' || this.redirect === '/401'
                    ? '/'
                    : this.redirect
                this.$router.push(routerPath).catch(() => {})
                // this.$router.push('/').catch(() => {})

                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
      handleLoginOfCode() {
        this.$refs.codeForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/loginCode', this.codeForm)
              .then(() => {
                // console.log('logining')
                const routerPath =
                  this.redirect === '/404' || this.redirect === '/401'
                    ? '/'
                    : this.redirect
                this.$router.push(routerPath).catch(() => {})
                // this.$router.push('/').catch(() => {})

                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
      handleLoginUserName() {
        this.$refs.userNameForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/loginUserName', this.userNameForm)
              .then(() => {
                // console.log('logining')
                const routerPath =
                  this.redirect === '/404' || this.redirect === '/401'
                    ? '/'
                    : this.redirect
                this.$router.push(routerPath).catch(() => {})
                // this.$router.push('/').catch(() => {})

                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
      handleLoginEmail() {
        this.$refs.emailForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/loginEmail', this.emailForm)
              .then(() => {
                // console.log('logining')
                const routerPath =
                  this.redirect === '/404' || this.redirect === '/401'
                    ? '/'
                    : this.redirect
                this.$router.push(routerPath).catch(() => {})
                // this.$router.push('/').catch(() => {})

                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },

      async getCode() {
        const res = await loginApi.getVerificationCode()
        const img = btoa(
          new Uint8Array(res).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        this.image = 'data:image/png;base64,' + img
        // console.log(res, '验证码')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url('~@/assets/login_images/background.jpg') center center fixed
      no-repeat;
    background-size: cover;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      margin-bottom: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 625px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }

      .phone-code {
        width: 120px;
        height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 3px;
      }
    }
    .show-pwd {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: $base-font-color;
      cursor: pointer;
      user-select: none;
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
  .login_code {
    width: 100%;
    border: 1px solid #d7dee3;
    margin-left: 10px;
  }
  .code_tips {
    text-decoration: underline;
    font-size: 20px;
    color: blue;
    margin-top: 10px;
    width: 80%;
    text-align: right;
    cursor: pointer;
  }
</style>
