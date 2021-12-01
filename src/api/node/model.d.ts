export interface ReqParams {
  page: number;
  limit: number;
}

interface ResListItem {
  address: string;
  enode_id: string;
  id: number;
  ip: string;
  isSelf: boolean;
  nodeRole: string;
  node_name: string;
  port: string;
}

export interface ResResult {
  total: number;
  list: ResListItem[];
}
