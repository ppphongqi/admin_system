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
        <el-tabs v-model="fileUploadName" type="card">
          <el-tab-pane label="基础配置" name="1">
            <el-form label-position="right" label-width="300px" :model="Form">
              <el-form-item label="本地图片域名" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="图片存储路径" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="允许上传图片后缀" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item
                label="允许上传最大图片(单位 M，最大值50 )"
                prop=""
                required
              >
                <el-input-number
                  v-model="Form.name"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="允许上传文件后缀" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item
                label="允许上传最大文件(单位 M，最大值500 )"
                prop=""
                required
              >
                <el-input-number
                  v-model="Form.name"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="文件存储" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="阿里云配置" name="2">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="空间域名 Domain" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="accessKey" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="secretKey" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="存储空间名称" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="所属地域" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="七牛云配置" name="3">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="空间域名 Domain" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="accessKey" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="qnSecretKey" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="存储空间名称" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="所属地域" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="腾讯云配置" name="4">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="空间域名 Domain" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="accessKey" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="secretKey" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="存储空间名称" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="所属地域" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName == 3" class="config_main">
        <el-tabs v-model="paysetName" type="card">
          <el-tab-pane label="微信支付配置" name="1">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="余额支付状态" prop="" required>
                <el-radio-group v-model="Form.name">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="配置目录" prop="" required>
                <el-input
                  v-model="Form.name"
                  type="textarea"
                  :rows="5"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="线下支付配置" name="2">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="线下支付状态" prop="" required>
                <el-radio-group v-model="Form.name">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="余额支付配置" name="3">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="余额支付状态" prop="" required>
                <el-radio-group v-model="Form.name">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="支付宝支付配置" name="4">
            <el-form label-position="right" label-width="150px" :model="Form">
              <el-form-item label="余额支付状态" prop="" required>
                <el-radio-group v-model="Form.name">
                  <el-radio :label="0" value="0">开启</el-radio>
                  <el-radio :label="1" value="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="支付应用Appid" prop="" required>
                <el-input v-model="Form.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="支付私钥" prop="" required>
                <el-input
                  v-model="Form.name"
                  type="textarea"
                  :rows="5"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="支付公钥" prop="" required>
                <el-input
                  v-model="Form.name"
                  type="textarea"
                  :rows="5"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import './index.scss'
  export default {
    name: 'SystemConfig',
    data() {
      return {
        activeName: '1',
        AppsetName: '1',
        fileUploadName: '1',
        paysetName: '1',
        Form: {
          name: '',
        },
      }
    },
    created() {},
    methods: {},
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
