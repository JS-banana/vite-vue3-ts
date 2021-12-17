<template>
  <a-card title="css variables">
    <a-alert message="主题换肤测试" type="info" />
    <a-divider />
    <a-card>
      <a-space>
        <a-button @click="changeMode('default')">默认</a-button>
        <a-button @click="changeMode('dark')" type="primary">暗黑</a-button>
      </a-space>
      <div class="page__bg" style="padding: 20px">
        <p style="color: green">这是一个未使用clss类的</p>
        <p class="post__title">这是一个使用了css variables 的 title</p>
      </div>
    </a-card>
  </a-card>
</template>
<script setup lang="ts">
  function changeMode(mode: 'default' | 'dark') {
    //
    document.body.className = mode === 'dark' ? 'theme-dark' : '';
  }
</script>
