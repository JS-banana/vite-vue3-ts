// import 'ant-design-vue/dist/antd.css';
import 'sanitize.css';
// import 'sanitize.css/forms.css';
// import 'sanitize.css/typography.css';
import '/@/styles/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import { setupGlobDirectives } from './directives';
import './router/permission';
// import { setupComponents } from './plugin';

const app = createApp(App);

app.use(store);

app.use(router);

// Register global directive
setupGlobDirectives(app);

// Register UI components
// setupComponents(app);

// 全局属性
// app.config.globalProperties.AuthEnum = AuthEnum;

app.mount('#app');
