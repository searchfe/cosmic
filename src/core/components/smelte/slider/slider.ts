import type { SliderProps } from 'smelte/src/components/Slider/Slider';
import _Slider from 'smelte/src/components/Slider';
export default class extends _Slider {
    constructor(props: {
        target: Element;
        props: SliderProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}