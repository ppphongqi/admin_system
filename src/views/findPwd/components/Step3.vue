<template>
  <div>
    <div class="top-content">
      <vab-icon class="success" :icon="['fas', 'check-circle']"></vab-icon>
      <p>修改成功</p>
    </div>
    <div class="next-button-group">
      <el-button type="primary" @click="toLogin">去登录</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      toLogin() {
        this.$router.push({ path: '/login' })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .top-content {
    text-align: center;

    .success {
      display: block;
      margin: 20px auto 5px auto;
      font-size: 40px;
      color: $base-color-green;
    }
  }

  .next-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>
