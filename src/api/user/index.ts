import { ReqAuth, ReqParams, ResResult } from './model';
import { get, post } from '/@/utils/http';

enum URL {
  login = '/v1/user/login',
  permission = '/v1/user/permission',
}

const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data });

const permission = async () => get<ReqAuth>({ url: URL.permission });

export default { login, permission };
