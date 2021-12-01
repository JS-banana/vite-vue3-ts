import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/sys/role';
import { PermissionAll, ReqRoleCreate, ReqRoleUpdate } from '/@/api/sys/role/model';

type AuthlistTy = ReqRoleUpdate | null;
interface UserState {
  role: LabelValueOptions;
  authList: AuthlistTy;
  count: number;
  permission: PermissionAll;
}

export const useSysRoleStore = defineStore({
  id: 'sys-role',
  state: (): UserState => ({
    role: [],
    authList: null,
    // 已选中权限
    count: 0,
    // 查询到的权限
    permission: [],
  }),
  getters: {
    getRole(): LabelValueOptions {
      return this.role;
    },
    getAuthList(): AuthlistTy {
      return this.authList;
    },
    getCount(): number {
      return this.count;
    },
    getPermission(): PermissionAll {
      return this.permission;
    },
  },
  actions: {
    setRole(info: LabelValueOptions) {
      this.role = info;
    },
    setAuth(auth: AuthlistTy) {
      this.authList = auth;
    },
    setCount(count: number) {
      this.count = count;
    },
    setPermission(permission: PermissionAll) {
      this.permission = permission;
    },
    resetState() {
      this.role = [];
      this.count = 0;
      this.authList = null;
      this.permission = [];
    },

    /**
     * @description: fetchRole
     */
    async fetchRole() {
      const res = await fetchApi.role();
      if (res) {
        // 配合查询权限
        const options = res.map(({ id, name }) => ({ label: name, value: id }));
        this.setRole(options);
      }
    },

    /**
     * @name fetchDetail
     * @description: 获取角色权限详情
     */
    async fetchDetail(role_id: number) {
      const res = await fetchApi.detail({ role_id });
      if (res) {
        this.setAuth(res);
      }
    },

    /**
     * @name fetchCreate
     * @description: 创建角色
     */
    async fetchCreate(params: ReqRoleCreate) {
      const res = await fetchApi.create(params);
      return res !== undefined;
    },

    /**
     * @name fetchUpdate
     * @description: 修改角色
     */
    async fetchUpdate(params: ReqRoleUpdate) {
      const res = await fetchApi.update(params);
      return res !== undefined;
    },

    /**
     * @name fetchRemove
     * @description: 删除角色
     */
    async fetchRemove(role_id: number) {
      const res = await fetchApi.remove({ role_id });
      return res !== undefined;
    },

    /**
     * @name fetchPermissionSearch
     * @description: 查询权限
     */
    async fetchPermissionSearch(search: string) {
      const res = await fetchApi.permission_search({ search });
      if (res) {
        this.setPermission(res.list || []);
      }
    },
  },
});

// Need to be used outside the setup
export function useSysRoleStoreWithOut() {
  return useSysRoleStore(store);
}
