import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/sys/user';
import { ReqUserCreate, ReqUserUpdate } from '/@/api/sys/user/model';
import { encryptByDES } from '/@/utils/crypto';

interface UserState {
  role: LabelValueOptions;
}

export const useSysUserStore = defineStore({
  id: 'sys-user',
  state: (): UserState => ({
    role: [],
  }),
  getters: {
    getRole(): LabelValueOptions {
      return this.role;
    },
  },
  actions: {
    setRole(info: LabelValueOptions) {
      console.log('info', info);
      this.role = info;
    },
    resetState() {
      this.role = [];
    },
    /**
     * @description: fetchRole
     */
    async fetchRole() {
      const res = await fetchApi.role();
      if (res) {
        const options = res.map(({ id, name }) => ({ label: name, value: id }));
        this.setRole(options);
      }
    },
    /**
     * @description: fetchDetail
     */
    async fetchDetail(id: number) {
      const res = await fetchApi.detail({ id });
      if (res) return res;
    },
    /**
     * @description: fetchCreate
     */
    async fetchCreate(params: ReqUserCreate) {
      params.password = encryptByDES(params.password);
      params.role_id = params.role_id || 0;
      const res = await fetchApi.create(params);
      return res !== undefined;
    },
    /**
     * @description: fetchUpdate
     */
    async fetchUpdate(params: ReqUserUpdate) {
      params.password = encryptByDES(params.password);
      params.role_id = params.role_id || 0;
      const res = await fetchApi.update(params);
      return res !== undefined;
    },
    /**
     * @description: fetchDelete
     */
    async fetchDelete(id: number) {
      const res = await fetchApi.remove({ id });
      return res !== undefined;
    },
  },
});

// Need to be used outside the setup
export function useSysUserStoreWithOut() {
  return useSysUserStore(store);
}
