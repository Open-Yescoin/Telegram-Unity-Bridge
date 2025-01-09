import { defineConfig } from 'tsup';
import fs from 'fs/promises';

const external = [
  // common
  'axios',
  'ioredis',

  // ton
  '@ton/core',
  '@ton/crypto',
  '@ton/ton',
  '@tonconnect/sdk',
  '@ston-fi/sdk',
  '@tonconnect/ui',
];

export default defineConfig(options => {
  return [
    {
      entry: ['src/index.ts'],
      outDir: 'dist',
      dts: true,
      sourcemap: !options.watch,
      clean: true,
      // minify: true,
      splitting: false,
      format: ['cjs', 'esm'],
      external,
    },
    {
      entry: ['src/index.ts'],
      outDir: 'dist',
      dts: false,
      sourcemap: !options.watch,
      outExtension: () => ({ js: '.min.js' }),
      clean: true,
      minify: 'terser',
      format: 'iife',
      external,
      async onSuccess() {
        // copy to unity jslib
        await fs.cp('src/providers/index.js', 'dist/providers/index.jslib');
      },
    },
  ];
});
