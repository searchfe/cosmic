<script lang="typescript">
  import Card from '../../common/components/card.svelte';

  const img = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1805669441,154121004&fm=30&app=106&f=JPEG?w=312&h=208&s=D5383ED766AB32B0D234CD2603003069';

</script>
<Card classes="h-0 pb-2/3 rounded-2xl overflow-hidden">
  <div class="w-full absolute top-0 left-0" style="height: 74%;">
    <img class="w-full h-full" src={img} alt="">
  </div>
  <div class="box-border w-full flex flex-col items-start justify-center px-6 absolute left-0 bg-white" style="top: 74%; height: 26%;">
    <div class="text-tiny h-12 flex items-center">全职卡职位个性化推荐精准需求</div>
    <div class="text-sm h-8 flex items-center">编辑于 昨天</div>
  </div>
</Card>
