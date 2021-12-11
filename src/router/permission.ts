/**
 * @name permission
 * @description 全局路由过滤、权限过滤
 */

import { router } from '.';
import { getToken } from '../utils/auth';
import { usePermissioStoreWithOut } from '/@/store/modules/permission';

const permissioStore = usePermissioStoreWithOut();
const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to: any, _, next) => {
  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      //是否获取过用户信息
      const isGetUserInfo = permissioStore.getIsGetUserInfo;
      if (isGetUserInfo) {
        next();
      } else {
        // 没有获取，请求数据
        await permissioStore.fetchAuths();
        // 过滤权限路由
        const routes = await permissioStore.buildRoutesAction();
        // 404 路由一定要放在 权限路由后面
        routes.forEach((route) => {
          router.addRoute(route);
        });
        // hack 方法
        // 不使用 next() 是因为，在执行完 router.addRoute 后，
        // 原本的路由表内还没有添加进去的路由，会 No match
        // replace 使路由从新进入一遍，进行匹配即可
        next({ ...to, replace: true });
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
});
