<script lang="ts" context="module">
  export const COLLAPSE = { name: 'collapse' };
</script>

<script lang="ts">
  import { setContext, onMount, createEventDispatcher } from 'svelte';
  import { readable } from 'svelte/store';

  type CollapseKey = string | number | string[] | number[];

  export let accordion = false;

  export let activeKey: CollapseKey = [];
  export const defaultActiveKey: CollapseKey = [];

  let changeSet;
  const dispatch = createEventDispatcher();
  // all items selected status, key is itemKey, value is boolean.
  const selectedSet = readable<Set<string>>(new Set(), function start(set) {
    changeSet = set;
    return () => {
      changeSet = undefined;
    };
  });

  function selectItem(
    keys: string[],
    { toogle = false, replace = false }: Record<string, unknown> = { toogle: false, replace: false }
  ) {
    if (keys.length === 0) {
      // empty array will clear all
      activeKey = [];
      return;
    }
    if (accordion) {
      // accordion mode only has one selected item
      const single = keys[0];
      activeKey = $selectedSet.has(single) && toogle ? [] : [single];
      return;
    }
    let selectedSetCopy: Set<string>;
    if (toogle) {
      selectedSetCopy = new Set($selectedSet);
      // toogle mode set opposite value
      keys.forEach((k) => {
        if (selectedSetCopy.has(k)) {
          selectedSetCopy.delete(k);
        } else {
          selectedSetCopy.add(k);
        }
      });
    } else {
      selectedSetCopy = new Set(replace ? keys : keys.concat(...$selectedSet));
    }
    activeKey = [...selectedSetCopy];
  }

  function formateActiveKey(keys: CollapseKey) {
    if (!Array.isArray(keys)) {
      return [keys.toString()];
    }
    return keys.map((k) => k.toString());
  }

  setContext(COLLAPSE, {
    onClickItem(key: string) {
      selectItem([key], { toogle: true });
      dispatch('change', { activeKey });
    },
    selectedSet,
  });

  // data flow: activeKey change -> changeSet() -> view layer
  $: {
    changeSet(new Set(activeKey as string[]));
  }

  onMount(() => {
    // TODO
    let currentActiveKey = (Array.isArray(activeKey) && activeKey.length) === 0 ? defaultActiveKey : activeKey;
    selectItem(formateActiveKey(currentActiveKey), { replace: true });
  });
</script>

<div>
  <slot />
</div>
