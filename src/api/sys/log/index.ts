/**
 * 系统设置 - 角色模块
 */

import { get } from '/@/utils/http';

enum URL {
  list = '/v1/log/search',
}

const list = async (params: any) => get<any>({ url: URL.list, params });

export default { list };
