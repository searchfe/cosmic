import type { SwitchProps } from 'smelte/src/components/Switch/Switch';
import _Switch from 'smelte/src/components/Switch';
export default class extends _Switch {
    constructor(props: {
        target: Element;
        props: SwitchProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}