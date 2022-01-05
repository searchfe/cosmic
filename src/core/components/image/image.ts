import type { ImageProps } from 'smelte/src/components/Image/Image';
import _Image from 'smelte/src/components/Image';
export default class extends _Image {
    constructor(props: {
        target: Element;
        props: ImageProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}
