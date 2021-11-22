<script>
  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { Tabs, Tab, Image } from '@cosmic/core/components';
  let loading = false;
  const tabButtonClasses = () => 'max-h-32';
</script>

<Meta title="Tabs" component="{Tabs}" />
<Template let:args id="row">
  <div style="max-width: 400px" class="dark:bg-cgray-600 bg-cgray-400">
    <Tabs
      selected="1"
      class="bg-black shadow-sm text-white rounded-t-xl"
      let:selected
      loading="{loading}"
      items="{[
        { id: '1', text: 'Cats', icon: 'alarm_on' },
        { id: '2', text: 'Kittens', icon: 'bug_report' },
        { id: '3', text: 'Kitties', icon: 'eject' },
      ]}"
    >
      <div slot="content" class="flex overflow-hidden w-full h-full p-15 bg-cgray-500" style="height: 250px">
        <Tab id="1" selected="{selected}">this is a tab 1</Tab>
        <Tab id="2" selected="{selected}">this is a tab 2</Tab>
        <Tab id="3" selected="{selected}">this is a tab 3</Tab>
      </div>
    </Tabs>
  </div>
</Template>

<Template let:args id="col">
  <div class="flex flex-row dark:bg-cgray-600 bg-cgray-400 h-full">
    <Tabs
      {...args}
      selected="1"
      tabButtonClasses="{tabButtonClasses}"
      class="shadow-sm text-white rounded-t-xl flex-col max-w-10"
      let:selected
      loading="{loading}"
      items="{[
        { id: '1', text: 'Cats', icon: 'alarm_on' },
        { id: '2', text: 'Kittens', icon: 'bug_report' },
        { id: '3', text: 'Kitties', icon: 'eject' },
      ]}"
    >
      <div slot="content" class="flex overflow-hidden w-full  bg-cgray-500 h-full p-15">
        <Tab id="1" selected="{selected}">this is a tab 1</Tab>
        <Tab id="2" selected="{selected}">this is a tab 2</Tab>
        <Tab id="3" selected="{selected}">this is a tab 3</Tab>
      </div>
    </Tabs>
  </div>
</Template>

<Story name="Row" args="{{}}" template="row" />

<Story name="Col" args="{{ tabButtonClasses }}" template="col" />
