import GlobalConfig from '../../tsup.config';
import { defineConfig } from 'tsup';

export default defineConfig({
    ...GlobalConfig,
    entry: ['browser/index.ts', 'common/index.ts', 'components/index.ts', 'parts/index.ts'],
});
