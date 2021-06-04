import type { DialogProps } from 'smelte/src/components/Dialog/Dialog';
import _Dialog from 'smelte/src/components/Dialog';
export default class extends _Dialog {
    constructor(props: {
        target: Element;
        props: DialogProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}