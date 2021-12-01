/**
 * @name account
 * @description 系统设置 - 账户模块
 */

import { ReqAccount, ResAccount } from './model';
import { get, post } from '/@/utils/http';

enum URL {
  permission = '/v1/account/permission',
  update = '/v1/account/edit',
  account = '/v1/account/center',
}

// 账户权限
const permission = async (params: any) => get<any>({ url: URL.permission, params });

const account = async () => post<ResAccount>({ url: URL.account });

const update = async (data: ReqAccount) => post<any>({ url: URL.update, data });

export default { permission, account, update };
