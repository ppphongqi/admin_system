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
        <el-tab-pane label="应用端配置" name="1"></el-tab-pane>
        <el-tab-pane label="文件上传配置" name="2"></el-tab-pane>
        <el-tab-pane label="支付配置" name="3"></el-tab-pane>
        <el-tab-pane label="短信配置" name="4"></el-tab-pane>
        <el-tab-pane label="登录配置" name="5"></el-tab-pane>
      </el-tabs>
      <div v-if="activeName == 1" class="config_main">
        <el-tabs v-model="AppsetName" type="border-card">
          <el-tab-pane label="公众号配置" name="1">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="AppId" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="AppSecret" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="微信验证Token" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="EncodingAESKey" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="消息加密方式" prop="" required>
                <el-radio-group v-model="Form.name">
                  <el-radio :label="0" value="0">明文模式</el-radio>
                  <el-radio :label="1" value="1">兼容模式</el-radio>
                  <el-radio :label="2" value="2">安全模式</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="微信分享图片" prop="" required>
                <div class="upload_wrapper">
                  <el-upload
                    class="avatar-uploader-system"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item label="公众号关联二维码" prop="" required>
                <div class="upload_wrapper">
                  <el-upload
                    class="avatar-uploader-system"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item label="微信分享标题" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="微信分享简介" prop="" required>
                <el-input
                  v-model="Form.name"
                  type="textarea"
                  :rows="3"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户默认头像" prop="" required>
                <div class="upload_wrapper">
                  <el-upload
                    class="avatar-uploader-system"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="小程序配置" name="2">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="AppId" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="AppSecret" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="小程序名称" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="APP配置" name="3">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="AppId" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="AppSecret" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName == 2" class="config_main">
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
      <div v-if="activeName == 3" class="config_main">
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
      <div v-if="activeName == 4" class="config_main">
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
      <div v-if="activeName == 5" class="config_main">
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
          <el-tab-pane label="其他登录配置" name="2">
            <el-form label-position="right" label-width="120px" :model="Form">
              <el-form-item label="状态" prop="" required>
                <el-radio-group v-model="Form.name">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
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
        AppsetName: '1',
        fileUploadName: '1',
        paysetName: '1',
        loginName: '1',
        Form: {
          name: '',
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
      }
    },
    computed: {
      getTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    created() {},
    mounted() {
      this.getOssConfig()
      this.getwechatPayConfig()
      this.getAliPayConfig()
      this.getSmsConfig()
      this.getSmsTemplate()
      this.getwechatLoginConfig()
    },
    methods: {
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
    },
  }
</script>

<style lang="scss">
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
