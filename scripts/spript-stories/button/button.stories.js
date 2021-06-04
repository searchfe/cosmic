import 'smelte/src/tailwind.css';
import '../utils/global.css';
import '../../../src/workbench/ui/css/global.css';
import { storiesOf } from '@storybook/svelte';
import { action } from '@storybook/addon-actions';
import Button from './button-view.svelte';
import markdownNotes from './button.stories.md';

storiesOf('Buttons', module)
    .add(
        'default',
        () => ({
            Component: Button,
            props: {
                label: 'test',
            },
            on: {
                customEventHandler: action('This custom event handler works'),
            },
        }),
        { notes:  { markdown: markdownNotes }  },
    )
    .add(
        'dark',
        () => ({
            Component: Button,
            props: {
                label: 'test',
                dark: true,
            },
            on: {
                customEventHandler: action('This custom event handler works'),
            },
        }),
        { notes:  { markdown: markdownNotes }  },
    );