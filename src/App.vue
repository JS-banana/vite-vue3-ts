<template>
  <ConfigProvider :locale="zhCN">
    <router-view />
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { useTitle } from '/@/hooks/useTitle';

  // date-picker 国际化失效问题
  // 引入dist下的文件：import 'moment/dist/locale/zh-cn'
  // 确保 moment版本一致
  // import moment from 'moment';
  // import 'moment/dist/locale/zh-cn';
  // moment.locale('zh_CN');

  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');

  useTitle();

  console.log('my config env: ', import.meta.env);
</script>
