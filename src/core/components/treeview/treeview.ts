import type { TreeviewProps } from 'smelte/src/components/Treeview/Treeview';
import _Treeview from 'smelte/src/components/Treeview';
export default class extends _Treeview {
    constructor(props: {
        target: Element;
        props: TreeviewProps;
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