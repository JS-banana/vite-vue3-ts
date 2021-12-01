/**
 * @name node
 * @description 节点模块
 */
import { ReqParams, ResResult } from './model';
import { get } from '/@/utils/http';

enum URL {
  list = '/v1/node/nodelist',
}

const list = async (params: ReqParams) => get<ResResult>({ url: URL.list, params });

export default { list };
