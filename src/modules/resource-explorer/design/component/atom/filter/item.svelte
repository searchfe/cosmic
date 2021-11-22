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
  class="w-168 h-68 rounded-xl relative flex justify-between p-14 flex-none mr-10 bg-gray-100 hover:bg-blue text-black hover:text-white"
  on:mouseleave="{mouseleaveHandler}"
  on:mouseenter|stopPropagation="{mouseenterHandler}"
>
  <div class="flex-auto">
    <div class="text-h3 font-semibold">{data.text}</div>
    <div class="text-base mt-14">{data.num}</div>
  </div>
  <img class="flex h-40 w-40" src="{hovering ? data.hoverIcon : data.icon}" alt="" />
</div>
