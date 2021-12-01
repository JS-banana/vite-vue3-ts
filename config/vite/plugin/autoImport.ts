import AutoImport from 'unplugin-auto-import/vite';

export const AutoImportDeps = () =>
  AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'src/auto-imports.d.ts',
  });
