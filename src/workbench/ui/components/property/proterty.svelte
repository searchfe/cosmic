<script lang="ts">
  import { Icon } from '@cosmic/core/components';
  import State from './state/state.svelte';
  import { Vision } from './vision';
  export let proterties = [
    {
      stateName: '主状态',
      widgets: [
        {
          text: '按钮',
          icon: 'smart_button',
          vision: {
            border: [],
            background: [],
            shandow: [],
          },
        },
        {
          text: '文本',
          icon: 'title',
          vision: {
            color: [],
            fontSize: [],
          },
        },
      ],
    },
    {
      stateName: '点击态',
      widgets: [
        {
          text: '按钮',
          icon: 'smart_button',
          vision: {
            border: [],
            background: [],
            shandow: [],
          },
        },
        {
          text: '文本',
          icon: 'title',
          vision: {
            color: [],
            fontSize: [],
          },
        },
      ],
    },
    {
      stateName: '禁用态',
      widgets: [
        {
          text: '按钮',
          icon: 'smart_button',
          vision: {
            border: [],
            background: [],
          },
        },
        {
          text: '文本',
          icon: 'title',
          vision: {
            color: [],
            fontSize: [],
          },
        },
      ],
    },
  ];

  let stateValue = '主状态';

  let widgetValue = '';

  const headerClass =
    'flex h-20 max-h-20 justify-between items-center text-cgray-50 dark:text-cgray-200 flex-grow-0 px-4 bg-cgray-400 dark:bg-cgray-700 dark:border-cgray-500';

  $: stateList = proterties.map((item) => item.stateName);

  $: widgets = proterties.find((item) => item.stateName === stateValue).widgets;

  $: vision =
    proterties.find((item) => item.stateName === stateValue)?.widgets?.find((item) => item.text === widgetValue)
      ?.vision ?? {};

  function stateChangeHandle({ detail }) {
    stateValue = detail;
    widgetValue = '';
  }

  function widgetChangeHandle({ detail }) {
    widgetValue = detail;
  }

  function addVision({ detail }) {
    vision[detail] = [...vision[detail], '1'];
  }
</script>

<div class="flex flex-col dark:bg-cgray-800 bg-cgray-200 flex-1 min-h-screen">
  <header class="border-b border-gray-50 {headerClass}">
    <span>button</span>
    <Icon class="text-base">save</Icon>
  </header>
  <div class="flex flex-col">
    <header class="{headerClass}">
      <span>交互设置</span>
      <Icon>arrow_drop_down</Icon>
    </header>
  </div>
  <State
    on:stateChange="{stateChangeHandle}"
    on:widgetChange="{widgetChangeHandle}"
    stateList="{stateList}"
    stateValue="{stateValue}"
    widgets="{widgets}"
    widgetValue="{widgetValue}"
  />
  <Vision vision="{vision}" on:addVision="{addVision}" />
</div>
