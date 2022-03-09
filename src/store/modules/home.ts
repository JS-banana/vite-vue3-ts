import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/home';
import { ResInfoList } from '/@/api/home/model';

interface HomeState {
  info: Nullable<ResInfoList>;
}

export const useHomeStore = defineStore({
  id: 'app-home',
  state: (): HomeState => ({
    // info
    info: null,
  }),
  getters: {
    getInfo(): Nullable<ResInfoList> {
      return this.info || null;
    },
  },
  actions: {
    setInfo(info: Nullable<ResInfoList>) {
      this.info = info;
    },
    resetState() {
      this.info = null;
    },
    /**
     * @description: login
     */
    async fetchInfo() {
      const res = await fetchApi.info();
      if (res) {
        // save token
        this.setInfo(res);
      }
      return res;
    },
  },
});

// Need to be used outside the setup
export function useHomeStoreWithOut() {
  return useHomeStore(store);
}
