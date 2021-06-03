import type { SwitchProps } from 'smelte/src/components/Switch/Switch';
import _RadioButtonGroup from 'smelte/src/components/RadioButton';
export default class extends _RadioButtonGroup {
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