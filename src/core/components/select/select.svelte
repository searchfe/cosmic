<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { quadOut, quadIn } from 'svelte/easing';
  import List from '../list';
  import TextField from '../text-field';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';
  import { hideListAction } from 'smelte/src/utils/hide-list-action';

  const optionsClassesDefault = 'absolute left-0 bg-white rounded shadow w-full z-20 dark:bg-dark-500';
  const classesDefault = 'cursor-pointer relative pb-2';

  const noop = (i) => i;

  export let items = [];
  export let value = '';
  export const text = '';
  export let label = '';
  let selectedLabelProp = undefined;
  export { selectedLabelProp as selectedLabel };
  export let color = 'cgray';
  export let outlined = false;
  export let placeholder = '';
  export let hint = '';
  export let error = false;
  export let append = 'arrow_drop_down';
  export let dense = false;
  export let persistentHint = false;
  export let autocomplete = false;
  export let noUnderline = true;
  export let showList = false;
  export let classes = classesDefault;
  export let optionsClasses = optionsClassesDefault;

  export let inputWrapperClasses = noop;
  export let appendClasses = () => 'absolute right-0 top-0 pb-2 pr-4 pt-1 text-gray-50 z-10';
  export let labelClasses = noop;
  export let inputClasses = () =>
    'pb-2 pt-2 px-4 rounded-t bg-cgray-400 text-gray-50 g-cgray-500 dark:bg-cgray-600 dark:text-gray-200 w-full';
  export let prependClasses = () => 'absolute left-0 top-0 pb-2 pl-2 pt-1 text-xs text-gray-700 z-10';
  export let listClasses = noop;
  export let selectedClasses = noop;
  export let itemClasses = () =>
    'bg-cgray-400 dark:bg-cgray-700 relative overflow-hidden duration-100 py-2 px-4 cursor-pointer text-gray-50 flex items-center z-10';

  export let add = '';
  export let remove = '';
  export let replace = '';

  let itemsProcessed = [];

  function process(it) {
    return it.map((i) => (typeof i !== 'object' ? { value: i, text: i } : i));
  }

  $: itemsProcessed = process(items);

  const dispatch = createEventDispatcher();

  let selectedLabel = '';
  $: {
    if (selectedLabelProp !== undefined) {
      selectedLabel = selectedLabelProp;
    } else if (value !== undefined) {
      let selectedItem = itemsProcessed.find((i) => i.value === value);
      selectedLabel = selectedItem ? selectedItem.text : '';
    } else {
      selectedLabel = '';
    }
  }

  let filterText = null;
  $: filteredItems = itemsProcessed.filter((i) => !filterText || i.text.toLowerCase().includes(filterText));

  function filterItems({ target }) {
    filterText = target.value.toLowerCase();
  }

  function handleInputClick() {
    if (autocomplete) {
      showList = true;
    } else {
      showList = !showList;
    }
  }

  const onHideListPanel = () => (showList = false);

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb.flush().add(classes, true, classesDefault).add($$props.class).get();

  const ocb = new ClassBuilder(optionsClasses, optionsClassesDefault);
  $: o = ocb.flush().add(optionsClasses, true, optionsClassesDefault).add('rounded-t-none', !outlined).get();

  $: if (dense) {
    appendClasses = (i) => i.replace('pt-4', 'pt-3');
  }
</script>

<div class="{c}" use:hideListAction="{onHideListPanel}">
  <slot name="select">
    <TextField
      select
      dense="{dense}"
      focused="{showList}"
      autocomplete="{autocomplete}"
      value="{selectedLabel}"
      outlined="{outlined}"
      label="{label}"
      placeholder="{placeholder}"
      hint="{hint}"
      error="{error}"
      append="{append}"
      persistentHint="{persistentHint}"
      color="{color}"
      add="{add}"
      remove="{remove}"
      replace="{replace}"
      noUnderline="{noUnderline}"
      class="{inputWrapperClasses}"
      appendClasses="{appendClasses}"
      labelClasses="{labelClasses}"
      inputClasses="{inputClasses}"
      prependClasses="{prependClasses}"
      on:click="{handleInputClick}"
      on:click-append="{(e) => (showList = !showList)}"
      on:click
      on:input="{filterItems}"
      appendReverse="{showList}"
    />
  </slot>

  {#if showList}
    <slot name="options">
      <div class="{o}" on:click="{() => (showList = false)}">
        <List
          bind:value
          class="{listClasses}"
          selectedClasses="{selectedClasses}"
          itemClasses="{itemClasses}"
          select
          dense="{dense}"
          items="{filteredItems}"
          on:change="{({ detail }) => {
            dispatch('change', detail);
          }}"
        />
      </div>
    </slot>
  {/if}
</div>
