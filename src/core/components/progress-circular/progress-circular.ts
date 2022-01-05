import type { ProgressCircularProps } from 'smelte/src/components/ProgressCircular/ProgressCircular';
import _ProgressCircular from 'smelte/src/components/ProgressCircular';
export default class extends _ProgressCircular {
    constructor(props: {
        target: Element;
        props: ProgressCircularProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}
