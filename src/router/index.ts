import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './router.config';

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
