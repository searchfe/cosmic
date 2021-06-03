import type { HeaderProps } from 'smelte/src/components/DataTable/Header';
import {Header as _Header} from 'smelte/src/components/DataTable';
export default class extends _Header {
    constructor(props: {
        target: Element;
        props: HeaderProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}