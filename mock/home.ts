import Mock from 'mockjs';
import { resultSuccess } from './_util';

const list = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@ctitle',
      mobile: '@phone',
      name: '@cname',
      description: '@cparagraph',
      created_at: '@datetime',
      updated_at: '@datetime',
      age: '@natural(10,50)',
      color: '@color',
      email: '@email',
    },
  ],
});

const data = {
  hu_num: 42,
  yun_num: 87755,
  ce_num: 3,
  create_time: 1636352741,
  online_num: 101,
  total_num: 110,
  seven_days: [
    {
      id: 9,
      num: 7,
      time: '20211130',
    },
    {
      id: 8,
      num: 80,
      time: '20211129',
    },
    {
      id: 0,
      num: 280,
      time: '20211128',
    },
    {
      id: 0,
      num: 0,
      time: '20211127',
    },
    {
      id: 7,
      num: 5,
      time: '20211126',
    },
    {
      id: 6,
      num: 20,
      time: '20211125',
    },
    {
      id: 5,
      num: 5,
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
  {
    url: '/v1/home/list',
    method: 'get',
    response: () => {
      const items = list.items;
      return {
        code: 0,
        result: {
          total: items.length,
          list: items,
        },
      };
    },
  },
];
