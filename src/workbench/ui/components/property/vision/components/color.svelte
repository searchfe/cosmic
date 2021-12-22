<script lang="ts">
  import { Icon, TextField } from '@cosmic/core/components';
  export let color: string = '';
  export let opacity = '100%';
  let isVisibility = true;
  let classes = 'mt-2 mb-2 relative text-gray-600 dark:text-gray-100 w-28';

  $: styleColor = color.startsWith('#') ? color : `#${color}`;

  $: styleOpacity = opacity.substring(0, 3);

  function colorChangeHandle(event) {
    const thisValue = event.target.value;
    color = thisValue === color ? color : thisValue;
  }

  function opacityChangeHandle(event) {
    let thisOpacity: string = event.target.value;
    if (thisOpacity && !thisOpacity.endsWith('%')) {
      thisOpacity += '%';
    }
    opacity = thisOpacity === opacity ? opacity : thisOpacity;
  }
</script>

<div class="flex items-center px-4 justify-around">
  <div class="flex items-center">
    <div class="h-7 w-10 border mr-4" style="background-color: {styleColor}; opacity: {styleOpacity}" />
    <TextField on:change={colorChangeHandle} {classes} value={color} />
    <TextField on:change={opacityChangeHandle} {classes} value={opacity} />
  </div>
  <Icon class="cursor-pointer" on:click={() => (isVisibility = !isVisibility)}
    >{isVisibility ? 'visibility' : 'visibility_off'}</Icon
  >
  <Icon class="cursor-pointer">remove</Icon>
</div>
