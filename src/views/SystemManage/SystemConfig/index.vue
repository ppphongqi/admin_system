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
        <el-form
          ref="ossForm"
          label-position="right"
          label-width="120px"
          :model="ossForm"
          :rules="ossFormRules"
        >
          <el-form-item label="储存桶名" prop="bucket">
            <el-input v-model="ossForm.bucket" clearable></el-input>
          </el-form-item>
          <el-form-item label="访问域名" prop="endpoint">
            <el-input v-model="ossForm.endpoint" clearable></el-input>
          </el-form-item>
          <el-form-item label="访问密钥" prop="accessKeyId">
            <el-input v-model="ossForm.accessKeyId" clearable></el-input>
          </el-form-item>
          <el-form-item label="访问密钥Secret" prop="accessKeySecret">
            <el-input v-model="ossForm.accessKeySecret" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="timeAdd">
            <el-input v-model="ossForm.timeAdd" clearable></el-input>
          </el-form-item>
          <el-form-item label="最后更新时间" prop="timeLastUpdate">
            <el-input v-model="ossForm.timeLastUpdate" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-radio-group v-model="ossForm.state">
              <el-radio :label="0" value="0">开启</el-radio>
              <el-radio :label="1" value="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitOssForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeName == 2" class="config_main">
        <el-tabs v-model="paysetName" type="card">
          <el-tab-pane label="微信支付配置" name="1">
            <el-form
              ref="wechatPayForm"
              label-position="right"
              label-width="120px"
              :model="wechatPayForm"
              :rules="wechatPayFormRules"
            >
              <el-form-item label="appid" prop="appid">
                <el-input v-model="wechatPayForm.appid" clearable></el-input>
              </el-form-item>
              <el-form-item label="私钥" prop="privateKey">
                <el-input
                  v-model="wechatPayForm.privateKey"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="商户号" prop="mchid">
                <el-input v-model="wechatPayForm.mchid" clearable></el-input>
              </el-form-item>
              <el-form-item label="商户证书序列号" prop="mchSerialNo">
                <el-input
                  v-model="wechatPayForm.mchSerialNo"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="v3密钥" prop="apiV3Key">
                <el-input v-model="wechatPayForm.apiV3Key" clearable></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd">
                <el-input v-model="wechatPayForm.timeAdd" clearable></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate">
                <el-input
                  v-model="wechatPayForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                <el-radio-group v-model="wechatPayForm.state">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitWechatPay">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="支付宝支付配置" name="2">
            <el-form
              ref="AliPayForm"
              label-position="right"
              label-width="120px"
              :model="AliPayForm"
              :rules="AliPayFormRules"
            >
              <el-form-item label="appid" prop="appId">
                <el-input v-model="AliPayForm.appId" clearable></el-input>
              </el-form-item>
              <el-form-item label="应用私钥" prop="appPrivateKey">
                <el-input
                  v-model="AliPayForm.appPrivateKey"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="支付宝公钥" prop="alipayPublicKey">
                <el-input
                  v-model="AliPayForm.alipayPublicKey"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd">
                <el-input v-model="AliPayForm.timeAdd" clearable></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate">
                <el-input
                  v-model="AliPayForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                <el-radio-group v-model="AliPayForm.state">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitAliPay">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName == 3" class="config_main">
        <el-form
          ref="smsForm"
          label-position="right"
          label-width="120px"
          :model="smsForm"
          :rules="smsFormRules"
        >
          <el-form-item label="用户名" prop="apId">
            <el-input v-model="smsForm.apId" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="secretKey">
            <el-input v-model="smsForm.secretKey" clearable></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="ecName">
            <el-input v-model="smsForm.ecName" clearable></el-input>
          </el-form-item>
          <el-form-item label="签名编码" prop="sign">
            <el-input v-model="smsForm.sign" clearable></el-input>
          </el-form-item>
          <el-form-item label="协议" prop="agreement">
            <el-input v-model="smsForm.agreement" clearable></el-input>
          </el-form-item>
          <el-form-item label="模板id" prop="templateId">
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
          <el-form-item label="模板短信URL" prop="templateUrl">
            <el-input v-model="smsForm.templateUrl" clearable></el-input>
          </el-form-item>
          <el-form-item label="拓展码" prop="addSerial">
            <el-input v-model="smsForm.addSerial" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="timeAdd">
            <el-input v-model="smsForm.timeAdd" clearable></el-input>
          </el-form-item>
          <el-form-item label="最后更新时间" prop="timeLastUpdate">
            <el-input v-model="smsForm.timeLastUpdate" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否开启" prop="isOpen">
            <el-radio-group v-model="smsForm.isOpen">
              <el-radio :label="0" value="0">开启</el-radio>
              <el-radio :label="1" value="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitSms">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="activeName == 4" class="config_main">
        <el-tabs v-model="loginName" type="card">
          <el-tab-pane label="微信登录配置" name="1">
            <el-form
              ref="wechatLoginForm"
              label-position="right"
              label-width="120px"
              :model="wechatLoginForm"
              :rules="wechatLoginFormRules"
            >
              <el-form-item label="appid" prop="appid">
                <el-input v-model="wechatLoginForm.appid" clearable></el-input>
              </el-form-item>
              <el-form-item label="密钥" prop="secret">
                <el-input v-model="wechatLoginForm.secret" clearable></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd">
                <el-input
                  v-model="wechatLoginForm.timeAdd"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate">
                <el-input
                  v-model="wechatLoginForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                <el-radio-group v-model="wechatLoginForm.state">
                  <el-radio label="0" value="0">开启</el-radio>
                  <el-radio label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitWechatLogin">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="小程序登录配置" name="2">
            <el-form
              ref="appletLoginForm"
              label-position="right"
              label-width="120px"
              :model="appletLoginForm"
              :rules="appletLoginFormRules"
            >
              <el-form-item label="小程序ID" prop="appId">
                <el-input v-model="appletLoginForm.appId" clearable></el-input>
              </el-form-item>
              <el-form-item label="小程序密钥" prop="appSecret">
                <el-input
                  v-model="appletLoginForm.appSecret"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="小程序名称" prop="name">
                <el-input v-model="appletLoginForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="timeAdd">
                <el-input
                  v-model="appletLoginForm.timeAdd"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="最后更新时间" prop="timeLastUpdate">
                <el-input
                  v-model="appletLoginForm.timeLastUpdate"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                <el-radio-group v-model="appletLoginForm.state">
                  <el-radio label="0" value="0">开启</el-radio>
                  <el-radio label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitAppletLogin">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="LOGO配置" name="3">
            <el-form
              ref="logoForm"
              label-position="right"
              label-width="120px"
              :model="logoForm"
              :rules="logoFormRules"
            >
              <el-form-item label="LOGO" prop="logo">
                <el-upload
                  ref="logoUpload"
                  class="logo-uploader"
                  :action="action"
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
                <el-button type="primary" @click="submitLogo">提交</el-button>
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
  import { baseURL } from '@/config'
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
        action: '',
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
        ossFormRules: {
          bucket: [
            { required: true, message: '请填写储存桶名', trigger: 'blur' },
          ],
          endpoint: [
            { required: true, message: '请填写访问域名', trigger: 'blur' },
          ],
          accessKeyId: [
            { required: true, message: '请填写访问密钥', trigger: 'blur' },
          ],
          accessKeySecret: [
            {
              required: true,
              message: '请填写访问密钥Secret',
              trigger: 'blur',
            },
          ],
          timeAdd: [
            { required: true, message: '请填写创建时间', trigger: 'blur' },
          ],
          timeLastUpdate: [
            { required: true, message: '请填写最后更新时间', trigger: 'blur' },
          ],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        },
        wechatPayFormRules: {
          appid: [{ required: true, message: '请填写appid', trigger: 'blur' }],
          privateKey: [
            { required: true, message: '请填写私钥', trigger: 'blur' },
          ],
          mchid: [{ required: true, message: '请填写商户号', trigger: 'blur' }],
          mchSerialNo: [
            {
              required: true,
              message: '请填写商户证书序列号',
              trigger: 'blur',
            },
          ],
          apiV3Key: [
            { required: true, message: '请填写v3密钥', trigger: 'blur' },
          ],
          timeAdd: [
            { required: true, message: '请填写创建时间', trigger: 'blur' },
          ],
          timeLastUpdate: [
            { required: true, message: '请填写最后更新时间', trigger: 'blur' },
          ],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        },
        AliPayFormRules: {
          appId: [{ required: true, message: '请填写appid', trigger: 'blur' }],
          appPrivateKey: [
            { required: true, message: '请填写应用私钥', trigger: 'blur' },
          ],
          alipayPublicKey: [
            { required: true, message: '请填写支付宝公钥', trigger: 'blur' },
          ],
          timeAdd: [
            { required: true, message: '请填写创建时间', trigger: 'blur' },
          ],
          timeLastUpdate: [
            { required: true, message: '请填写最后更新时间', trigger: 'blur' },
          ],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        },
        smsFormRules: {
          apId: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
          secretKey: [
            { required: true, message: '请填写用户密码', trigger: 'blur' },
          ],
          ecName: [
            { required: true, message: '请填写公司名称', trigger: 'blur' },
          ],
          sign: [
            { required: true, message: '请填写签名编码', trigger: 'blur' },
          ],
          agreement: [
            { required: true, message: '请填写协议', trigger: 'blur' },
          ],
          templateId: [
            { required: true, message: '请选择模板id', trigger: 'change' },
          ],
          templateUrl: [
            { required: true, message: '请填写模板短信URL', trigger: 'blur' },
          ],
          // addSerial: [
          //   { required: true, message: '请填写拓展码', trigger: 'blur' },
          // ],
          timeAdd: [
            { required: true, message: '请填写创建时间', trigger: 'blur' },
          ],
          timeLastUpdate: [
            { required: true, message: '请填写最后更新时间', trigger: 'blur' },
          ],
          isOpen: [
            { required: true, message: '请选择状态', trigger: 'change' },
          ],
        },
        wechatLoginFormRules: {
          appid: [{ required: true, message: '请填写appid', trigger: 'blur' }],
          secret: [{ required: true, message: '请填写密钥', trigger: 'blur' }],
          timeAdd: [
            { required: true, message: '请填写创建时间', trigger: 'blur' },
          ],
          timeLastUpdate: [
            { required: true, message: '请填写最后更新时间', trigger: 'blur' },
          ],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        },
        appletLoginFormRules: {
          appId: [{ required: true, message: '请填写appid', trigger: 'blur' }],
          appSecret: [
            { required: true, message: '请填写小程序密钥', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请填写小程序名称', trigger: 'blur' },
          ],
          timeAdd: [
            { required: true, message: '请填写创建时间', trigger: 'blur' },
          ],
          timeLastUpdate: [
            { required: true, message: '请填写最后更新时间', trigger: 'blur' },
          ],
          state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        },
        logoFormRules: {
          logo: [{ required: true, message: '请上传logo', trigger: 'change' }],
        },
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    created() {
      this.action = baseURL + '/pc/oss/upload'
    },
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
      submitLogo() {
        this.$refs.logoForm.validate((valid) => {
          if (valid) {
            this.logoUpdate()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      submitOssForm() {
        this.$refs.ossForm.validate((valid) => {
          if (valid) {
            this.ossUpdate()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      submitwechatPay() {
        this.$refs.wechatPayForm.validate((valid) => {
          if (valid) {
            this.wechatPayUpdate()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      submitAliPay() {
        this.$refs.AliPayForm.validate((valid) => {
          if (valid) {
            this.AliPayUpdate()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      submitSms() {
        this.$refs.smsForm.validate((valid) => {
          if (valid) {
            this.smsUpdate()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      submitWechatLogin() {
        this.$refs.wechatLoginForm.validate((valid) => {
          if (valid) {
            this.wechatLoginUpdate()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      submitAppletLogin() {
        this.$refs.appletLoginForm.validate((valid) => {
          if (valid) {
            this.appletLoginUpdate()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
