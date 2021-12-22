<script lang="ts">
  import { Button } from '@cosmic/core/components';
  import Card from '../../common/component/card.svelte';
  import type { Project } from '../../common/types/graphql';

  export let data: Project = {
    id: '123123',
    name: '项目名称',
    team: '团队名称',
  };
  const img =
    'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1805669441,154121004&fm=30&app=106&f=JPEG?w=312&h=208&s=D5383ED766AB32B0D234CD2603003069';
</script>

<Card classes="h-0 pb-2/3 rounded-xl overflow-hidden">
  <div class="absolute left-0 top-0 box-border w-full h-full p-14 flex flex-col justify-between text-base">
    <div class="h-26 w-full flex items-center">
      <div class="flex-auto text-h3">{data.name}</div>
      <div class="flex-none">20个</div>
      <div class="ml-5 flex-none">
        <Button icon="more_horiz" />
      </div>
    </div>
    <div class="box-border w-full mt-12 flex-auto overflow-hidden rounded-xl grid grid-cols-12 gap-2">
      <div class="col-span-7 row-span-2">
        <img class="w-full h-full" src={img} alt="" />
      </div>
      <div class="col-span-5">
        <img class="w-full h-full" src={img} alt="" />
      </div>
      <div class="col-span-5">
        <img class="w-full h-full" src={img} alt="" />
      </div>
    </div>
  </div>
</Card>
