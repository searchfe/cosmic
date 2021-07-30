<script>
  import Icon from '../icon';
  import utils, { ClassBuilder } from 'smelte/src/utils/classes';

  const classesDefault =
    'active:bg-active relative overflow-hidden text-center w-full h-full p-2 cursor-pointer flex mx-auto items-center text-sm h-full dark:bg-cgray-600 bg-cgray-400';

  export let classes = classesDefault;

  export let icon = '';
  export let id = '';
  export let text = '';
  export let to = '';
  export let selected = '';
  export let color = 'cgray';
  export let notSelectedColor = 'cgray';
  export let tabClasses = 'flex flex-col items-center content-center mx-auto';

  // const ripple = createRipple(color);

  const { txt, bg } = utils(color);
  const notSelected = utils(notSelectedColor);

  // $: textColor = selected === id ? txt(2) : notSelected.txt();
  $: bgColor = selected === id ? 'dark:bg-active bg-active' : '';
  const cb = new ClassBuilder(classes, classesDefault);

  $: c = cb
    .flush()
    .add()
    .add($$props.class)
    .add('uppercase', icon)
    .add(bgColor)
    .add(`hover:bg-${color}-500 hover:${txt(200)}`, selected !== id)
    .get();
</script>

{#if to}
  <a href="{to}" class="{c}" on:click>
    <div class="{tabClasses}">
      {#if icon}
        <Icon class="mb-1" color="{bgColor}">{icon}</Icon>
      {/if}

      <div>
        <slot>{text}</slot>
      </div>
    </div>
  </a>
{:else}
  <li class="{c}" on:click="{() => (selected = id)}" on:click>
    <div class="{tabClasses}">
      {#if icon}
        <Icon class="mb-1" color="{bgColor}">{icon}</Icon>
      {/if}

      <div>
        <slot>{text}</slot>
      </div>
    </div>
  </li>
{/if}
