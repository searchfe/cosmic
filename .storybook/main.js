module.exports = {
    stories: ['../scripts/stories/**/*.stories.@(svelte|mdx)'],
    addons: [
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
        '@storybook/addon-notes/register',
        '@storybook/addon-viewport',
        '@storybook/addon-svelte-csf',
        '@storybook/addon-controls',
        '@storybook/addon-docs',
        'storybook-dark-mode',
        '@storybook/addon-essentials',
        '@storybook/theming'
    ]
};