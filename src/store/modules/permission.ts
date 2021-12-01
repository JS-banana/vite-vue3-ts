import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/user';
import fetchRoleApi from '/@/api/sys/role';
import { PermissionAll } from '/@/api/sys/role/model';
import { RouteRecordRaw } from 'vue-router';
import constantRoutes, { accessRoutes, publicRoutes } from '/@/router/router.config';
import { filterAsyncRoutes, filterModuleByAuths } from '/@/utils/permission';

interface PermissioState {
  isGetUserInfo: boolean; // 是否获取过用户信息
  isAdmin: 0 | 1; // 是否为管理员
  permission: PermissionAll; // 所有权限
  auths: string[]; // 当前用户权限
  modules: string[]; // 模块权限
}

export const usePermissioStore = defineStore({
  id: 'app-permission',
  state: (): PermissioState => ({
    // isGetUserInfo
    isGetUserInfo: false,
    // isAdmin
    isAdmin: 0,
    // permission all
    permission: [],
    // auths
    auths: [],
    // modules
    modules: [],
  }),
  getters: {
    getPermissionAll(): PermissionAll {
      return this.permission;
    },
    getAuths(): string[] {
      return this.auths;
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
    setAuth(auths: string[]) {
      this.auths = auths;
      const modules = filterModuleByAuths(this.getAuths);
      this.modules = modules;
      this.isGetUserInfo = true;
    },
    setIsAdmin(isAdmin: 0 | 1) {
      this.isAdmin = isAdmin;
    },
    setPermission(permission: PermissionAll) {
      this.permission = permission;
    },
    resetState() {
      this.isGetUserInfo = false;
      this.isAdmin = 0;
      this.auths = [];
      this.permission = [];
      this.modules = [];
    },

    /**
     * @name fetchAuths
     * @description 获取当前用户权限
     */
    async fetchAuths() {
      const res = await fetchApi.permission();
      if (res) {
        this.setAuth(res.auths);
        this.setIsAdmin(res.is_admin || 0);
      }
      return res;
    },

    /**
     * @name fetchPermissionAll
     * @description: 获取所有权限
     */
    async fetchPermissionAll() {
      const res = await fetchRoleApi.permission_all();
      if (res) {
        // {key:value} ==> [{label:'',value:'}]
        const result = res.list.map((n) => {
          const auth_list = Object.keys(n.auth_list).map((key) => ({
            label: n.auth_list[key],
            value: key,
          }));

          return {
            ...n,
            auth_list,
          };
        });
        //
        this.setPermission(result);
      }
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
  },
});

// Need to be used outside the setup
export function usePermissioStoreWithOut() {
  return usePermissioStore(store);
}
