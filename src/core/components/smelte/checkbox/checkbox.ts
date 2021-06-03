import type { CheckboxProps } from 'smelte/src/components/Checkbox/Checkbox';
import _Checkbox from 'smelte/src/components/Checkbox';
export default class extends _Checkbox {
    constructor(props: {
        target: Element;
        props: CheckboxProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        props.props = props.props || {};
        props.props.replace = {
            'text-sm': 'taxt-base'
        };
        super(props);
    }
}