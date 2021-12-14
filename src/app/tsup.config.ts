import GlobalConfig from '../../tsup.config';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...GlobalConfig,
  format: ['cjs'],
  entry: ['index.ts'],
  external: ['electron', 'electron-builder'],
  platform: 'node',
});
