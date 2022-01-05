module.exports = {
    stories: ['../src/**/*.stories.@(svelte|mdx|ts)'],
    addons: [
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
        '@storybook/addon-svelte-csf',
        '@storybook/addon-docs',
        'storybook-dark-mode',
        '@storybook/addon-essentials',
        '@storybook/theming',
    ],
};
