import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/user';
import { RouteRecordRaw } from 'vue-router';
import constantRoutes, { accessRoutes, publicRoutes } from '/@/router/router.config';
import { filterAsyncRoutes } from '/@/utils/permission';

interface PermissioState {
  isGetUserInfo: boolean; // 是否获取过用户信息
  isAdmin: 0 | 1; // 是否为管理员
  auths: string[]; // 当前用户权限
  modules: string[]; // 模块权限
  role: 0 | 1;
}

export const usePermissioStore = defineStore({
  id: 'app-permission',
  state: (): PermissioState => ({
    // isGetUserInfo
    isGetUserInfo: false,
    // isAdmin
    isAdmin: 0,
    // auths
    auths: [],
    // modules
    modules: [],
    // role 0-银行 1-银保监
    role: 0,
  }),
  getters: {
    getAuths(): string[] {
      return this.auths;
    },
    getRole(): 0 | 1 {
      return this.role;
    },
    getModules(): string[] {
      return this.modules;
    },
    getIsAdmin(): 0 | 1 {
      return this.isAdmin;
    },
    getIsGetUserInfo(): boolean {
      return this.isGetUserInfo;
    },
  },
  actions: {
    setAuth(auths: string[], modules: string[]) {
      this.auths = auths;
      this.isGetUserInfo = true;
      this.modules = modules;
    },
    setIsAdmin(isAdmin: 0 | 1) {
      this.isAdmin = isAdmin;
    },
    resetState() {
      this.isGetUserInfo = false;
      this.isAdmin = 0;
      this.auths = [];
      this.modules = [];
      this.role = 0;
    },

    /**
     * @name fetchAuths
     * @description 获取当前用户权限
     */
    async fetchAuths() {
      const res = await fetchApi.permission();
      if (res) {
        this.setAuth(res.auths, res.modules);
        this.setIsAdmin(res.is_admin || 0);
      }
      return res;
    },

    /**
     * @name buildRoutesAction
     * @description: 获取路由
     */
    async buildRoutesAction(): Promise<RouteRecordRaw[]> {
      // 404 路由一定要放在 权限路由后面
      let routes: RouteRecordRaw[] = [...constantRoutes, ...accessRoutes, ...publicRoutes];

      if (this.getIsAdmin !== 1) {
        // 普通用户
        // 1. 方案一：过滤每个路由模块涉及的接口权限，判断是否展示该路由
        // 2. 方案二：直接检索接口权限列表是否包含该路由模块，不做细分，axios同一拦截
        routes = [
          ...constantRoutes,
          ...filterAsyncRoutes(accessRoutes, this.modules),
          ...publicRoutes,
        ];
      }

      return routes;
    },

    // /**
    //  * @name buildRoutesAction
    //  * @description: 获取路由
    //  */
    // buildRoutesAction(): RouteRecordRaw[] {
    //   // this.isGetUserInfo = true;
    //   this.setIsGetUserInfo(true);

    //   // 404 路由一定要放在 权限路由后面
    //   let routes: RouteRecordRaw[] = [...constantRoutes, ...accessRoutes, ...publicRoutes];

    //   // 1. 角色权限过滤：0-银行 1-银保监
    //   let filterRoutes = filterRouteByRole(cloneDeep(accessRoutes), this.role);
    //   // let filterRoutes = routes;

    //   // 2. 菜单权限过滤：
    //   // 管理员直接跳过
    //   if (this.getIsAdmin === 0) {
    //     const filterRoutesByAuth = filterAsyncRoutes(cloneDeep(filterRoutes), this.modules);
    //     filterRoutes = filterRoutesByAuth;
    //   }

    //   // 普通用户
    //   // 1. 方案一：过滤每个路由模块涉及的接口权限，判断是否展示该路由
    //   // 2. 方案二：直接检索接口权限列表是否包含该路由模块，不做细分，axios同一拦截
    //   routes = [...constantRoutes, ...filterRoutes, ...publicRoutes];

    //   return routes;
    // },
  },
});

// Need to be used outside the setup
export function usePermissioStoreWithOut() {
  return usePermissioStore(store);
}
