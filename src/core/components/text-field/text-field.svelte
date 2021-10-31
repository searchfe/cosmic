<script>
  import { createEventDispatcher } from 'svelte';
  import utils, { ClassBuilder, filterProps } from 'smelte/src/utils/classes';

  import Icon from '../icon';
  import Label from './label.svelte';
  import Hint from './hint.svelte';
  import Underline from './underline.svelte';

  export let outlined = false;
  export let value = null;
  export let label = '';
  export let placeholder = '';
  export let hint = '';
  export let error = false;
  export let append = '';
  export let prepend = '';
  export let persistentHint = false;
  export let textarea = false;
  export let rows = 5;
  export let select = false;
  export let dense = false;
  export let autocomplete = false;
  export let noUnderline = true;
  export let appendReverse = false;
  export let prependReverse = false;
  export let color = 'gray';
  // for outlined button label
  export let bgColor = 'white';
  export let iconClass = '';
  export let disabled = false;

  const inputDefault =
    'pb-2 pt-2 px-4 rounded-t text-gray-50  dark:text-gray-200 w-full bg-cgray-400 dark:bg-cgray-600';
  const classesDefault = 'mt-2 mb-4 relative text-gray-600 dark:text-gray-100';
  const appendDefault = 'absolute right-0 top-0 pb-2 pr-4 pt-1 text-gray-700 z-10';
  const prependDefault = 'absolute left-0 top-0 pb-2 pl-2 pt-1 text-base text-cgray-500 z-10';

  export let add = '';
  export let remove = '';
  export let replace = '';

  export let inputClasses = inputDefault;
  export let classes = classesDefault;
  export let appendClasses = appendDefault;
  export let prependClasses = prependDefault;

  const { bg, border, txt, caret } = utils(color);

  const cb = new ClassBuilder(inputClasses, inputDefault);
  const ccb = new ClassBuilder(classes, classesDefault);
  const acb = new ClassBuilder(appendClasses, appendDefault);
  const pcb = new ClassBuilder(prependClasses, prependDefault);

  export let extend = () => {};

  export let focused = false;
  let wClasses = (i) => i;
  let aClasses = (i) => i;
  let pClasses = (i) => i;

  function toggleFocused() {
    focused = !focused;
  }

  $: showHint = error || (persistentHint ? hint : focused && hint);
  $: labelOnTop = placeholder || focused || value || value === 0;

  $: iClasses = cb
    .flush()
    .remove('pt-6 pb-2', outlined)
    .add('border rounded bg-transparent py-2 duration-200 ease-in', outlined)
    .add('border-error-500 caret-error-500', error)
    .remove(caret(), error)
    .add(caret('50'), !error)
    .add(border(), outlined && focused && !error)
    .add('bg-gray-100 dark:bg-dark-600', !outlined)
    .add('bg-gray-300 dark:bg-dark-200', focused && !outlined)
    .remove('px-4', prepend)
    .add('pr-4 pl-8', prepend)
    .add('pr-9', append)
    .add(add)
    .remove('pt-2 pb-2', dense && !outlined)
    .add('pt-6', label && !outlined)
    .add('pt-4 pb-1', dense && !outlined)
    .remove('bg-gray-100', disabled)
    .add('bg-gray-50', disabled)
    .add('cursor-pointer', select && !autocomplete)
    .add($$props.class)
    .remove(remove)
    .replace(replace)
    .extend(extend)
    .add('hover:bg-cgray-500')
    .get();

  $: wClasses = ccb
    .flush()
    .add('select', select || autocomplete)
    .add('dense', dense && !outlined)
    .remove('mb-4 mt-2', dense && !outlined)
    .add('mb-2 mt-1', dense)
    .replace({ 'text-gray-600': 'text-error-500' }, error)
    .add('text-gray-200', disabled)
    .get();

  $: aClasses = acb.flush().get();
  $: pClasses = pcb.flush().get();

  const props = filterProps(
    [
      'outlined',
      'label',
      'placeholder',
      'hint',
      'error',
      'append',
      'prepend',
      'persistentHint',
      'textarea',
      'rows',
      'select',
      'autocomplete',
      'noUnderline',
      'appendReverse',
      'prependReverse',
      'color',
      'bgColor',
      'disabled',
      'replace',
      'remove',
      'small',
    ],
    $$props
  );

  const dispatch = createEventDispatcher();
</script>

<div class="{wClasses}">
  {#if label}
    <slot name="label">
      <Label
        labelOnTop="{labelOnTop}"
        focused="{focused}"
        error="{error}"
        outlined="{outlined}"
        prepend="{prepend}"
        color="{color}"
        bgColor="{bgColor}"
        dense="{dense && !outlined}">{label}</Label
      >
    </slot>
  {/if}

  {#if (!textarea && !select) || autocomplete}
    <input
      aria-label="{label}"
      class="{iClasses}"
      on:focus="{toggleFocused}"
      on:blur="{toggleFocused}"
      on:blur
      bind:value
      on:change
      on:input
      on:keydown
      on:keypress
      on:keyup
      disabled="{disabled}"
      on:click
      on:focus
      {...props}
      placeholder="{!value ? placeholder : ''}"
    />
  {:else if textarea && !select}
    <textarea
      rows="{rows}"
      aria-label="{label}"
      class="{iClasses}"
      on:change
      on:input
      on:keydown
      on:keypress
      on:keyup
      disabled="{disabled}"
      on:click
      on:focus
      on:blur
      bind:value
      {...props}
      on:focus="{toggleFocused}"
      on:blur="{toggleFocused}"
      placeholder="{!value ? placeholder : ''}"></textarea>
  {:else if select && !autocomplete}
    <input
      readonly
      class="{iClasses}"
      on:change
      on:input
      on:keydown
      on:keypress
      on:keyup
      disabled="{disabled}"
      on:click
      on:blur
      on:focus
      value="{value}"
    />
  {/if}

  {#if append}
    <div class="{aClasses}" on:click="{() => dispatch('click-append')}">
      <slot name="append">
        <Icon reverse="{appendReverse}" class="{focused ? txt() : ''} {iconClass}">
          {append}
        </Icon>
      </slot>
    </div>
  {/if}

  {#if prepend}
    <div class="{pClasses}" on:click="{() => dispatch('click-prepend')}">
      <slot name="prepend">
        <Icon reverse="{prependReverse}" class="{focused ? txt() : ''} {iconClass}">
          {prepend}
        </Icon>
      </slot>
    </div>
  {/if}

  <Underline noUnderline="{noUnderline}" outlined="{outlined}" focused="{focused}" error="{error}" />

  {#if showHint}
    <Hint error="{error}" hint="{hint}" />
  {/if}
</div>
