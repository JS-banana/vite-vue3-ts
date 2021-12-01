<template>
  <div>
    <!-- search -->
    <a-card>
      <a-input-search
        size="large"
        class="search"
        @search="onSearch"
        placeholder="请输入区块高度、交易哈希、区块哈希"
      >
        <template #enterButton>
          <a-button style="width: 100px; height: 48px" class="search_btn" type="primary">
            <img :src="IconSerach" alt="" />
          </a-button>
        </template>
      </a-input-search>
    </a-card>
    <a-divider class="line" />
    <!-- chart -->
    <a-row :gutter="24">
      <a-col :span="12">
        <a-card :bordered="false">
          <DataOverview />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :bordered="false">
          <TradingHistory :loading="loading" />
        </a-card>
      </a-col>
    </a-row>
    <a-divider class="line" />
    <!--  -->
    <TabInfo />
  </div>
</template>
<script setup lang="ts">
  import IconSerach from '/@/assets/images/Icon _Search.png';
  import DataOverview from './components/DataOverview.vue';
  import TradingHistory from './components/TradingHistory.vue';
  import TabInfo from './components/TabInfo/index.vue';
  import { useChainBrowserStore } from '/@/store/modules/chainBrowser';

  const store = useChainBrowserStore();

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await store.fetchInfo();
    await store.fetchNodeInfo();
    loading.value = false;
  });

  onUnmounted(() => {
    store.resetState();
  });

  const onSearch = (val: string) => store.fetchSearch(val);
</script>
<style lang="less" scoped>
  .search {
    & :deep(.ant-input) {
      height: 48px;
    }
  }
</style>
