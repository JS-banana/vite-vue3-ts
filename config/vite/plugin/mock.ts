/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild, // 为了演示，线上开启 mock，实际开发请关闭，会影响打包体积
    // 开发环境无需关心
    // injectCode 只受prodEnabled影响
    // https://github.com/anncwb/vite-plugin-mock/issues/9
    // 下面这段代码会被注入 main.ts
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
 
       setupProdMockServer();
       `,
  });
}
