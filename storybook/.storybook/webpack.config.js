const tailwindcss = require('tailwindcss');
const path = require('path');
const autoPreprocess = require('svelte-preprocess');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const testConfig = require('smelte/tailwind.config')(require('./tailwind.config'));
module.exports = ({ config, mode }) => {
    const svelteLoader = config.module.rules.find(r => r.loader && r.loader.includes('svelte-loader'));
    svelteLoader.options = {
        ...svelteLoader.options,
        emitCss: true,
        hotReload: false,
        preprocess: autoPreprocess({
            typescript: true,
            sass: true,
        }),
    };

    config.module.rules.push({
        test: /\.css$/,
        loaders: [
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    postcssOptions: {
                        plugins: [require('postcss-import')(), tailwindcss({ ...testConfig }), require('autoprefixer')],
                    },
                },
            },
        ],
    });
    config.resolve.plugins.push(
        new TsconfigPathsPlugin({
            configFile: '../tsconfig.json',
        }),
    );
    // config.plugins.push(new CopyPlugin({
    //     patterns: [
    //         {
    //             from: path.join(__dirname, '..', 'node_modules/canvaskit-wasm/bin/canvaskit.wasm'),
    //             to: 'bin'
    //         }
    //     ]
    // }));
    config.node = Object.assign(config.node || {}, {
        fs: 'empty',
    });
    return config;
};
