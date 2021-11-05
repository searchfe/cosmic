<script lang="ts">
  import Info from '../../../common/components/info.svelte';
  import { Collapse, CollapseItem, Breadcrumb, BreadcrumbItem, Icon } from '@cosmic/core/components';
  import AtomMicroCard from './micro-card.svelte';
  import Filter from './filter/index.svelte';
  import Operation from './operation.svelte';
  import Dialog from './dialog/index.svelte';

  let active = {
    key: 'color',
    text: '颜色'
  };

  const data = [
    {
      key: 'atom1',
      name: '纯色',
    },
    {
      key: 'atom2',
      name: '渐变',
    },
  ];

  let showDilaog = false;

  function createHandler() {
    showDilaog = true;
  }
</script>

<div class="mb-20">
  <Breadcrumb>
    <BreadcrumbItem>
      <img
        class="w-10 h-10 mr-4"
        slot="prefix"
        src="https://fe-dev.bj.bcebos.com/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%8714*14.png"
        alt="SC"
      />
      百度搜索
    </BreadcrumbItem>
    <BreadcrumbItem>设计资产</BreadcrumbItem>
    <BreadcrumbItem>视觉原子</BreadcrumbItem>
  </Breadcrumb>
</div>

<Info title="视觉原子">
  <Filter classes="my-20" />
  <Operation on:create={createHandler}/>
</Info>

<Collapse>
  {#each data as cate}
    <CollapseItem headerClass="pl-0 font-normal" header="{cate.name}" key="{cate.key}" let:isSelected="{active}">
      <Icon slot="prefix">{active ? 'arrow_drop_down' : 'arrow_right'}</Icon>
      <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14">
        <AtomMicroCard classes="" />
        <AtomMicroCard classes="" />
        <AtomMicroCard classes="" />
        <AtomMicroCard classes="" />
        <AtomMicroCard classes="" />
        <AtomMicroCard classes="" />
      </div>
    </CollapseItem>
  {/each}
</Collapse>

<Dialog bind:show={showDilaog}/>
