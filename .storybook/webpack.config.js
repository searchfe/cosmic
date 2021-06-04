const tailwindcss = require('tailwindcss');
const path = require('path');
const testConfig = require('smelte/tailwind.config')({
    theme: {
        extend: {
            spacing: {
                72: '18rem',
                84: '21rem',
                96: '24rem',
            },
        }
    },
    // Extend Tailwind theme
    
    colors: {
        primary: '#b027b0',
        secondary: '#009688',
        error: '#f44336',
        success: '#4caf50',
        alert: '#ff9800',
        blue: '#2196f3',
        dark: '#212121',
    }, // Object of colors to generate a palette from, and then all the utility classes
    darkMode: true,
});
module.exports = ({ config, mode }) => {
    const svelteLoader = config.module.rules.find(
        r => r.loader && r.loader.includes('svelte-loader'),
    );
    svelteLoader.options = {
        ...svelteLoader.options,
        emitCss: true,
        hotReload: false,
    };

    config.module.rules.push(
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
                                tailwindcss({...testConfig}),
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
            include: [path.resolve(__dirname, '../storybook')],
            enforce: 'pre',
        },
    );

    return config;
};
