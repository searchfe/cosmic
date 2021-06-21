<script lang="ts">
  import Widget from './widget/widget.svelte';
  import Self from './self/self.svelte';
  import Shandard from './standard/standard.svelte';
  import { Tabs, Tab } from '@cosmic/core/components';
  const tabButtonClasses = () => 'max-h-32'
</script>

<div class="flex flex-row h-full dark:bg-cgray-800 bg-cgray-200 w-100">
  <Tabs
    selected="1"
    class="bg-black shadow-sm text-white rounded-t-lg flex-col w-32 dark:bg-cgray-800 bg-cgray-200"
    let:selected
    {tabButtonClasses}
    items="{[
      { id: '1', text: '组件库', icon: 'alarm_on' },
      { id: '2', text: '规范库', icon: 'bug_report' },
      { id: '3', text: '我的', icon: 'eject' },
    ]}"
  >
    <div slot="content" class="flex overflow-hidden w-full h-full py-4">
      <Tab id="1" selected="{selected}">
        <Widget />
      </Tab>
      <Tab id="2" selected="{selected}">
        <Self />
      </Tab>
      <Tab id="3" selected="{selected}">
        <Shandard />
      </Tab>
    </div>
  </Tabs>
</div>
