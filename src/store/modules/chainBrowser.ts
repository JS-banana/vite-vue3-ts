/**
 * @name chainBrowser
 * @description 区块链浏览器
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/chainBrowser';
import { BlockDetailTy, ResInfo, ResNodeInfo } from '/@/api/chainBrowser/model';
import { router } from '/@/router';

type InfoTy = ResInfo | null;

interface State {
  info: InfoTy;
  nodeInfo: Nullable<ResNodeInfo>;
  blockDetailInfo: Nullable<BlockDetailTy>;
  transactionDetailInfo: Nullable<Indexable>;
}

export const useChainBrowserStore = defineStore({
  id: 'app-chainBrowser',
  state: (): State => ({
    info: null,
    nodeInfo: null,
    blockDetailInfo: null,
    transactionDetailInfo: null,
  }),
  getters: {
    getInfo(): InfoTy {
      return this.info;
    },
    getNodeInfo(): Nullable<ResNodeInfo> {
      return this.nodeInfo;
    },
    getBlockDetailInfo(): Nullable<BlockDetailTy> {
      return this.blockDetailInfo;
    },
    getTransactionDetailInfo(): Nullable<Indexable> {
      return this.transactionDetailInfo;
    },
  },
  actions: {
    setInfo(info: InfoTy) {
      this.info = info;
    },
    setNodeInfo(info: Nullable<ResNodeInfo>) {
      this.nodeInfo = info;
    },
    setBlockDetailInfo(info: Nullable<BlockDetailTy>) {
      this.blockDetailInfo = info;
    },
    setTransactionDetailInfo(info: Nullable<Indexable>) {
      this.transactionDetailInfo = info;
    },
    resetState() {
      this.info = null;
      this.nodeInfo = null;
      this.blockDetailInfo = null;
      this.transactionDetailInfo = null;
    },

    /**
     * @name fetchInfo
     * @description: 图表数据
     */
    async fetchInfo() {
      const res = await fetchApi.info();
      if (res) this.setInfo(res);
      return res !== undefined;
    },

    /**
     * @name fetchInfo
     * @description: 图表数据
     */
    async fetchNodeInfo() {
      const res = await fetchApi.nodeInfo();
      if (res) this.setNodeInfo(res);
      return res !== undefined;
    },

    /**
     * @name fetchSearch
     * @description: 搜索
     */
    async fetchSearch(search: string) {
      const res = await fetchApi.search({ search });
      if (res) {
        if (res.block) {
          // this.setBlockDetailInfo(res.block);
          router.push(`/app/chainBrowser/blockDetail/${res.block.hash}`);
        }

        if (res.transaction) {
          // this.setTransactionDetailInfo(res.transaction);
          router.push(`/app/chainBrowser/tradingDetail/${res.transaction.hash}`);
        }
      }
      return res !== undefined;
    },

    /**
     * @name fetchBlockDetail
     * @description: 获取区块详情
     */
    async fetchBlockDetail(hash: string) {
      const res = await fetchApi.blockDetail({ hash });
      if (res) this.setBlockDetailInfo(res);
      return res !== undefined;
    },

    /**
     * @name fetchTransactionDetail
     * @description: 获取交易详情
     */
    async fetchTransactionDetail(hash: string) {
      const res = await fetchApi.transactionDetail({ hash });
      if (res) this.setTransactionDetailInfo(res);
    },
  },
});

// Need to be used outside the setup
export function useChainBrowserStoreWithOut() {
  return useChainBrowserStore(store);
}
