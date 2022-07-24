<template>
  <template v-if="message">
    <a-alert :message="message" :type="type" />
    <a-divider class="line" />
  </template>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';

  defineProps({
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<'success' | 'info' | 'warning' | 'error'>,
      default: 'error',
    },
  });
</script>
