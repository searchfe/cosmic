<style>
  .card {
    @apply w-168;
    @apply h-68;
    @apply rounded-xl;
    @apply relative;
    @apply flex;
    @apply relative;
    @apply justify-between;
    @apply p-14;
    @apply flex-none;
  }
  .img {
    @apply flex;
    @apply w-40;
    @apply h-40;
  }
</style>

<script lang="ts">
  interface IData {
    text?: string;
    num?: string;
    hoverIcon?: string;
    icon?: string;
  }

  export let data: IData = {};

  let hovering = false;

  function mouseleaveHandler() {
    hovering = false;
  }
  function mouseenterHandler() {
    hovering = true;
  }
</script>

<div
  class="card mr-10 bg-gray-100 hover:bg-blue text-black hover:text-white"
  on:mouseleave="{mouseleaveHandler}"
  on:mouseenter|stopPropagation="{mouseenterHandler}"
>
  <div class="flex-auto">
    <div class="text-h3 font-semibold">{data.text}</div>
    <div class="text-base mt-14">{data.num}</div>
  </div>
  <img class="img" src="{hovering ? data.hoverIcon : data.icon}" alt="" />
</div>
