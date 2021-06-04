import { configure, addDecorator } from '@storybook/svelte'

function loadStories() {
    require('../scripts/spript-stories/button/button.stories.ts');
}
configure(loadStories, module);