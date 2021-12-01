/**
 * @name contract
 * @description 智能合约模块
 */
import { ReqParams, ReqDeployTy, ResDetailTy, ResResult } from './model';
import { get, post } from '/@/utils/http';

enum URL {
  list = '/v1/contract/list',
  deploy = '/v1/contract/deploy',
  detail = '/v1/contract/detail',
}

const list = async (params: ReqParams) => get<ResResult>({ url: URL.list, params });

const detail = async (params: { id: number }) => get<ResDetailTy>({ url: URL.detail, params });

const deploy = async (data: ReqDeployTy) => post({ url: URL.deploy, data });

export default { list, detail, deploy };
