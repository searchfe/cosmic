import type { TabsProps } from 'smelte/src/components/Tabs/Tabs';
import _Tabs from 'smelte/src/components/Tabs';
export default class extends _Tabs {
    constructor(props: {
        target: Element;
        props: TabsProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}