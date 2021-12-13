import type { RouteRecord, RouteRecordRaw } from 'vue-router';

type IRouteRecordRaw = RouteRecordRaw & { childrenPaths?: string[] };

// 过滤路由属性 hideInMenu hideChildInMenu
export function clearMenuItem(menusData: RouteRecord[] | RouteRecordRaw[]): RouteRecordRaw[] {
  const filterHideMenus = menusData
    .map((item: RouteRecord | RouteRecordRaw) => {
      const finalItem = { ...item };
      if (!finalItem.name || finalItem.meta?.hideInMenu) {
        return null;
      }

      if (finalItem && finalItem?.children) {
        if (
          !finalItem.meta?.hideChildInMenu &&
          finalItem.children.some(
            (child: RouteRecord | RouteRecordRaw) => child && child.name && !child.meta?.hideInMenu,
          )
        ) {
          return {
            ...item,
            children: clearMenuItem(finalItem.children),
          };
        }
        delete finalItem.children;
      }
      return finalItem;
    })
    .filter((item) => item) as IRouteRecordRaw[];

  //

  return filterHideMenus;
}

// 存在二级菜单时，过滤掉重复的并在一级菜单显示的 item
export const filterRoutes = (menusData: RouteRecordRaw[]): RouteRecordRaw[] => {
  const filterRoutes: string[] = [];
  menusData.forEach((n) => {
    if (n.children) {
      n.children.forEach(({ path }) => filterRoutes.push(path));
    }
  });

  return menusData.filter(({ path }) => !filterRoutes.includes(path));
};
