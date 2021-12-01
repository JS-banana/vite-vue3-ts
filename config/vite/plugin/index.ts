import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import legacy from '@vitejs/plugin-legacy';
import { configStyleImportPlugin } from './styleImport';
import { configSvgIconsPlugin } from './svgIcons';
import { autoRegistryComponents } from './component';
import { AutoImportDeps } from './autoImport';
import { configMockPlugin } from './mock';
import { configVisualizerConfig } from './visualizer';
import { configCompressPlugin } from './compress';

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    // 自动按需引入组件
    autoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
  ];

  // @vitejs/plugin-legacy
  // isBuild && vitePlugins.push(legacy());

  // rollup-plugin-gzip
  isBuild && vitePlugins.push(configCompressPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  vitePlugins.push(configMockPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  return vitePlugins;
}
