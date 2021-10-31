<script lang="ts">
  import { TextField, Icon } from '@cosmic/core/components';
  import { Collapse, CollapsePanel } from '../../components';
  import WidgetList from '../utils/list.svelte';
  const pClass = 'text-base py-4 px-2 dark:text-gray-200 text-garay-50 cursor-default flex justify-between items-center';
  let searchValue = '';
  let prepend = 'folder';
  let classes = 'mt-0 mb-0 flex-auto pr-4 relative text-gray-600 dark:text-gray-100';
</script>

<div class="flex flex-col h-full w-full px-4">
  <div class="flex flex-row justify-between items-center">
    <TextField classes="{classes}" bind:value="{searchValue}" />
    <Icon class="flex-grow-0 flex-shrink-0">filter_alt</Icon>
  </div>

  <p class="{pClass}">
    <span>文件夹</span>
    <Icon class="cursor-pointer text-h3">add_circle_outline</Icon>
  </p>
  <Collapse>
    <CollapsePanel prepend="{prepend}" header="输入框" key="{1}">
      <WidgetList search="{searchValue}" />
    </CollapsePanel>
    <CollapsePanel prepend="{prepend}" header="密码框" key="{2}">
      <WidgetList />
    </CollapsePanel>
  </Collapse>
</div>
