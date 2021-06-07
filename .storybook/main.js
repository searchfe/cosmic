module.exports = {
    stories: ['../scripts/stories/**/*.stories.@(js|mdx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
        '@storybook/addon-notes/register',
        '@storybook/addon-viewport',
        'storybook-dark-mode',
    ]
};