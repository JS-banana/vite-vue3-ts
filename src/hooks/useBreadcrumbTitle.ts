/**
 * @name useBreadcrumbTitle
 * @description 修改面包屑Title
 * @param isAddOn 是否为添加 on注册
 */

import mitt from '/@/utils/mitt';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const emitter = mitt();

const key = Symbol();

export const useBreadcrumbTitle = (isAddOn = true) => {
  const route = useRoute();
  const title = ref(route.meta.title);

  watch(
    () => route.meta.title,
    (val) => {
      title.value = val;
    },
  );

  const changeTitle = (val: string) => (title.value = val);

  onMounted(() => isAddOn && emitter.on(key, changeTitle));

  onUnmounted(() => isAddOn && emitter.off(key, changeTitle));

  const setBreadcrumbTitle = (title: string) => emitter.emit(key, title);

  return {
    title,
    setBreadcrumbTitle,
  };
};
