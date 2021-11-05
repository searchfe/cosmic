<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '@cosmic/core/components';
  import type { TreeNode } from './type';
  import { ClassBuilder } from 'smelte/src/utils/classes.js';

  export let data: TreeNode;

  const defaultContainerClasses = '';
  const defaultNodeClasses = 'h-30 pr-3 flex items-center text-base text-black hover:bg-cgray-100';

  export let containerClass = '';
  export let nodeClass = '';
  export let extraIcon = '';
  export let primaryIndent = 0;
  export let indentStep = 2.25;
  export let treeIcon = '';
  export let leafIcon = '';

  const containerClassBuilder = new ClassBuilder(defaultContainerClasses);
  const nodeClassBuilder = new ClassBuilder(defaultNodeClasses);

  const dispatch = createEventDispatcher();

  const { label, children, key } = data;
  const _expansionState: Record<string, boolean> = {};
  let expanded = _expansionState[key] || false;

  const toggleExpansion = (e) => {
    expanded = _expansionState[key] = !expanded;
    dispatch('click', { selectedKey: key });
  };

  function onClickExtra() {
    dispatch('click-extra', { clickedKey: key });
  }

  $: arrowStatus = expanded ? 'arrow_drop_down' : 'arrow_right';

  $: containerComputedClass = containerClassBuilder.flush().add(containerClass).get();

  $: nodeComputedClass = nodeClassBuilder.flush().add(nodeClass).get();
</script>

<div class="{containerComputedClass}">
  <div
    class="{nodeComputedClass}"
    style="{`padding-left: ${primaryIndent}rem;`}"
    on:click|stopPropagation="{toggleExpansion}"
  >
    {#if children && children.length}
      <div class="flex-none">
        <Icon>{arrowStatus}</Icon>
      </div>
      {#if treeIcon}
        <Icon small classes="mr-4">{treeIcon}</Icon>
      {/if}
    {:else if leafIcon}
      <Icon small classes="mr-4">{leafIcon}</Icon>
    {/if}

    <span class="flex-auto">{label}</span>
    {#if extraIcon}
      <div class="flex-none" on:click|stopPropagation="{onClickExtra}">
        <Icon small>{extraIcon}</Icon>
      </div>
    {/if}
  </div>
  {#if expanded && children && children.length}
    {#each children as child}
      <svelte:self
        extraIcon="{extraIcon}"
        data="{child}"
        primaryIndent="{primaryIndent + indentStep}"
        indentStep="{indentStep}"
        on:click-extra
        on:click
      />
    {/each}
  {/if}
</div>
