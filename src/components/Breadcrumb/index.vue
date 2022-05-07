<template>
  <a-card>
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
</template>
<script setup lang="ts">
  import { LeftOutlined } from '@ant-design/icons-vue';
  import { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';
  import { useBreadcrumbTitle } from '/@/hooks/useBreadcrumbTitle';

  const { title } = useBreadcrumbTitle();
  const router = useRouter();

  const emits = defineEmits(['handleClick']);

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
    emits('handleClick', breadcrumb.value);
  };
</script>
<style scoped>
  .link {
    text-decoration: none;
  }
</style>
