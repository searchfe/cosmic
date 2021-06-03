import type { ListProps } from 'smelte/src/components/List/List';
import _List from 'smelte/src/components/List';

export default class extends _List {
    constructor(props: {
        target: Element;
        props: ListProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}