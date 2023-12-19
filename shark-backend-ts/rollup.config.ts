import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import path from 'node:path';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: './dist',
    entryFileNames: '[name].js',
    format: 'cjs',
    // manualChunks: (id, { getModuleInfo }) => {
    //   if (/src\/services\//.test(id) && !id.endsWith('services/index.ts')) {
    //     const fileName = id.split('/').at(-2);
    //
    //     return `service/${fileName}`;
    //   }
    //   return undefined;
    // },
    // chunkFileNames: '[name].js',
  },
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    typescript(),
    commonjs(),
    json(),
    alias({
      entries: [
        { find: 'utils', replacement: './src/utils' },
        { find: 'enums', replacement: './src/enums' },
        { find: 'types', replacement: './src/types' },
        { find: '@', replacement: './src' },
      ],
    }),
  ],
  onwarn: (warning) => {
    // Silence circular dependency warning for moment package
    if (
      warning.code === 'CIRCULAR_DEPENDENCY'
      && warning.ids.some((_ids) => _ids.indexOf('node_modules') !== -1)
    ) {
      return;
    }

    console.warn(`(!) ${warning.message}`);
  },
});
