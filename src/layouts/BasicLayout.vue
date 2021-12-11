<template>
  <pro-layout
    :locale="locale"
    v-bind="layoutConf"
    v-model:openKeys="state.openKeys"
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    :breadcrumb="{ routes: breadcrumb }"
  >
    <!-- menuExtraRender -->
    <template #menuExtraRender="{ collapsed }">
      <a-space v-if="!collapsed" align="center" class="link" @click="$router.push('/')">
        <Icon type="guanlipingtai" size="20px" align="0px" />
        <span class="font16">管理平台</span>
      </a-space>
    </template>

    <!-- menuItemRender -->
    <template #menuItemRender="{ item }">
      <a-menu-item :key="item.path" @click="$router.push(item.path)">
        <template #icon>
          <Icon :type="item.meta.icon" size="20px" />
        </template>
        {{ item.meta.title }}
      </a-menu-item>
    </template>
    <!-- menuHeaderRender -->
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img :src="logo" class="logo" />
        <h1 class="title"> {{ APP_TITLE }} </h1>
      </router-link>
    </template>
    <!-- rightContentRender -->
    <template #rightContentRender>
      <RightContent />
    </template>

    <!-- <div> -->
    <!-- breadcrumb -->
    <a-card v-if="routeMeta.breadcrumb">
      <a-breadcrumb :routes="breadcrumb">
        <template #itemRender="{ route }">
          <span class="font14 color-666">
            {{ route.breadcrumbName }}
          </span>
        </template>
      </a-breadcrumb>
      <h2 class="font18 marT13 rowSC link" @click="handleBreadcrumb">
        <LeftOutlined />
        <span class="marL10">{{ title }}</span>
      </h2>
    </a-card>
    <!-- divider -->
    <a-divider v-if="routeMeta.breadcrumb" class="line" />
    <!-- router-view -->
    <template v-if="routeMeta.hiddenWrap">
      <!-- <router-view /> -->
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </template>
    <a-card v-else>
      <!-- <router-view /> -->
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </a-card>
    <!-- </div> -->
  </pro-layout>
</template>

<script setup lang="ts">
  import { clearMenuItem } from '@ant-design-vue/pro-layout';
  import RightContent from './components/RightContent.vue';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import logo from '/@/assets/images/logo.png';
  import { usePermissioStore } from '/@/store/modules/permission';
  import { useBreadcrumbTitle } from '../hooks/useBreadcrumbTitle';
  import { APP_TITLE } from '../../config/constant';
  import prolayoutSetting, { onlySideMenuPath } from './constant';

  import type { BasicLayoutProps } from '@ant-design-vue/pro-layout';
  import type { RouteContextProps } from '@ant-design-vue/pro-layout';
  import type { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';

  const permissioStore = usePermissioStore();
  const locale = (i18n: string) => i18n;
  const router = useRouter();
  const { title } = useBreadcrumbTitle();

  onMounted(() => {
    // permissioStore.fetchPermissionAll();
  });

  onUnmounted(() => {
    permissioStore.resetState();
  });
  // 标准写法参考官方文档 https://github.com/vueComponent/pro-layout
  // 这里我是根据自身需求在导航栏菜单只展示指定路由
  const menuData = clearMenuItem(router.getRoutes()).filter((n) =>
    onlySideMenuPath.includes(n.path),
  );

  const state = reactive<Omit<RouteContextProps, 'menuData'>>({
    collapsed: false, // default value
    openKeys: [],
    selectedKeys: [],
  });

  const layoutConf = reactive<BasicLayoutProps>({
    menuData: menuData,
    ...prolayoutSetting,
  });

  const breadcrumb = computed(
    () =>
      router.currentRoute.value.matched
        .filter((n) => !['/', '/app'].includes(n.path))
        .map((item) => {
          return {
            path: item.path,
            breadcrumbName: item.meta.title || '',
          };
        }) as Route[],
  );

  const routeMeta = computed(() => router.currentRoute.value.meta);

  // watchEffect(() => {
  //   const modules = permissioStore.getModules;
  //   if (modules.length && permissioStore.getIsAdmin === 0) {
  //     layoutConf.menuData = menuData.filter(({ name }) => modules.includes(name as string));
  //   }
  // });

  watchEffect(() => {
    if (router.currentRoute) {
      const matched = router.currentRoute.value.matched.concat();
      state.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path);
      state.openKeys = matched
        .filter((r) => r.path !== router.currentRoute.value.path)
        .map((r) => r.path);
    }
  });

  const handleBreadcrumb = () => {
    const path = breadcrumb.value?.[breadcrumb.value.length - 2]?.path;
    path && router.push(path);
  };
</script>
<style lang="less" scoped>
  .title {
    font-size: 18px;
    color: #000000;
  }
  .subTitle {
    font-size: 18px;
    margin-left: 5px;
    color: rgba(51, 51, 51, 0.85);
  }

  .logo {
    width: 48px;
    height: 48px;
  }
</style>
