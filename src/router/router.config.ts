import BasicLayout from '/@/layouts/BasicLayout.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

export const accessRoutes = [
  {
    path: '/app',
    name: 'app',
    component: BasicLayout,
    redirect: '/app/chainBrowser',
    meta: { title: '管理平台' },
    children: [
      {
        path: '/app/chainBrowser',
        component: () => import('/@/views/chainBrowser/index.vue'),
        name: 'explorer',
        meta: {
          title: '浏览器',
          icon: 'liulanqi',
          auth: ['explorer'],
        },
      },
      {
        path: '/app/node',
        name: 'node',
        component: () => import('/@/views/node/index.vue'),
        meta: {
          title: '节点管理',
          keepAlive: true,
          icon: 'jiedianguanli',
          auth: ['node'],
        },
      },
      {
        path: '/app/contract',
        name: 'contract',
        component: () => import('/@/views/contract/index.vue'),
        redirect: '/app/contract/index',
        meta: {
          title: '合约管理',
          keepAlive: true,
          icon: 'heyueguanli',
          auth: ['contract'],
        },
      },
      {
        path: '/sys/account',
        name: 'account',
        component: () => import('/@/views/account/index.vue'),
        meta: { title: '用户管理', keepAlive: true, breadcrumb: true },
      },
    ],
  },
];

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/app',
    meta: {
      title: 'Root',
    },
  },
  // ...accessRoutes,
];

export const publicRoutes = [
  {
    path: '/redirect',
    component: BlankLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('/@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('/@/views/404.vue'),
  },
];

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [];

export default constantRoutes;
