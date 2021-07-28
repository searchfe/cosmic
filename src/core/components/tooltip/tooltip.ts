import type { TooltipProps } from 'smelte/src/components/Tooltip/Tooltip';
import _Tooltip from 'smelte/src/components/Tooltip';
export default class extends _Tooltip {
  constructor(props: {
    target: Element;
    props: TooltipProps;
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
