export interface ResResultItem {
  name: string;
  created_at: string;
  id: number;
  number: number;
  status: number;
  is_delete: number;
}

export interface ResResult {
  list: ResResultItem[];
  total: number;
}

export interface ReqRoleList {
  role_name: string;
  page: number;
  limit: number;
}

export type AuthListTy = Array<{ module: string; auths: Array<string[]> }>;
export interface ReqRoleUpdate {
  role_id: number;
  name: string;
  authList: AuthListTy;
}

export interface PermissionItem {
  module: string;
  module_name: string;
  auth_list: (string | CheckboxOptionType)[];
}

export type PermissionAll = PermissionItem[];

export type ReqRoleCreate = Omit<ReqRoleUpdate, 'role_id'>;
