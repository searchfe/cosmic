import type { ChildProcessWithoutNullStreams } from 'child_process';

import GlobalConfig from '../../tsup.config';
import { defineConfig } from 'tsup';
import { spawn } from 'child_process';

const isProd = process.env.NODE_ENV === 'production';

let http: ChildProcessWithoutNullStreams;
let electron: ChildProcessWithoutNullStreams;

export default defineConfig({
  ...GlobalConfig,
  entry: ['index.ts', 'externals/**'],
  injectStyle: false,
  esbuildPlugins: [
    {
      name: 'serve',
      setup(build) {
        if (isProd) return;

        build.onStart(() => {
          if (!http) {
            http = spawn('npx', ['http-server', '.', '-p', '5555', '--silent']);
            http.stdout.on('data', (chunk: Buffer) => {
              console.log(chunk.toString());
            });
          }
        });
        build.onEnd(() => {
          if (!electron) {
            electron = spawn('npx', ['nr', '-w', 'electron']);
            electron.stdout.on('data', (chunk: Buffer) => {
              console.log(chunk.toString());
            });
          }
        });
      },
    },
  ],
});
