// import 'ant-design-vue/dist/antd.css';
import 'sanitize.css';
// import 'sanitize.css/forms.css';
// import 'sanitize.css/typography.css';
import '@ant-design-vue/pro-layout/dist/style.css';
import '/@/styles/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';

// Importing on demand in local development will increase the number of browser requests by around 20%.
// This may slow down the browser refresh speed.
// Therefore, only enable on-demand importing in production environments .
// if (import.meta.env.DEV) {
//   import('ant-design-vue/dist/antd.less');
// }
import './router/permission';
import { setupGlobDirectives } from './directives';
// import { AuthEnum } from './enums/authEnum';

const app = createApp(App);

app.use(store);

app.use(ProLayout).use(PageContainer);

app.use(router);

// Register global directive
setupGlobDirectives(app);

// 全局属性
// app.config.globalProperties.AuthEnum = AuthEnum;

app.mount('#app');
