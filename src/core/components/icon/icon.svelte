<script>
  export let small = false;
  export let xs = false;
  export let reverse = false;
  export let tip = false;
  export let color = 'default';
  export let classes = '';
  export let outlined = false;
</script>

<i
  aria-hidden="true"
  class="{outlined
    ? 'material-icons-outlined'
    : 'material-icons'} icon text-xl select-none {classes} duration-200 ease-in"
  class:reverse
  class:tip
  on:click
  class:text-h3={small}
  class:text-base={xs}
  style={color ? `color: ${color}` : ''}
>
  <slot />
</i>

<style>
  .reverse {
    transform: rotate(180deg);
  }

  .tip {
    transform: rotate(90deg);
  }
</style>
