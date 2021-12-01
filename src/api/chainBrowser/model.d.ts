export interface ReqParams {
  page: number;
  limit: number;
}

interface ResListItem {
  contract_address: string;
  contract_name: string;
  created: string;
  description: string;
  file_path: string;
  id: number;
  source_code: string;
  status: number;
}

export interface ResResult {
  total: number;
  list: ResListItem[];
}

interface ResTransactionItem {
  blockNumber: string;
  from: string;
  hash: string;
  id: number;
  status: number;
  timestamp: string;
  to: string;
}
export interface ResTransaction {
  total: number;
  transactions_list: ResTransactionItem[];
}

type SevenDays = Array<{
  block_sum: number;
  id: number;
  time: string;
  transaction_sum: number;
}>;
export interface ResInfo {
  block_sum: number;
  contract_sum: number;
  create_time: number;
  seven_days: SevenDays;
  tx_sum: number;
}

export interface BlockDetailTy extends Indexable {
  number: number;
  hash: string;
  parentHash: string;
  timestamp: string;
}

type ResSearchTy = { block?: BlockDetailTy; transaction?: Indexable };

export interface ResNodeInfo {
  consensus: string;
  online_node_num: number;
  total_node_num: number;
}
