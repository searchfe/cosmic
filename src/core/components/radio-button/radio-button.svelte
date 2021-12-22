<script>
  import Icon from '../icon';
  import Ripple from '../ripple';
  import Label from '../checkbox/label.svelte';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';

  const classesDefault = 'inline-flex block items-center mb-2 cursor-pointer z-0';

  export let selected = '';
  export let label = '';
  export let color = 'active';
  export let disabled = false;
  export let name = '';
  export let value = '';
  export let classes = classesDefault;
  export let small = false;
  export let labelClasses = i => i;

  function select() {
    if (disabled) return;

    selected = value;
  }

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb.flush().add(classes, true, classesDefault).add($$props.class).get();

  $: rippleColor = value && !disabled ? color : 'gray';
</script>

<div class={c} on:click={select}>
  <input aria-label={label} class="hidden" type="radio" role="radio" {disabled} {name} selected={selected === value} />
  <div class="relative">
    <Ripple color={rippleColor}>
      {#if selected === value}
        <Icon {small} class="text-{disabled ? 'gray' : color}" extraStyle="font-size: 1.2rem">
          radio_button_checked
        </Icon>
      {:else}
        <Icon
          {small}
          class={disabled ? 'text-gray-500 dark:text-gray-600' : 'text-gray-600'}
          extraStyle="font-size: 1.2rem"
        >
          radio_button_unchecked
        </Icon>
      {/if}
    </Ripple>
  </div>
  <slot name="label">
    <Label {disabled} {label} class={labelClasses} checked={selected} />
  </slot>
</div>
