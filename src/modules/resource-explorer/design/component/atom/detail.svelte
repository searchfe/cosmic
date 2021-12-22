<script lang="ts">
  import Info from '../../../common/component/info.svelte';
  import { Collapse, CollapseItem, Breadcrumb, BreadcrumbItem, Icon } from '@cosmic/core/components';
  import AtomMicroCard from './micro-card.svelte';
  import Filter from './filter/index.svelte';
  import Operation from './operation.svelte';
  import Dialog from './dialog/index.svelte';
  import { queryColors } from '../../api/color';
  import { subscription } from '@urql/svelte';

  export let params: Record<string, string> = {};
  const store = queryColors({});
  const handleSubscription = (...args) => {
    return args;
  };
  subscription(store, handleSubscription);

  let active = {
    key: 'color',
    text: '颜色',
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

  function reQuery() {
    store.reexecute({ requestPolicy: 'network-only' });
  }
</script>

<div class="mb-20">
  <Breadcrumb>
    <BreadcrumbItem>
      <img
        class="w-10 h-10 mr-4"
        slot="prefix"
        src="https://fe-dev.bj.bcebos.com/table%E5%9B%BE%E6%A0%8730*30.png"
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
  <Operation on:create={createHandler} />
</Info>

<Collapse>
  {#each data as cate}
    <CollapseItem headerClass="pl-0 font-normal" header={cate.name} key={cate.key} let:isSelected={active}>
      <Icon slot="prefix">{active ? 'arrow_drop_down' : 'arrow_right'}</Icon>
      <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-22 xl:gap-26 2xl:gap-14">
        {#if !$store.fetching && $store.data.colors}
          {#each $store.data.colors as color}
            <AtomMicroCard classes="" color={color.color} />
          {/each}
        {/if}
      </div>
    </CollapseItem>
  {/each}
</Collapse>

<Dialog bind:show={showDilaog} team={params.teamId} on:created={reQuery} />
