const tailwindcss = require('tailwindcss');
const path = require('path');
const autoPreprocess = require('svelte-preprocess');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const testConfig = require('smelte/tailwind.config')(require('./tailwind.config'));
module.exports = ({ config, mode }) => {
    const svelteLoader = config.module.rules.find(
        r => r.loader && r.loader.includes('svelte-loader'),
    );
    svelteLoader.options = {
        ...svelteLoader.options,
        emitCss: true,
        hotReload: false,
        preprocess: autoPreprocess({
            typescript: true,
            sass: true
        })
    };

    config.module.rules.push(
        // {
        //     test: /\.svg$/,
        //     loader: 'svg-inline-loader',
        //     options: {
        //       removeSVGTagAttrs: true
        //     }
        // },
        {
            test: /\.css$/,
            loaders: [
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        postcssOptions: {
                            plugins: [
                                require('postcss-import')(),
                                tailwindcss({ ...testConfig }),
                                require('autoprefixer'),
                            ]
                        }

                    },
                },
            ]
        },
        {
            test: /\.stories\.js?$/,
            loaders: [require.resolve('@storybook/source-loader')],
            include: [path.resolve(__dirname, '../scripts/spript-stories')],
            enforce: 'pre',
        },
        {
            test: /\.(jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        },
    );
    config.resolve.plugins.push(new TsconfigPathsPlugin({
        configFile: './tsconfig.svelte.json'
    }));
    config.plugins.push(new CopyPlugin({
        patterns: [
            {
                from: path.join(__dirname, '..', 'node_modules/canvaskit-wasm/bin/canvaskit.wasm'),
                to: 'bin'
            }
        ]
    }));
    config.node = Object.assign(config.node || {}, {
        fs: 'empty'
    });
    return config;
};
