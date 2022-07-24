import Mock from 'mockjs';
import { faker } from '@faker-js/faker';
import { getRequestToken, resultError } from './_util';
import { createFakeUserList } from './user';

enum URL {
  table = '/table/list',
  list = '/v1/node/nodelist',
}

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

const NAMES = ['节点1', '节点2', '节点3', '节点4'];
const DATA_names = ['机构1', '机构2', '机构3'];

const DATA_blockList = Mock.mock({
  'items|23': [
    {
      'id|+1': 1,
      node_name: () => faker.helpers.arrayElement(NAMES),
      institutions_name: () => faker.helpers.arrayElement(DATA_names),
      ip: () => faker.internet.ip(),
      port: () => faker.internet.port(),
      nodeRole: () => faker.helpers.arrayElement(['普通节点', '管理节点']),
      is_consensus: () => faker.helpers.arrayElement(['是', '否']),
      create_time: () => faker.date.past(2, new Date().toISOString()),
      status: () => faker.helpers.arrayElement(['正常', '异常']),
      isSelf: () => faker.datatype.boolean(),
    },
  ],
});

export default [
  {
    url: URL.table,
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
  {
    url: URL.list,
    method: 'get',
    response: (request) => {
      let items = DATA_blockList.items.map((n) => {
        return {
          ...n,
          node_name: n.nodeRole === '创世节点' ? '创世节点' : n.node_name,
          institutions_name:
            n.nodeRole === '管理节点'
              ? '管理'
              : ['节点1', '节点2'].includes(n.node_name)
              ? n.node_name.replace('节点', '机构')
              : n.institutions_name,
        };
      });

      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (checkUser?.role === 0) {
        items = [
          {
            id: 14,
            node_name: '节点1',
            institutions_name: '机构1',
            ip: '147.174.206.1',
            port: 26042,
            nodeRole: '普通节点',
            is_consensus: '否',
            create_time: '2021-02-25T02:27:18.151Z',
            status: '正常',
            isSelf: true,
            isUpgrade: true,
          },
          {
            id: 15,
            node_name: '节点2',
            institutions_name: '机构2',
            ip: '147.174.6.190',
            port: 26042,
            nodeRole: '普通节点',
            is_consensus: '是',
            create_time: '2021-03-25T02:25:18.151Z',
            status: '正常',
            isSelf: false,
            isUpgrade: false,
          },
        ];
      }

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
