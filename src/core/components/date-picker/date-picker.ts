import type { DatePickerProps } from 'smelte/src/components/DatePicker/DatePicker';
import _DatePicker from 'smelte/src/components/DatePicker';
export default class extends _DatePicker {
  constructor(props: {
    target: Element;
    props: DatePickerProps;
    hydrate?: boolean;
    anchor?: Element;
    intro?: boolean;
    $$inline?: boolean;
  }) {
    super(props);
  }
}
