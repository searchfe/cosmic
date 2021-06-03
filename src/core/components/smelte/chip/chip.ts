import type { ChipProps } from 'smelte/src/components/Chip/Chip';
import _Chip from 'smelte/src/components/Chip';
export default class extends _Chip {
    constructor(props: {
        target: Element;
        props: ChipProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        // chip 中的字体是写死的，text-sm，替换不产生作用
        props.props.replace = {
            'text-sm': 'text-base'
        }
        super(props);
    }
}