import type { SnackbarProps } from 'smelte/src/components/Snackbar/Snackbar';
import _Snackbar from 'smelte/src/components/Snackbar';
export default class extends _Snackbar {
    constructor(props: {
        target: Element;
        props: SnackbarProps;
        hydrate?: boolean;
        anchor?: Element;
        intro?: boolean;
        $$inline?: boolean;
    }) {
        super(props);
    }
}