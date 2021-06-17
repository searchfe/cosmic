<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  export let accordion = false;
  export let activeKey = NaN;

  const accordionStore = writable(accordion);
  const activeKeyStore = writable(activeKey);
  setContext('accordion', accordionStore);
  setContext('activeKey', activeKeyStore);

</script>

<div class="w-full {$$props.class}">
  <slot/>
</div>
