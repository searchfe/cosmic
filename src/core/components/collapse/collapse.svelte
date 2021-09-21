<script lang="typescript" context="module">
  export const COLLAPSE = { name: 'collapse' };
</script>

<script lang="typescript">
  import { setContext, onMount } from 'svelte';
  import { readable } from 'svelte/store';

  type CollapseKey = string | number | string[] | number[];

  export let accordion = false;
  export let activeKey: CollapseKey = [];
  export const defaultActiveKey: CollapseKey = [];

  let changeSet;

  let currentActiveKey: CollapseKey;


  // all items selected status, key is itemKey, value is boolean.
  const selectedSet = readable<Set<string>>(new Set, function start(set) {
    changeSet = set;
    return () => {
      changeSet = undefined;
    };
  });

  function selectItem(
    keys: string[], 
    { toogle = false, replace = false }: Record<string, unknown> = { toogle: false, replace: false }) {
    if (keys.length === 0) {
      // empty array will clear all
      changeSet(new Set());
      return;
    }
    if (accordion) {
      // accordion mode only has one selected item
      const single = keys[0];
      changeSet($selectedSet.has(single) && toogle ? new Set() : new Set(single));
      return;
    }
    if (toogle) {
      // toogle mode set opposite value
      keys.forEach(k => {
        if ($selectedSet.has(k)) {
          $selectedSet.delete(k);
        }
        else {
          $selectedSet.add(k);
        }
      });
      changeSet($selectedSet);
    }
    else {
      // TODO: too many array spread
      changeSet(new Set(replace ? keys : [...keys, ...$selectedSet]));
    }
  }

  function formateActiveKey(keys: CollapseKey) {
    if (!Array.isArray(keys)) {
      return [keys.toString()];
    }
    return keys.map(k => k.toString());
  }

  setContext(COLLAPSE, {
    onClickItem(key: string) {
      selectItem([key], {toogle: true});
      activeKey = [...$selectedSet];
    },
    selectedSet
  });

  onMount(() => {
    // TODO
    currentActiveKey = (Array.isArray(activeKey) && activeKey.length) === 0 ? defaultActiveKey : activeKey;
    selectItem(formateActiveKey(currentActiveKey), {replace: true});
  });

  $: selectItem(formateActiveKey(activeKey), {replace: true});
</script> 

<div class="collapse" style="border: 1px solid red;">
  <slot></slot>
</div>
