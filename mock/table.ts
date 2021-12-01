import Mock from 'mockjs';

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      account: '@phone',
      true_name: '@name',
      created_at: '@datetime',
      role_name: '@name',
    },
  ],
});

export default [
  {
    url: '/table/list',
    method: 'get',
    response: () => {
      const items = data.items;
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
