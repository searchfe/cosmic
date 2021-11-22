<script lang="ts">
  import Card from '../../common/component/card.svelte';

  interface Info {
    key: string;
    value: string;
  }

  export let header = '';
  export let title = '';
  export let infos: Info[] = [];
  export let imgs: string[] = [];
  export let extra = '';
</script>

<Card classes="overflow-hidden pb-3/4 h-0">
  <img style="height: 58%" class="absolute top-0 left-0 w-full" src="{header}" alt="" />
  <div
    style="top: 62%;"
    class="absolute w-full h-1/10 left-0 flex justify-between items-center border-l-4 border-black"
  >
    <div class="flex flex-start items-center">
      <div class="ml-20 text-h3 text-black">{title}</div>
      {#each infos as info}
        <span class="mx-4">{info.key}&nbsp;{info.value}</span>
      {/each}
    </div>
    <div class="text-h3 mr-14">{extra}</div>
  </div>
  <div style="top: 76%;" class="w-full absolute h-1/5 px-14">
    <div class="overflow-hidden w-full height-full grid grid-cols-4 gap-x-1 rounded-xl">
      {#each imgs as img}
        <img class="flex w-full h-full" src="{img}" alt="" />
      {/each}
    </div>
  </div>
</Card>
