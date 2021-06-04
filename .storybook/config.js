import { configure, addParameters, addDecorator } from '@storybook/svelte';
import { themes } from '@storybook/theming';

const req = require.context('../scripts/spript-stories', true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
addParameters( { 
    // viewport: { viewports: newViewports },
    // docs: {
    //     theme: themes.dark,
    // },
    darkMode: {
        // Override the default dark theme
        current: 'light',
        dark: { ...themes.dark, appBg: 'black' },
        // Override the default light theme
        light: { ...themes.normal, appBg: 'white' },
        darkClass: 'mode-dark',
        lightClass: 'mode-light',
        classTarget: 'body',
        stylePreview: true
    }
});
