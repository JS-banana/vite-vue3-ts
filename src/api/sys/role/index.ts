/**
 * 系统设置 - 角色模块
 */

import { ReqUserRoleDownList } from '../user/model';
import type { PermissionAll, ReqRoleCreate, ReqRoleList, ReqRoleUpdate, ResResult } from './model';
import { get, post } from '/@/utils/http';

enum URL {
  list = '/v1/role/search',
  create = '/v1/role/create',
  update = '/v1/role/update',
  remove = '/v1/role/delete',
  detail = '/v1/role/detail',
  //
  role = '/v1/role/down',
  permission_all = '/v1/account/permission/all',
  permission_search = '/v1/role/permission/search',
}

const role = async () => get<ReqUserRoleDownList>({ url: URL.role });

const list = async (params: ReqRoleList) => post<ResResult>({ url: URL.list, params });

const create = async (data: ReqRoleCreate) => post({ url: URL.create, data });

const update = async (data: ReqRoleUpdate) => post({ url: URL.update, data });

const remove = async (data: { role_id: number }) => post({ url: URL.remove, data });

const detail = async (data: { role_id: number }) => post<ReqRoleUpdate>({ url: URL.detail, data });

const permission_all = async () => get<{ list: PermissionAll }>({ url: URL.permission_all });

const permission_search = async (params: { search: string }) =>
  get<{ list: PermissionAll }>({ url: URL.permission_search, params });

export default { role, list, create, update, remove, detail, permission_search, permission_all };
