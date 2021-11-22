<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Dialog, Button } from '@cosmic/core/components';
  import Color from './color.svelte';

  const typeMap = {
    color: {
      text: '颜色',
      component: Color,
    },
  };

  export let show = false;
  export let type = 'color';
  export let team = '';

  const dispatch = createEventDispatcher();

  function onDialogCancel() {
    show = false;
  }

  function onDialogConfirm() {
    innerCreate(team).finally(() => {
      dispatch('created');
      show = false;
    });
  }

  let innerCreate;

</script>

<Dialog bind:value="{show}" width="500px">
  <div class="text-center mb-10" slot="title">{typeMap[type].text}</div>
  <input type="text" />
  <svelte:component bind:onCreate="{innerCreate}" this={typeMap[type].component}></svelte:component>
  <div class="justify-center flex" slot="actions">
    <Button class="rounded-full mr-4" on:click="{onDialogCancel}">取消</Button>
    <Button class="rounded-full" type="primary" on:click="{onDialogConfirm}">确定</Button>
  </div>
</Dialog>
