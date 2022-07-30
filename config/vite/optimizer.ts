/**
 * @name configManualChunk
 * @description chunk 拆包优化
 */

const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['ant-design-vue'],
    output: 'antdv',
  },
  {
    match: ['echarts'],
    output: 'echarts',
  },
];

// pnpm安装的依赖，获取到的路径名称是拼接而成且比较长的
// vite-vue3-ts/node_modules/.pnpm/registry.npmmirror.com+ant-design-vue@3.2.7_vue@3.2.23/node_modules/ant-design-vue/es/card/style/index.js
export const configManualChunk = (id: string) => {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
};
