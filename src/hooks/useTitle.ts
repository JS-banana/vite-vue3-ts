import { watch, unref } from 'vue';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useRouter } from 'vue-router';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute);

      const tTitle = route?.meta?.title as string;
      pageTitle.value = tTitle;
    },
    { immediate: true },
  );
}
