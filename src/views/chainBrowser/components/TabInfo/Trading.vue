<template>
  <Table
    ref="ELRef"
    :url="fetch.transactionList"
    :columns="columns"
    :resKey="{ list: 'transactions_list' }"
  />
</template>
<script setup lang="ts">
  import { TradingColumns } from './constant';
  import fetch from '/@/api/chainBrowser';
  const columns = ref(TradingColumns);
</script>
