import type { ProgressLinearProps } from 'smelte/src/components/ProgressLinear/ProgressLinear';
import _ProgressLinear from 'smelte/src/components/ProgressLinear';
export default class extends _ProgressLinear {
  constructor(props: {
    target: Element;
    props: ProgressLinearProps;
    hydrate?: boolean;
    anchor?: Element;
    intro?: boolean;
    $$inline?: boolean;
  }) {
    super(props);
  }
}
