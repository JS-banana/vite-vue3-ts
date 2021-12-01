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

export interface ReqDeployTy {
  contract_name: string;
  description: string;
  file_path: string;
}

export interface ResDetailTy {
  contract_address: string;
  contract_name: string;
  created: string;
  description: string;
  file_path: string;
  id: number;
  source_code: string;
  status: number;
}
