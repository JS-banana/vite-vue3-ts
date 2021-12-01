<template>
  <Table ref="ELRef" :url="fetch.blockList" :columns="columns" />
</template>
<script setup lang="ts">
  import { BlockColumns } from './constant';
  import fetch from '/@/api/chainBrowser';
  const columns = ref(BlockColumns);
</script>
