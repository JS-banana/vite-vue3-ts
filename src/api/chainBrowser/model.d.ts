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

type ResSearchTy = { block?: BlockDetailTy; transaction?: Indexable };
