/**
 * @name contract
 * @description 合约
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/contract';
import { ReqDeployTy, ResDetailTy } from '/@/api/contract/model';

interface State {
  info: Nullable<ResDetailTy>;
}

export const useContractStore = defineStore({
  id: 'app-contract',
  state: (): State => ({
    info: null,
  }),
  getters: {
    getInfo(): Nullable<ResDetailTy> {
      return this.info;
    },
  },
  actions: {
    setInfo(info: Nullable<ResDetailTy>) {
      this.info = info;
    },
    resetState() {
      this.info = null;
    },

    /**
     * @name fetchInfo
     * @description: 详情
     */
    async fetchInfo(id: number) {
      const res = await fetchApi.detail({ id });
      if (res) this.setInfo(res);
    },

    /**
     * @name fetchDeploy
     * @description: 部署合约
     */
    async fetchDeploy(params: ReqDeployTy) {
      const res = await fetchApi.deploy(params);
      if (res) this.setInfo(res);
      return res !== undefined;
    },
  },
});

// Need to be used outside the setup
export function useContractStoreWithOut() {
  return useContractStore(store);
}
