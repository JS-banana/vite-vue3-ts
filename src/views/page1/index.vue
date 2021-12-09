<template>
  <div class="node-conatiner">
    <h2 class="nc_title font18">节点管理</h2>
    <Table :url="fetchApi.list" :columns="columns" :hiddenFilter="true" />
  </div>
</template>
<script setup lang="ts">
  import { columns } from './constant';
  import fetchApi from '/@/api/node';
</script>
<style lang="less" scoped>
  .node-conatiner {
    .nc_title {
      margin-top: 6px;
      margin-bottom: 30px;
    }
  }
</style>
