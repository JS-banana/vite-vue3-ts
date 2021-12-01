import { createPinia } from 'pinia';

const store = createPinia();

export { store };

// 因为 pinia的实现也是通过vue的各种api（ref/reactive/computed等）
// 所以，不要求一定要在Vue上挂载注册，可以随便在组件中使用，组件外使用也有对应方案
// 不过，app.use(store) 可以把store实例挂载到Vue上使用
