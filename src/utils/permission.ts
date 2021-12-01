/**
 * @name permission
 * @description 路由处理工具
 */

import { RouteRecordRaw } from 'vue-router';
import intersection from 'lodash-es/intersection';

const Reg_Module = /^\/v1\/(.+)\/.+$/;

// 根据 auths 过滤module
export const filterModuleByAuths = (auths: string[]): string[] => {
  // const reg=new RegExp(Reg_Module)
  return auths.filter(Boolean).map((auth) => {
    auth.match(Reg_Module);
    const moduleName = RegExp.$1;
    // console.log(authMatch, moduleName);
    return moduleName;
  });
};

// 所有模块
export const AllModules = ['explorer', 'contract', 'node', 'user', 'role', 'log'];

// 不需要权限过滤的 白名单
export const WhiteList = [
  '/v1/internal/login',
  '/v1/account/permission',
  '/v1/account/edit',
  '/v1/account/center',
  '/v1/account/permission/all',
];

type IAuth = { auth?: string[] };

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const { auth } = (route.meta as IAuth) || {};
    if (!auth) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles);
      }
      res.push(route);
    } else {
      if (intersection(roles, auth).length > 0) {
        if (route.children) {
          route.children = filterAsyncRoutes(route.children, roles);
        }
        res.push(route);
      }
    }
  });
  return res;
};

/**
 * @name AllPermission
 * @description 所有的权限 列表
 */
export const AllPermission = [
  {
    module: 'explorer',
    module_name: '区块链浏览器',
    auth_list: {
      '/v1/explorer/block': '区块列表',
      '/v1/explorer/block/detail': '区块详情',
      '/v1/explorer/info': '链信息',
      '/v1/explorer/nodeInfo': '节点信息',
      '/v1/explorer/search': '检索区块或交易',
      '/v1/explorer/transaction': '某区块交易列表',
      '/v1/explorer/transaction/detail': '交易详情',
      '/v1/explorer/transactionListByAllBlock': '所有的交易列表',
    },
  },
  {
    module: 'contract',
    module_name: '智能合约',
    auth_list: {
      '/v1/contract/deploy': '合约部署',
      '/v1/contract/detail': '合约详情',
      '/v1/contract/list': '合约列表',
      '/v1/contract/upload': '合约上传',
    },
  },
  {
    module: 'node',
    module_name: '节点管理',
    auth_list: {
      '/v1/node/agree': '同意',
      '/v1/node/apply': '节点管理',
      '/v1/node/disagree': '不同意',
      '/v1/node/exit': '退出网络',
      '/v1/node/nodelist': '节点列表',
      '/v1/node/votelist': '投票列表',
    },
  },
  {
    module: 'user',
    module_name: '用户接口',
    auth_list: {
      '/v1/user/create': '创建用户',
      '/v1/user/delete': '删除用户',
      '/v1/user/detail': '用户详情',
      '/v1/user/role/down': '角色下拉列表',
      '/v1/user/search': '用户列表',
      '/v1/user/update': '更新用户',
    },
  },
  {
    module: 'role',
    module_name: '角色接口',
    auth_list: {
      '/v1/role/create': '新建角色',
      '/v1/role/delete': '角色删除',
      '/v1/role/detail': '角色详情',
      '/v1/role/down': '角色下拉列表框',
      '/v1/role/permission/all': '获取全部权限',
      '/v1/role/permission/search': '查询权限',
      '/v1/role/search': '角色列表',
      '/v1/role/update': '角色编辑',
    },
  },
  {
    module: 'log',
    module_name: '日志模块',
    auth_list: {
      '/v1/log/search': '日志列表',
    },
  },
];
