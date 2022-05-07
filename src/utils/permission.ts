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

// 不需要权限过滤的 白名单
export const WhiteList = ['/v1/user/login', '/v1/user/permission', '/v1/account/info'];

type IAuth = { auth?: string[]; role?: number };

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

export const filterRouteByRole = (routes: RouteRecordRaw[], ROLE: number) => {
  const filterChildrenByRole = (currentRoutes: RouteRecordRaw[]): RouteRecordRaw[] => {
    const result: RouteRecordRaw[] = [];

    currentRoutes.forEach((route) => {
      const { role } = (route.meta as IAuth) || {};

      if (role == undefined || role == ROLE) {
        if (route.children) {
          route.children = filterChildrenByRole(route.children);
        }
        result.push(route);
      }
    });

    return result;
  };

  return filterChildrenByRole(routes);
};
