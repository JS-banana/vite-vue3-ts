import type { ColumnProps } from 'ant-design-vue/es/table/interface';
import { router } from '/@/router';
import { AuthEnum } from '/@/enums/authEnum';

export const columns: ColumnProps[] = [
  {
    title: '合约名称',
    dataIndex: 'contract_name',
  },
  {
    title: '合约地址',
    dataIndex: 'contract_address',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
    customRender: ({ record }) => (
      <a
        v-auth={AuthEnum.contract_detail}
        onClick={() => router.push(`/app/contract/detail/${record.id}`)}
      >
        查看详情
      </a>
    ),
  },
];
