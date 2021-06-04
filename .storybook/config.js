import { configure, addParameters, addDecorator } from '@storybook/svelte';

const req = require.context('../scripts/spript-stories', true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
addParameters( { viewport: { viewports: newViewports } });