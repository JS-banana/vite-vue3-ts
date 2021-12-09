import { resultSuccess } from './_util';

const data = {
  block_sum: 42,
  tx_sum: 87755,
  contract_sum: 3,
  create_time: 1636352741,
  seven_days: [
    {
      id: 9,
      block_sum: 7,
      transaction_sum: 7,
      time: '20211130',
    },
    {
      id: 8,
      block_sum: 1,
      transaction_sum: 1,
      time: '20211129',
    },
    {
      id: 0,
      block_sum: 0,
      transaction_sum: 0,
      time: '20211128',
    },
    {
      id: 0,
      block_sum: 0,
      transaction_sum: 0,
      time: '20211127',
    },
    {
      id: 7,
      block_sum: 2,
      transaction_sum: 2,
      time: '20211126',
    },
    {
      id: 6,
      block_sum: 2,
      transaction_sum: 2,
      time: '20211125',
    },
    {
      id: 5,
      block_sum: 7,
      transaction_sum: 82779,
      time: '20211124',
    },
  ],
};

export default [
  {
    url: '/v1/home/info',
    method: 'get',
    response: () => {
      return resultSuccess(data);
    },
  },
];
