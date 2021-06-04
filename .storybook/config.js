import { configure, addDecorator } from '@storybook/svelte';

function loadStories() {
    require('../scripts/spript-stories/button/button.stories');
}
configure(loadStories, module);