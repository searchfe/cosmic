import type { TextFieldProps } from 'smelte/src/components/TextField/TextField';
import _TextField from 'smelte/src/components/TextField';

export default class extends _TextField {
    constructor(props: {
        target: Element;
        props: TextFieldProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        props.props = props.props || {};
        props.props.replace = {
            'text-sm': 'text-base',
        };
        super(props);
    }
}