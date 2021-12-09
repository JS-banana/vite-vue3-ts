/**
 * @name explorer
 * @description 区块链浏览器
 */
import { ResInfo, ResSearchTy } from './model';
import { get } from '/@/utils/http';

enum URL {
  //
  info = '/v1/home/info',
  search = '/v1/home/search',
}

const search = async (params: { search: string }) => get<ResSearchTy>({ url: URL.search, params });

const info = async () => get<ResInfo>({ url: URL.info });

export default {
  search,
  info,
};
