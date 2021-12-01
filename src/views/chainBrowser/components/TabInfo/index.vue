<template>
  <a-card>
    <a-tabs class="tabs-box" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="区块信息">
        <Block />
      </a-tab-pane>
      <a-tab-pane key="2" tab="交易信息">
        <Trading />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script setup lang="ts">
  import Block from './Block.vue';
  import Trading from './Trading.vue';
  const activeKey = ref('1');
</script>
<style lang="less" scoped>
  .tabs-box {
    & :deep(.ant-tabs-tab) {
      font-size: 18px;
      padding: 0 0 15px 0;
    }
    & :deep(.ant-tabs-bar) {
      margin-bottom: 30px;
    }
  }
</style>
