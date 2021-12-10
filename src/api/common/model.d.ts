export interface ReqParams {
  limit: number;
  page: number;
}

export interface ResResult {
  id: number;
  url: string;
  ip: string;
  protocol: string;
  host: number;
  domain: string;
  email: string;
}
