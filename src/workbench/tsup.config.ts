import GlobalConfig from '../../tsup.config';
import { defineConfig } from 'tsup';

export default defineConfig({
    ...GlobalConfig,
    entry: ['./desktop/app.ts'],
});
