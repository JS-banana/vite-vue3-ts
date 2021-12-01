/**
 * @name explorer
 * @description 区块链浏览器
 */
import {
  BlockDetailTy,
  ReqParams,
  ResInfo,
  ResNodeInfo,
  ResResult,
  ResSearchTy,
  ResTransaction,
} from './model';
import { get } from '/@/utils/http';

enum URL {
  blockList = '/v1/explorer/block',
  blockDetail = '/v1/explorer/block/detail',
  transactionList = '/v1/explorer/transactionListByAllBlock',
  transactionDetail = '/v1/explorer/transaction/detail',
  //
  info = '/v1/explorer/info',
  search = '/v1/explorer/search',
  nodeInfo = '/v1/explorer/nodeInfo',
}

const blockList = async (params: ReqParams) => get<ResResult>({ url: URL.blockList, params });

const transactionList = async (params: ReqParams) =>
  get<ResTransaction>({ url: URL.transactionList, params });

const blockDetail = async (params: { hash: string }) =>
  get<BlockDetailTy>({ url: URL.blockDetail, params });

const transactionDetail = async (params: { hash: string }) =>
  get<Indexable>({ url: URL.transactionDetail, params });

const search = async (params: { search: string }) => get<ResSearchTy>({ url: URL.search, params });

const nodeInfo = async () => get<ResNodeInfo>({ url: URL.nodeInfo });

const info = async () => get<ResInfo>({ url: URL.info });

export default {
  blockList,
  transactionList,
  blockDetail,
  transactionDetail,
  search,
  nodeInfo,
  info,
};
