<template>
  <div class="login-container rowCC">
    <a-card class="login" :body-style="{ width: '1020px', height: '640px', padding: 0 }">
      <a-row class="login_row">
        <a-col :span="12" class="login_left">
          <div class="login_left_logo_box"> <img :src="logo" alt="" /> </div>
          <div class="login_left_logoBg_box">
            <h2>您好！</h2>
            <p>欢迎来到SimpleChain联盟链</p>
          </div>
        </a-col>
        <a-col :span="12" class="login_right">
          <div class="login_right_container">
            <div class="title_box">
              <h1 class="title"> SimpleChain联盟链 </h1>
              <span class="subTitle">基础版</span>
            </div>
            <div class="tips_box">
              <a-space :size="16">
                <span>区块链浏览器 </span>
                <span>节点</span>
                <span>合约</span>
              </a-space>
            </div>
            <!-- form -->
            <login-form />
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script setup lang="ts">
  import logo from '/@/assets/images/login_logo.png';
  import LoginForm from './Form.vue';
</script>
<style lang="less" scoped>
  .login-container {
    width: 100vw;
    height: 100vh;
    background: #f0f1f4;
    .login {
      &_row {
        height: 100%;
      }
      &_left {
        height: 100%;
        background: linear-gradient(135deg, #3860f4 0%, #00c3fd 100%);
        &_logo_box {
          height: 121px;
          line-height: 121px;
          img {
            margin-left: 46px;
          }
        }
        &_logoBg_box {
          height: 518px;
          padding-top: 100px;
          background: url('../../assets/images/login_bg.png') no-repeat;
          background-size: contain;
          padding-left: 53px;
          h2 {
            font-size: 40px;
            font-weight: 600;
            line-height: 56px;
            color: #ffffff;
          }
          p {
            font-size: 28px;
            font-weight: 400;
            line-height: 40px;
            color: #ffffff;
          }
        }
      }
      &_right {
        padding-top: 80px;
        &_container {
          width: 320px;
          margin: 0 auto;
        }
      }
    }
  }
  .tips_box {
    margin-top: 14px;
    font-size: 12px;
    color: #999999;
    opacity: 0.85;
    span {
      &::before {
        content: '\00b7';
        font-weight: 600;
        margin-right: 1px;
      }
    }
  }
  .title_box {
    display: flex;
    .title {
      font-size: 22px;
      color: #000000;
    }
    .subTitle {
      font-size: 22px;
      font-weight: 300;
      margin-left: 5px;
      color: rgba(51, 51, 51, 0.85);
    }
  }
</style>
