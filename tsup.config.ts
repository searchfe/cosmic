import { defineConfig } from 'tsup';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
    format: ['esm'],
    target: 'esnext',
    sourcemap: !isProd,
    // minify: isProd,
    injectStyle: true,
    platform: 'browser',
    external: ['@cosmic/app', '@cosmic/core', '@cosmic/modules', '@cosmic/site', '@cosmic/workbench'],
    clean: isProd,
    esbuildOptions: opts => {
        opts.logLevel = 'error';
    },
    esbuildPlugins: [
        {
            name: 'replace',
            setup(build) {
                build.onEnd(result => {
                    const { outputFiles } = result;
                    if (!outputFiles) return;
                    for (const f of outputFiles) {
                        if (f.path.endsWith('.js') && f.text.match(/outros.c.push/)) {
                            Object.defineProperty(f, 'text', {
                                value: f.text.replace(
                                    /outros.c.push/,
                                    'if (outros === undefined) { block.o(local); return }\noutros.c.push',
                                ),
                            });
                        }
                    }
                });
            },
        },
    ],
});
