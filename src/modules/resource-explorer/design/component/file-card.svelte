<script lang="ts">
  import Card from '../../common/components/card.svelte';

  export const project = {
    img: '',
    title: '',
    desc: ''
  };
</script>

<Card classes="relative h-0 pb-3/4 rounded-xl overflow-hidden">
  <div class="w-full h-full absolute flex flex-col top-0 left-0">
    <div class="flex-auto">
      <img src="{project.img || `https://fe-dev.bj.bcebos.com/file-card.png`}" alt="" />
    </div>
    <div class="h-78 px-14 flex flex-col items-start justify-center  bg-white">
      <div class="text-h3 h-16 items-center">{project.title}</div>
      <div class="mt-10 text-base flex-a items-center">{project.desc || '编辑于 昨天'}</div>
    </div>
  </div>
</Card>
