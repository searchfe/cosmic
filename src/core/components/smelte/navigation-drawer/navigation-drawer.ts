import type { NavigationDrawerProps } from 'smelte/src/components/NavigationDrawer/NavigationDrawer';
import _NavigationDrawer from 'smelte/src/components/NavigationDrawer';
export default class extends _NavigationDrawer {
    constructor(props: {
        target: Element;
        props: NavigationDrawerProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}