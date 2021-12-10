import BasicLayout from '/@/layouts/BasicLayout.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

export const accessRoutes = [
  {
    path: '/app',
    name: 'app',
    component: BasicLayout,
    redirect: '/app/home',
    meta: { title: '管理平台' },
    children: [
      {
        path: '/app/home',
        component: () => import('/@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'liulanqi',
          auth: ['home'],
        },
      },
      {
        path: '/app/website',
        name: 'website',
        component: () => import('/@/views/website/index.vue'),
        meta: {
          title: '网站管理',
          keepAlive: true,
          icon: 'jiedianguanli',
          auth: ['website'],
        },
      },
      {
        path: '/app/page2',
        name: 'page2',
        component: () => import('/@/views/page2/index.vue'),
        redirect: '/app/page2/index',
        meta: {
          title: '其他菜单',
          keepAlive: true,
          icon: 'heyueguanli',
          auth: ['page2'],
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
