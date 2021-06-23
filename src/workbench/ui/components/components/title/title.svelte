<script lang="ts">
  import {Icon} from '@cosmic/core/components';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  export let title;
  export let append = '';
  export let noUnderline = false;
  export let defaultClass = 'h-8 flex justify-between  text-cgray-50 dark:text-cgray-200 items-center my-2 px-4 bg-cgray-400 dark:bg-cgray-700 dark:border-cgray-500'

  const cb = new ClassBuilder($$props.class);

  $:c = cb.flush()
    .add($$props.class)
    .add(defaultClass)
    .add('border-b', !noUnderline)
    .get()
</script>

<div class="{c}">
  <slot name="left">
    <div>{title}</div>
  </slot>
  <slot name="right">
    <Icon class='cursor-pointer' on:click>{append}</Icon>
  </slot>
</div>
