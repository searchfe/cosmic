import 'smelte/src/tailwind.css'
import { storiesOf } from '@storybook/svelte';

import Button from './button-view.svelte';

storiesOf('Buttons', module)
    .add('default', () => ({
        Component: Button,
        props: {
            label: 'test'
        }
    }))