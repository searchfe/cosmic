import customTheme from './theme';
import { DocsContainer } from './docs-container';

export const parameters = {
    darkMode: {
        // Override the default dark theme
        // current: 'dark',
        dark: { ...customTheme('dark'), appBg: '#111111' },
        // Override the default light theme
        light: { ...customTheme('normal'), ...customTheme },
        darkClass: 'mode-dark',
        lightClass: 'mode-light',
        classTarget: 'body',
        stylePreview: true,
    },
    docs: {
        // get theme() {
        //     let isDarkMode = parent.document.body.classList.contains("mode-dark");
        //     return isDarkMode ? themes.dark : themes.light;
        container: DocsContainer,
    },
};
