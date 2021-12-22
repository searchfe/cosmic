<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button } from '@cosmic/core/components';

  const dispatch = createEventDispatcher();

  function buttonClickHandler() {
    dispatch('create');
  }
</script>

<div class="flex justify-between">
  <div />
  <Button icon="add" on:click={buttonClickHandler} />
</div>
