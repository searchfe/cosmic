<script>
  import { ClassBuilder } from 'smelte/src/utils/classes.js';

  const classesDefault = 'cursor-pointer';

  export let classes = classesDefault;

  export let label = '';
  export let disabled = false;
  export let disabledClasses = 'text-gray-500 dark:text-gray-600';

  export let checked = false;
  export let checkedClasses = 'text-gray-700 dark:text-gray-300';
  export let uncheckedClasses = 'hover:text-gray-700 dark-hover:text-gray-300 text-gray-600 dark:text-gray-400';

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add(disabledClasses, disabled)
    .add(checkedClasses, !disabled && checked)
    .add(uncheckedClasses, !disabled && !checked)
    .add($$props.class)
    .get();
</script>

<label aria-hidden="true" {...$$props} class="{c}">
  <slot>{label}</slot>
</label>
