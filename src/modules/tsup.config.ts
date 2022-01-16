import GlobalConfig from '../../tsup.config';
import { defineConfig } from 'tsup';
import { promises as fs, writeFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { esbuildPlugins = [], ...extConfig } = GlobalConfig;

export default defineConfig({
    ...extConfig,
    entry: [
        'draw-canvas/skia-wasm/index.ts',
        'menu-group/index.ts',
        'property-panel/index.ts',
        'resource-explorer/index.ts',
        'shape-canvas/index.ts',
        'workbench/index.ts',
        'assets/index.ts',
        'editor/index.ts',
    ],
    esbuildPlugins: [
        ...esbuildPlugins,
        {
            name: 'css-module',
            setup(build) {
                build.onResolve({ filter: /\.module\.css$/, namespace: 'file' }, async args => {
                    return {
                        path: `${args.path}#css-module`,
                        namespace: 'css-module',
                        pluginData: {
                            path: args.path,
                            absolutePath: require.resolve(args.path, { paths: [args.resolveDir] })
                        },
                    };
                });
                build.onLoad({ filter: /#css-module$/, namespace: 'css-module' }, async args => {
                    const { pluginData } = args;
                    const postcss = require('postcss');
                    const source = await fs.readFile(pluginData.absolutePath, 'utf8');
                    let cssModule = {};
                    await postcss([
                        require('postcss-modules')({
                            getJSON(_: string, json: { [name: string]: string }) {
                                cssModule = json;
                            },
                            // globalModulePaths: [/\.\.\/ui\/global\.css/]
                        }),
                    ]).process(source, { from: pluginData.absolutePath });

                    return {
                        contents: `
                  import "${pluginData.absolutePath}"
                  export default ${JSON.stringify(cssModule)}
                  `,
                    };
                });
                build.onResolve({ filter: /\.module\.css$/, namespace: 'css-module' }, async args => {
                    return {
                        path: require.resolve(args.path, { paths: [args.resolveDir] }),
                        namespace: 'file',
                    };
                });
            },
        },
    ],
});
