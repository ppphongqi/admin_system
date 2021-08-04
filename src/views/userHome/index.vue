<template>
  <div class="page_wrapper">
    <div class="page_title">
      <div class="ck_title">
        <div class="ck_title">个人中心</div>
        <div class="ck_buttons"></div>
      </div>
    </div>
    <el-form
      :model="Form"
      label-width="120px"
      label-position="right"
      style="width: 70%; margin: 0 auto"
    >
      <el-form-item label="账号:" prop="phone">
        <el-input v-model="Form.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="name" required>
        <el-input v-model="Form.name"></el-input>
      </el-form-item>
      <el-form-item label="原始密码:" prop="password" required>
        <el-input v-model="Form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword" required>
        <el-input v-model="Form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码:" prop="reNewPassword" required>
        <el-input v-model="Form.reNewPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import './index.scss'
  export default {
    name: 'UserHome',
    data() {
      return {
        Form: {
          phone: 'demo',
          name: 'demo',
          password: '',
          newPassword: '',
          reNewPassword: '',
        },
      }
    },
    mounted() {},
    methods: {
      submit() {
        console.log('提交')
      },
    },
  }
</script>
