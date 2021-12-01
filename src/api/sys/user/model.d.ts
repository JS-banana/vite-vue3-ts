export interface ResResultItem {
  account: string;
  created_at: string;
  id: number;
  mobile: string;
  role_name: string;
  status: number;
  true_name: string;
}

export interface ResResult {
  list: ResResultItem[];
  total: number;
}

export interface ReqUserList {
  search: string;
  role_id: number;
  page: number;
  limit: number;
}

export interface ReqUserUpdate {
  id: number;
  mobile: string;
  password: string;
  role_id: number | undefined;
  true_name: string;
}

export type ReqUserCreate = Omit<ReqUserUpdate, 'id'>;

export type ReqUserRoleDownList = Array<{ id: number; name: string }>;
