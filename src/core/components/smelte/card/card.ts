import type { CardProps } from 'smelte/src/components/Card/Card';
import _Card from 'smelte/src/components/Card';
export default class extends _Card.Card {
    constructor(props: {
        target: Element;
        props: CardProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}