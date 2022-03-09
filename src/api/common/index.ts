import { ReqParams, ResResult } from './model';
import { get } from '/@/utils/http';

enum URL {
  page_one_list = '/v1/common/page_one/list',
}

const page_one_list = async (data: ReqParams) => get<ResResult>({ url: URL.page_one_list, data });

export default { page_one_list };
