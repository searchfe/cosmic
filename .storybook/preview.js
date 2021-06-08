
import customTheme from './theme';

export const parameters = {
    darkMode: {
        // Override the default dark theme
        // current: 'dark',
        dark: {...customTheme('dark'),  appBg: '#111111' },
        // Override the default light theme
        light: {...customTheme('normal'), ...customTheme},
        darkClass: 'mode-dark',
        lightClass: 'mode-light',
        classTarget: 'body',
        stylePreview: true
    }
};