<template>
  <div class="contract-conatiner">
    <div class="rowBC">
      <h2 class="cc_title font18">导航栏一</h2>
      <a-button
        type="primary"
        v-auth="AuthEnum.contract_create"
        @click="$router.push('/app/contract/add')"
        >新增</a-button
      >
    </div>
    <!-- <Table :url="fetchApi.list" :columns="columns" :hiddenFilter="true" /> -->
  </div>
</template>
<script setup lang="ts">
  // import { columns } from './constant';
  // import fetchApi from '/@/api/contract';
  // import { useContractStore } from '/@/store/modules/contract';
  import { AuthEnum } from '/@/enums/authEnum';

  // const store = useContractStore();

  // onUnmounted(() => {
  //   store.resetState();
  // });
</script>
<style lang="less" scoped>
  .contract-conatiner {
    .cc_title {
      margin-top: 6px;
      margin-bottom: 30px;
    }
  }
</style>
