<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { Icon } from '@cosmic/core/components';
  import Card from '../../common/component/card.svelte';
  import type { Project } from '../../common/types/graphql';
  import { urlFor, ROUTES } from '../../routes';

  export let data: Project;

  export let avatar = 'https://fe-dev.bj.bcebos.com/%E5%8D%A1%E7%89%87%E5%9B%BE%E6%A0%8740*40.png';
  export let userAvatars: string[] = [
    'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F01.png',
    'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F02.png',
    'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F03.png',
    'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F04.png',
    'https://fe-dev.bj.bcebos.com/%E5%A4%B4%E5%83%8F05.png'
  ];
  export let info = '协作 30';

  function projectClickHandler() {
    push(urlFor(ROUTES.PROJECT_DETAIL, { projectId: data.id }));
  }
</script>

<Card classes="relative overflow-hidden pb-1/2 px-14 h-0 text-base" on:click="{projectClickHandler}">
  <div class="relative overflow-hidden w-1/4 pb-1/4 h-0 mt-14 box-border rounded-sm">
    <img class="absolute w-full h-full"  src="{avatar}" alt="projcet avatra" />
  </div>
  <div class="mt-10 h-14 flex items-center font-bold text-h4 text-black">{data.name}</div>
  <div class="absolute left-0 w-full box-border px-14 bottom-14 flex justify-between items-end">
    <div class="h-24 mr-6 flex justify-between">
      {#each userAvatars as uer}
        <img class="w-24 h-24 mr-4 border-gray-100 border-solid border rounded-full" src="{uer}" alt="" />
      {/each}
    </div>
    <div>
      {info}
    </div>
  </div>
  <Icon classes="absolute top-14 right-14">more_horiz</Icon>
</Card>
