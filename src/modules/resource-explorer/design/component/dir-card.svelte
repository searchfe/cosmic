<script lang="typescript">
  import { Icon } from '@cosmic/core/components';
  import Card from '../../common/components/card.svelte';
  import type { Project } from '../../common/types/graphql';

  export let data:Project = {
    id: '123123',
    name: '搜索前端',
    team: '123123123'
  };
  const img = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1805669441,154121004&fm=30&app=106&f=JPEG?w=312&h=208&s=D5383ED766AB32B0D234CD2603003069';

</script>

<Card classes="h-0 pb-2/3 rounded-2xl overflow-hidden">
  <div class="absolute left-0 top-1/29 w-full h-1/10 flex items-center text-tiny">
    <div class="ml-6 flex-auto text-h3">{data.name}</div>
    <div class="flex-none">20个</div>
    <div class="mx-3 flex-none">
      <Icon>more_horiz</Icon>
    </div>
  </div>
  <div class="absolute box-border w-full px-3 top-17/100 h-4/5 overflow-hidden flex">
    <div class="h-full w-2/3 rounded-l-2xl overflow-hidden">
      <img class="w-full h-full" src={img} alt="">
    </div>
    <div class="h-full w-1/3 ml-1.5 rounded-r-2xl overflow-hidden">
      <div class="h-1/2 mb-1.5">
        <img class="w-full h-full" src={img} alt="">
      </div>
      <div class="h-1/2">
        <img class="w-full h-full" src={img} alt="">
      </div>
    </div> 
  </div>
</Card>
