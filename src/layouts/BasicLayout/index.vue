<template>
  <a-layout class="basicLayout-wrap">
    <Header />
    <a-layout>
      <SideMenu v-bind="layoutConf" />
      <a-layout class="basicLayout-content">
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

        <!-- content -->
        <a-layout-content>
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
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
  import { LeftOutlined } from '@ant-design/icons-vue';
  import { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';
  import Header from './components/Header.vue';
  import SideMenu from './components/SideMenu';
  import { useBreadcrumbTitle } from '/@/hooks/useBreadcrumbTitle';
  import { clearMenuItem, filterRoutes } from './utils';

  const router = useRouter();
  const { title } = useBreadcrumbTitle();

  const menuData = filterRoutes(
    clearMenuItem(router.getRoutes()).filter((n) => n.path.startsWith('/app/')),
  );

  const layoutConf = reactive({
    theme: 'light',
    menuWidth: 208,
    menuData,
  });

  const routeMeta = computed(() => router.currentRoute.value.meta);

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
  const handleBreadcrumb = () => {
    const path = breadcrumb.value?.[breadcrumb.value.length - 2]?.path;
    path && router.push(path);
  };
</script>
<style lang="less" scoped>
  .basicLayout-wrap {
    height: 100vh;
    overflow: hidden;
    .basicLayout-content {
      height: calc(100vh - 80px);
      overflow-y: auto;
      margin: 0;
      padding: 24px;
      background: '#F0F1F4';
    }
  }
</style>
