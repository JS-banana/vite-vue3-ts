<template>
  <div class="login-container rowCC">
    <a-card class="login" :bordered="false" :body-style="{ width: '480px', padding: '30px 0' }">
      <div class="login_right_container">
        <div class="title_box">
          <h2 class="title">{{ APP_TITLE }}</h2>
        </div>
        <!-- form -->
        <login-form />
      </div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
  import LoginForm from './Form.vue';
  import { APP_TITLE } from '../../../config/constant';
</script>
<style lang="less" scoped>
  .login-container {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
    .login {
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
      // background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
      &_right {
        padding-top: 80px;
        &_container {
          width: 360px;
          margin: 0 auto;
        }
      }
    }
  }
  .title_box {
    display: flex;
    .title {
      font-size: 22px;
      color: #000000;
    }
  }
</style>
