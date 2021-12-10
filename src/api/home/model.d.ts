export interface ReqParams {
  limit: number;
  page: number;
}

export interface ResResult {
  id: string;
  title: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  age: number;
  color: string;
  email: string;
}

interface ResInfoListItem {
  id: number;
  num: number;
  time: string;
}

export interface ResInfoList {
  hu_num: number;
  yun_num: number;
  ce_num: number;
  create_time: number;
  online_num: number;
  total_num: number;
  seven_days: ResInfoListItem[];
}
