<script lang="ts">
  import { TextField } from '@cosmic/core/components';
  import { Collapse, CollapsePanel } from '../../components';
  import WidgetList from '../utils/list.svelte';
  const pClass = 'text-sm py-4 px-2 dark:text-cgray-500 text-cgaray-700 cursor-default';
  let searchValue = '';
</script>

<div class="flex flex-col h-full w-full px-4">
  <TextField bind:value="{searchValue}" />
  <p class="{pClass}">基础组件</p>
  <Collapse>
    <CollapsePanel header="输入框" key="{1}">
      <WidgetList search="{searchValue}" />
    </CollapsePanel>
    <CollapsePanel header="密码框" key="{2}">
      <WidgetList />
    </CollapsePanel>
  </Collapse>
  <p class="{pClass}">组合组件</p>
  <WidgetList />
</div>
