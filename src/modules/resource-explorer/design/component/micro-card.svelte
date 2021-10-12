<script lang="typescript">
  import Card from '../../common/components/card.svelte';

  interface Info {
    key: string;
    value: string;
  }

  export let headerIMG = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1805669441,154121004&fm=30&app=106&f=JPEG?w=312&h=208&s=D5383ED766AB32B0D234CD2603003069';
  export let title = '123';
  export let infos: Info[] = [{key: '1', value: '2'}];
  export let detailIMGS: string[] = [headerIMG, headerIMG, headerIMG, headerIMG];
  export let extra = '38个';
</script>

<Card classes="overflow-hidden pb-4/5 h-0">
  <img
    style="height: 58%"
    class="absolute top-0 left-0 w-full"
    src={headerIMG}
    alt=""
  />
  <div
    style="top: 62%;"
    class="absolute w-full h-1/10 left-0 flex justify-between items-center border-l-4 border-black"
  >
    <div class="flex flex-start">
      <div class="title">{title}</div>
      {#each infos as info}
        <span class="info">{info.key}&nbsp;{info.value}</span>
      {/each}
    </div>
    <div class="extra">{extra}</div>
  </div>
  <div
    style="top: 76%;"
    class="w-full absolute h-1/5 px-6"
  >
    <div class="overflow-hidden w-full height-full grid grid-cols-4 gap-x-1 rounded-lg">
      {#each detailIMGS as img}
        <img class="img" src={img} alt="" />
      {/each}
    </div>
  </div>
</Card>

<style>
  .info {
    margin: 0 10px;
  }

  .title {
    margin-left: 20px;
    font-size: 16px;
    font-weight: bold;
  }

  .extra {
    font-size: 16px;
    font-weight: bold;
    margin-right: 14px;
  }

  .img {
    width: 100%;
    height: 100%;
    flex: auto;
  }

.intrinsic-aspect-ratio-container {
  width: 100%;
  padding-bottom: 40%;
}
</style>
