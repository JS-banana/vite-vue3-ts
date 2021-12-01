/**
 * 系统设置 - 用户模块
 */

import type {
  ReqUserCreate,
  ReqUserList,
  ReqUserRoleDownList,
  ReqUserUpdate,
  ResResult,
  ResResultItem,
} from './model';
import { get, post } from '/@/utils/http';

enum URL {
  list = '/v1/user/search',
  create = '/v1/user/create',
  delete = '/v1/user/delete',
  update = '/v1/user/update',
  detail = '/v1/user/detail',
  role = '/v1/user/role/down',
}

const list = async (params: ReqUserList) => get<ResResult>({ url: URL.list, params });

const detail = async (data: { id: number }) => post<ResResultItem>({ url: URL.detail, data });

const create = async (data: ReqUserCreate) => post<ResResult>({ url: URL.create, data });

const update = async (data: ReqUserUpdate) => post<ResResult>({ url: URL.update, data });

const remove = async (data: { id: number }) => post<ResResult>({ url: URL.delete, data });

const role = async () => get<ReqUserRoleDownList>({ url: URL.role });

export default { list, detail, create, update, remove, role };
