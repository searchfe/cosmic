import type { SelectProps } from 'smelte/src/components/Select/Select';
import _Select from 'smelte/src/components/Select';
export default class extends _Select {
    constructor(props: {
        target: Element;
        props: SelectProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}