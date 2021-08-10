<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">系统配置</div>
        <div class="ck_buttons"></div>
      </div>
    </div>
    <div class="config_wrapper">
      <el-tabs
        v-model="activeName"
        style="
          margin-left: 20px;
          margin-top: 20px;
          margin-right: 20px;
          height: 10%;
        "
      >
        <el-tab-pane label="文件上传配置" name="1"></el-tab-pane>
        <el-tab-pane label="支付配置" name="2"></el-tab-pane>
        <el-tab-pane label="短信配置" name="3"></el-tab-pane>
        <el-tab-pane label="登录配置" name="4"></el-tab-pane>
      </el-tabs>
      <div v-if="activeName == 1" class="config_main">
        <el-form label-position="right" label-width="120px" :model="ossForm">
          <el-form-item label="储存桶名" prop="bucket" required>
            <el-input v-model="ossForm.bucket" clearable></el-input>
          </el-form-item>
          <el-form-item label="访问域名" prop="endpoint" required>
            <el-input v-model="ossForm.endpoint" clearable></el-input>
          </el-form-item>
          <el-form-item label="访问密钥" prop="accessKeyId" required>
            <el-input v-model="ossForm.accessKeyId" clearable></el-input>
          </el-form-item>
          <el-form-item label="访问密钥Secret" prop="accessKeySecret" required>
            <el-input v-model="ossForm.accessKeySecret" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="timeAdd" required>
            <el-input v-model="ossForm.timeAdd" clearable></el-input>
          </el-form-item>
          <el-form-item label="最后更新时间" prop="timeLastUpdate" required>
            <el-input v-model="ossForm.timeLastUpdate" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state" required>
            <el-radio-group v-model="ossForm.state">
              <el-radio :label="0" value="0">开启</el-radio>
              <el-radio :label="1" value="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ossUpdate">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeName == 2" class="config_main">
        <el-tabs v-model="paysetName" type="card">
          <el-tab-pane label="微信支付配置" name="1">
            <el-form
              label-position="right"
              label-width="120px"
              :model="wechatPayForm"
            >
              <el-form-item label="appid" prop="appid" required>
                <el-input v-model="wechatPayForm.appid" clearable></el-input>
              </el-form-item>
              <el-form-item label="私钥" prop="privateKey" required>
                <el-input
                  v-model="wechatPayForm.privateKey"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="商户号" prop="mchid" required>
                <el-input v-model="wechatPayForm.mchid" clearable></el-input>
              </el-form-item>
              <el-form-item label="商户证书序列号" prop="mchSerialNo" required>
                <el-input
                  v-model="wechatPayForm.mchSerialNo"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="v3密钥" prop="apiV3Key" required>
                <el-input v-model="wechatPayForm.apiV3Key" clearable></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd" required>
                <el-input v-model="wechatPayForm.timeAdd" clearable></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate" required>
                <el-input
                  v-model="wechatPayForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state" required>
                <el-radio-group v-model="wechatPayForm.state">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="wechatPayUpdate">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="支付宝支付配置" name="2">
            <el-form
              label-position="right"
              label-width="120px"
              :model="AliPayForm"
            >
              <el-form-item label="appid" prop="appId" required>
                <el-input v-model="AliPayForm.appId" clearable></el-input>
              </el-form-item>
              <el-form-item label="应用私钥" prop="appPrivateKey" required>
                <el-input
                  v-model="AliPayForm.appPrivateKey"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="支付宝公钥" prop="alipayPublicKey" required>
                <el-input
                  v-model="AliPayForm.alipayPublicKey"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd" required>
                <el-input v-model="AliPayForm.timeAdd" clearable></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate" required>
                <el-input
                  v-model="AliPayForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state" required>
                <el-radio-group v-model="AliPayForm.state">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="AliPayUpdate">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName == 3" class="config_main">
        <el-form label-position="right" label-width="120px" :model="smsForm">
          <el-form-item label="用户名" prop="apId" required>
            <el-input v-model="smsForm.apId" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="secretKey" required>
            <el-input v-model="smsForm.secretKey" clearable></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="ecName" required>
            <el-input v-model="smsForm.ecName" clearable></el-input>
          </el-form-item>
          <el-form-item label="签名编码" prop="sign" required>
            <el-input v-model="smsForm.sign" clearable></el-input>
          </el-form-item>
          <el-form-item label="协议" prop="agreement" required>
            <el-input v-model="smsForm.agreement" clearable></el-input>
          </el-form-item>
          <el-form-item label="模板id" prop="templateId" required>
            <el-select
              v-model="smsForm.templateId"
              placeholder="请选择短信模板"
            >
              <el-option
                v-for="item in smsTemplateIds"
                :key="item.aid"
                :label="item.name"
                :value="item.templateCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板短信URL" prop="templateUrl" required>
            <el-input v-model="smsForm.templateUrl" clearable></el-input>
          </el-form-item>
          <el-form-item label="拓展码" prop="addSerial" required>
            <el-input v-model="smsForm.addSerial" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="timeAdd" required>
            <el-input v-model="smsForm.timeAdd" clearable></el-input>
          </el-form-item>
          <el-form-item label="最后更新时间" prop="timeLastUpdate" required>
            <el-input v-model="smsForm.timeLastUpdate" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否开启" prop="isOpen" required>
            <el-radio-group v-model="smsForm.isOpen">
              <el-radio :label="0" value="0">开启</el-radio>
              <el-radio :label="1" value="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="smsUpdate">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeName == 4" class="config_main">
        <el-tabs v-model="loginName" type="card">
          <el-tab-pane label="微信登录配置" name="1">
            <el-form
              label-position="right"
              label-width="120px"
              :model="wechatLoginForm"
            >
              <el-form-item label="appid" prop="appid" required>
                <el-input v-model="wechatLoginForm.appid" clearable></el-input>
              </el-form-item>
              <el-form-item label="密钥" prop="secret" required>
                <el-input v-model="wechatLoginForm.secret" clearable></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd" required>
                <el-input
                  v-model="wechatLoginForm.timeAdd"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate" required>
                <el-input
                  v-model="wechatLoginForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state" required>
                <el-radio-group v-model="wechatLoginForm.state">
                  <el-radio label="0" value="0">开启</el-radio>
                  <el-radio label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="wechatLoginUpdate">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="小程序登录配置" name="2">
            <el-form
              label-position="right"
              label-width="120px"
              :model="appletLoginForm"
            >
              <el-form-item label="小程序ID" prop="appId" required>
                <el-input v-model="appletLoginForm.appId" clearable></el-input>
              </el-form-item>
              <el-form-item label="小程序密钥" prop="appSecret" required>
                <el-input
                  v-model="appletLoginForm.appSecret"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="小程序名称" prop="name" required>
                <el-input v-model="appletLoginForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd" required>
                <el-input
                  v-model="appletLoginForm.timeAdd"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate" required>
                <el-input
                  v-model="appletLoginForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state" required>
                <el-radio-group v-model="appletLoginForm.state">
                  <el-radio label="0" value="0">开启</el-radio>
                  <el-radio label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="appletLoginUpdate">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="LOGO配置" name="3">
            <el-form
              label-position="right"
              label-width="120px"
              :model="logoForm"
            >
              <el-form-item label="LOGO" prop="logo" required>
                <el-upload
                  ref="logoUpload"
                  class="logo-uploader"
                  action="http://localhost/api/pc/oss/upload"
                  :limit="1"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessLogo"
                  :before-upload="beforeAvatarUpload"
                  :data="{ module: 'img' }"
                >
                  <img
                    v-if="logoForm.logo"
                    :src="logoForm.logo"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="logoUpdate">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import { sysApi } from '@/api/index'
  import './index.scss'
  import moment from 'moment'
  export default {
    name: 'SystemConfig',
    data() {
      return {
        moment,
        activeName: '1',
        fileUploadName: '1',
        paysetName: '1',
        loginName: '1',
        Form: {
          name: '',
        },
        logoForm: {
          aid: '',
          logo: '',
        },
        ossForm: {
          aid: '',
          bucket: '',
          endpoint: '',
          accessKeyId: '',
          accessKeySecret: '',
          timeAdd: '',
          timeLastUpdate: '',
          state: '',
        },
        wechatPayForm: {
          aid: '',
          appid: '',
          privateKey: '',
          mchid: '',
          mchSerialNo: '',
          apiV3Key: '',
          timeAdd: '',
          timeLastUpdate: '',
          state: '',
        },
        AliPayForm: {
          aid: '',
          appid: '',
          appPrivateKey: '',
          alipayPublicKey: '',
          timeAdd: '',
          timeLastUpdate: '',
          state: '',
        },
        smsForm: {
          aid: '',
          apId: '',
          secretKey: '',
          ecName: '',
          sign: '',
          agreement: '',
          templateUrl: '',
          templateId: '',
          addSerial: '',
          timeAdd: '',
          timeLastUpdate: '',
          isOpen: '',
        },
        smsTemplateIds: [],
        wechatLoginForm: {
          aid: '',
          appid: '',
          secret: '',
          timeAdd: '',
          timeLastUpdate: '',
          state: '',
        },
        appletLoginForm: {
          aid: '',
          appId: '',
          appSecret: '',
          name: '',
          timeAdd: '',
          timeLastUpdate: '',
          state: '',
        },
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    created() {},
    mounted() {
      this.getLogoConfig()
      this.getOssConfig()
      this.getwechatPayConfig()
      this.getAliPayConfig()
      this.getSmsConfig()
      this.getSmsTemplate()
      this.getwechatLoginConfig()
      this.getAppletLoginConfig()
    },
    methods: {
      //LOGO配置
      async getLogoConfig() {
        const { data } = await sysApi.getAppLogo()
        if (data) {
          this.logoForm = data
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      handleAvatarSuccessLogo(response, file, fileList) {
        this.logoForm.logo = response.message
        this.$refs.logoUpload.clearFiles()
        this.$notify({
          title: '上传成功',
          type: 'success',
          duration: 2500,
        })
      },
      beforeAvatarUpload(file) {
        let isLt2M = true
        isLt2M = file.size / 1024 / 1024 < 100
        if (!isLt2M) {
          this.loading = false
          this.$message.error('上传文件大小不能超过 100MB!')
        }
        this.filename = file.name
        return isLt2M
      },
      async logoUpdate() {
        const res = await sysApi.updateAppLogo(this.logoForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //上传配置
      async getOssConfig() {
        const { data } = await sysApi.getOss()
        if (data) {
          console.log(data)
          this.ossForm = data
          this.ossForm.timeAdd = moment(data.timeAdd).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.ossForm.timeLastUpdate = moment(data.timeLastUpdate).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async ossUpdate() {
        this.ossForm.state = String(this.ossForm.state)
        const res = await sysApi.updateOss(this.ossForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //微信支付配置
      async getwechatPayConfig() {
        const { data } = await sysApi.getWechatPay()
        if (data) {
          console.log(data)
          this.wechatPayForm = data
          this.wechatPayForm.timeAdd = moment(data.timeAdd).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.wechatPayForm.timeLastUpdate = moment(
            data.timeLastUpdate
          ).format('YYYY-MM-DD HH:mm:ss')
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async wechatPayUpdate() {
        this.wechatPayForm.state = String(this.wechatPayForm.state)
        const res = await sysApi.updateWechatPay(this.wechatPayForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //支付宝支付配置
      async getAliPayConfig() {
        const { data } = await sysApi.getAliPay()
        if (data) {
          console.log(data)
          this.AliPayForm = data
          this.AliPayForm.timeAdd = moment(data.timeAdd).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.AliPayForm.timeLastUpdate = moment(data.timeLastUpdate).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async AliPayUpdate() {
        this.AliPayForm.state = String(this.AliPayForm.state)
        const res = await sysApi.updateAliPay(this.AliPayForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //获取短信配置
      async getSmsConfig() {
        const { data } = await sysApi.getSms()
        if (data) {
          console.log(data)
          this.smsForm = data
          this.smsForm.timeAdd = moment(data.timeAdd).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.smsForm.timeLastUpdate = moment(data.timeLastUpdate).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async getSmsTemplate() {
        const { data } = await sysApi.getSmsList()
        if (data) {
          data.forEach((v) => {
            this.smsTemplateIds.push({
              aid: v.aid,
              name: v.name,
              templateCode: v.templateCode,
            })
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async smsUpdate() {
        this.smsForm.state = String(this.smsForm.state)
        const res = await sysApi.updateAliPay(this.smsForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //微信登录配置
      async getwechatLoginConfig() {
        const { data } = await sysApi.getWechatLogin()
        if (data) {
          console.log(data)
          this.wechatLoginForm = data
          this.wechatLoginForm.timeAdd = moment(data.timeAdd).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.wechatLoginForm.timeLastUpdate = moment(
            data.timeLastUpdate
          ).format('YYYY-MM-DD HH:mm:ss')
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async wechatLoginUpdate() {
        this.wechatLoginForm.state = String(this.wechatLoginForm.state)
        const res = await sysApi.updateWechatLogin(this.wechatLoginForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      //小程序登录配置
      async getAppletLoginConfig() {
        const { data } = await sysApi.getAppletLogin()
        if (data) {
          console.log(data)
          this.appletLoginForm = data
          this.appletLoginForm.timeAdd = moment(data.timeAdd).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.appletLoginForm.timeLastUpdate = moment(
            data.timeLastUpdate
          ).format('YYYY-MM-DD HH:mm:ss')
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
      async appletLoginUpdate() {
        this.appletLoginForm.state = String(this.appletLoginForm.state)
        const res = await sysApi.updateAppletLogin(this.appletLoginForm)
        if (res) {
          this.$message({
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: '接口未返回数据',
            type: 'warning',
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  .logo-uploader {
    .el-upload {
      width: 150px;
      height: 150px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 10px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  }
  .avatar-uploader-system {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 18px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }
  }
</style>
