import { themes } from '@storybook/theming';

export const parameters = {
    darkMode: {
        // Override the default dark theme
        current: 'black',
        dark: { ...themes.dark, appBg: 'black' },
        // Override the default light theme
        light: { ...themes.normal, appBg: 'white' },
        darkClass: 'mode-dark',
        lightClass: 'mode-light',
        classTarget: 'body',
        stylePreview: true
    }
};