import type { ButtonProps } from 'smelte/src/components/Button/Button';
import _Button from 'smelte/src/components/Button';
export default class extends _Button {
    constructor(props: {
        target: Element;
        props: ButtonProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        props.props = props.props || {};
        props.props.remove = 'bg-primary-500 hover:bg-primary-400';
        props.props.basicClasses = 'bg-primary dark:bg-primary-dark  hover:bg-primary dark:hover:bg-primary-dark';
        props.props.replace = {
            'text-sm': 'text-base'
        };
        super(props);
    }
}