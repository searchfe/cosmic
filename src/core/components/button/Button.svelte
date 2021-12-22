<script lang="ts">
  /**
   * 按钮用于开始一个即是操作
   * @component
   */
  import Icon from 'smelte/src/components/Icon';
  import utils, { ClassBuilder, filterProps } from 'smelte/src//utils/classes.js';
  import createRipple from 'smelte/src/components/Ripple/ripple.js';

  export let value = false;
  export let outlined = false;
  export let text = false;
  export let block = false;
  export let disabled = false;
  export let icon = null;
  export let small = false;
  export let light = false;
  export let dark = false;
  export let iconClass = '';
  export let color = 'cgray';
  export let href = null;
  export let fab = false;
  export let type = 'normal';

  export let remove = '';
  export let add = '';
  export let replace = {};

  const typeMap = {
    normal: 'py-2 px-4 text-black bg-gray-100 border-gray-200 hover:text-blue active:text-blue-100',
    primary: 'text-white bg-blue border-blue-100 hover:bg-blue-100 active:text-white-700',
    icon: 'w-26 h-26 bg-gray-100 hover:opacity-30',
  };

  const boxDefault = 'w-120 h-40';
  const basicClasses = 'relative overflow-hidden text-h3 font-normal box-border z-10 duration-200 ease-in';

  const iconDefault = 'flex items-center justify-center select-none';
  const fabDefault = 'hover:bg-transparent';
  const smallDefault = 'pt-1 pb-1 pl-2 pr-2 text-base';
  const disabledDefault =
    'bg-gray-300 text-gray-500 dark:bg-dark-400 pointer-events-none hover:bg-gray-300 cursor-default';

  export let classes = '';
  export let iconClasses = iconDefault;
  export let fabClasses = fabDefault;
  export let smallClasses = smallDefault;
  export let disabledClasses = disabledDefault;

  fab = fab || (text && icon);
  // const basic = !outlined && !text && !fab;

  let Classes = i => i;
  let iClasses = i => i;
  let shade = 0;

  $: {
    shade = light ? 200 : 0;
    shade = dark ? -400 : shade;
  }

  // let bgc0 = 0;
  // let bgc1 = 0;
  // let lighter = 0;

  // if (light) {
  //   bgc0 = 400;
  //   bgc1 = 400;
  //   lighter = 500;
  // } else if (dark) {
  //   bgc0 = 600;
  //   bgc1 = 600;
  //   lighter = 500;
  // } else {
  //   bgc0 = 400;
  //   bgc1 = 600;
  //   lighter = 500;
  // }

  const { bg, border, txt } = utils(color);

  const cb = new ClassBuilder(basicClasses);
  let iconCb;

  if (icon) {
    iconCb = new ClassBuilder(iconClass);
    type = 'icon';
  }

  $: classes = cb
    .flush()
    .add(classes)
    .add(typeMap[type])
    .add(iconClasses, icon, iconDefault)
    .remove('py-2', icon)
    .add(disabledClasses, disabled, disabledDefault)
    .add(smallClasses, small, smallDefault)
    .add('flex items-center justify-center h-20 w-20', small && icon)
    .add('border-solid', outlined)
    .add(block ? 'w-full' : type === 'icon' ? '' : boxDefault)
    .add('rounded', outlined || text || icon)
    .add('button', !icon)
    .add(fabClasses, fab, fabDefault)
    .add(`hover:${bg('transLight')}`, fab)
    .add($$props.class)
    .remove(remove)
    .replace(replace)
    .add(add)
    .get();

  $: if (iconCb) {
    iClasses = iconCb
      .flush()
      .add(txt(), fab && !iconClass)
      .get();
  }

  const ripple = createRipple(text || fab || outlined ? color : 'white');

  const props = filterProps(
    [
      'outlined',
      'text',
      'color',
      'block',
      'disabled',
      'icon',
      'small',
      'light',
      'dark',
      'flat',
      'add',
      'remove',
      'replace',
    ],
    $$props,
  );
</script>

{#if href}
  <a {href} {...props}>
    <button class={classes} {...props} {disabled} on:click={() => (value = !value)} on:click on:mouseover on:*>
      {#if icon}
        <Icon class={iClasses} {small}>{icon}</Icon>
      {/if}
      <slot />
    </button>
  </a>
{:else}
  <button
    class={classes}
    {...props}
    {disabled}
    on:click={() => (value = !value)}
    on:click
    on:mouseover
    on:*
    style="text-shadow: none;"
  >
    {#if icon}
      <Icon class={iClasses} {small}>{icon}</Icon>
    {/if}
    <slot />
  </button>
{/if}
