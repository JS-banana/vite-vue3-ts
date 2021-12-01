import { router } from '/@/router';
import { AuthEnum } from '/@/enums/authEnum';
import { usePermission } from '/@/hooks/usePermission';

const { hasPermission } = usePermission();

export const BlockColumns = [
  {
    title: '区块高度',
    dataIndex: 'number',
  },
  {
    title: '区块哈希',
    dataIndex: 'hash',
    customRender: ({ record }) =>
      hasPermission(AuthEnum.explorer_blockList) ? (
        <a onClick={() => router.push(`/app/chainBrowser/blockDetail/${record.hash}`)}>
          {record.hash}
        </a>
      ) : (
        <span>{record.hash}</span>
      ),
  },
  {
    title: '交易数',
    dataIndex: 'tx_nu',
  },
  {
    title: '区块生成时间',
    dataIndex: 'timestamp',
    slots: { customRender: 'toDateTime' },
  },
];

export const TradingColumns = [
  {
    title: '区块高度',
    dataIndex: 'blockNumber',
    width: 80,
  },
  {
    title: '交易哈希',
    dataIndex: 'hash',
    width: 200,
    customRender: ({ record }) =>
      hasPermission(AuthEnum.explorer_transactionList) ? (
        <a onClick={() => router.push(`/app/chainBrowser/tradingDetail/${record.hash}`)}>
          {record.hash}
        </a>
      ) : (
        <span>{record.hash}</span>
      ),
  },
  {
    title: '发送方',
    dataIndex: 'from',
    width: 200,
  },
  {
    title: '接收方',
    dataIndex: 'to',
    width: 200,
  },
  {
    title: '交易时间',
    dataIndex: 'timestamp',
    slots: { customRender: 'toDateTime' },
    width: 120,
  },
];
