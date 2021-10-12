<script lang="typescript">
  interface IData {
    text?: string;
    num?: string;
    hoverIcon?: string;
    icon?: string;
  }

  export let data:IData = {};

  let hovering = false;

  function mouseleaveHandler() {
    hovering = false;
  }
  function mouseenterHandler() {
    hovering = true;
  }
</script>

<div class="card bg-gray-10 hover:bg-blue hover:text-white" on:mouseleave={mouseleaveHandler} on:mouseenter|stopPropagation={mouseenterHandler}>
  <div class="flex-auto">
    <div class="text-h3 font-semibold">{data.text}</div>
    <div class="text-sm mt-5 {hovering ? 'text-white' : 'text-cgray-300'}">{data.num}</div>
  </div>
  <img class="img" class:hidden={!hovering} src={data.hoverIcon} alt=""/>
  <img class="img" class:hidden={hovering} src={data.icon} alt=""/>
</div>

<style>
  .card {
    width: 180px;
    height: 72px;
    @apply rounded-2xl;
    @apply relative;
    @apply flex;
    @apply relative;
    @apply justify-between;
    @apply px-8;
    @apply py-6;
    @apply mr-4;
  }
  .img {
    flex: none;
    width: 40px;
    height: 40px;
  }
</style>
