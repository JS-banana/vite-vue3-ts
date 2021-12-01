/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import type { Plugin } from 'vite';
import compressPlugin from 'vite-plugin-compression';
import { COMPRESSION } from '../../constant';

export function configCompressPlugin(): Plugin | Plugin[] {
  if (COMPRESSION) {
    return compressPlugin({
      ext: '.gz',
      deleteOriginFile: false,
    }) as Plugin;
  }
  return [];
}
