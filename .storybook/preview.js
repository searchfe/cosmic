import { themes } from '@storybook/theming';
import customTheme from './theme';

export const parameters = {
    darkMode: {
        // Override the default dark theme
        current: 'dark',
        dark: { ...themes.dark, ...customTheme,  appBg: '#111111' },
        // Override the default light theme
        light: { ...themes.normal, ...customTheme },
        darkClass: 'mode-dark',
        lightClass: 'mode-light',
        classTarget: 'body',
        stylePreview: true
    }
};