import type { MenuProps } from 'smelte/src/components/Menu/Menu';
import _Menu from 'smelte/src/components/Menu';
export default class extends _Menu {
    constructor(props: {
        target: Element;
        props: MenuProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}