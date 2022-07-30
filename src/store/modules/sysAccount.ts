/**
 * @name sysAccount
 * @description 系统设置-账户模块
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/sys/account';
import { ReqAccount, ResAccount } from '/@/api/sys/account/model';
// import { encryptByDES } from '/@/utils/crypto';

type AccountInfoTy = ResAccount | null;

interface UserState {
  info: AccountInfoTy;
}

export const useSysAccountStore = defineStore({
  id: 'sys-account',
  state: (): UserState => ({
    info: null,
  }),
  getters: {
    getAccount(): AccountInfoTy {
      return this.info;
    },
  },
  actions: {
    setAccount(info: AccountInfoTy) {
      this.info = info;
    },
    resetState() {
      this.info = null;
    },

    /**
     * @description: fetchRole
     */
    async fetchAccount() {
      const res = await fetchApi.account();
      if (res) {
        this.setAccount(res);
      }
      return res !== undefined;
    },

    /**
     * @description: fetchAccountUpdate
     */
    async fetchAccountUpdate(params: ReqAccount) {
      // if (params.password) {
      //   params.password = encryptByDES(params.password);
      // }
      const res = await fetchApi.update(params);
      return res !== undefined;
    },
  },
});

// Need to be used outside the setup
export function useSysAccountStoreWithOut() {
  return useSysAccountStore(store);
}
