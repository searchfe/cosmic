<script>
  import 'smelte/src/tailwind.css';
  import '../../../src/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { Select, Checkbox } from '../../../src/core/components';
  let value1 = 1;
  let value2 = '';
  let selectedItems = [];
  let selectedLabel = '';
  function valueChange({ detail }) {
    value1 = detail;
  }

  function toggle(i) {
    return (v) => {
      v.detail
        ? !selectedItems.some((item) => item === i) && selectedItems.push(i)
        : (selectedItems = selectedItems.filter((si) => si !== i));
      selectedLabel = selectedItems.map((item) => item.text).join(', ');
    };
  }

  const items = [
    { value: 1, text: 'One' },
    { value: 2, text: 'Two' },
    { value: 3, text: 'Three' },
    { value: 4, text: 'Four' },
  ];

  const customItems = [
    { value: 1, text: 'One' },
    { value: 2, text: 'Two' },
    { value: 3, text: 'Three' }
  ];
</script>

<Meta title="Select" component="{Select}" />

<Template let:args id="ochange">
  <blockquote class="pl-4 mt-2 mb-8 border-l-4 border-blue text-tiny py-2">
    <p>One may bind to a select via on:change event.</p>
  </blockquote>
  <Select {...args} on:change="{valueChange}" class="w-80 h-60" />
</Template>

<Template let:args id="bind">
  <Select {...args} on:bind="{value2}" class="w-80 h-60" />
</Template>

<Template let:args id="custom">
  <Select {...args} selectedLabel="{selectedLabel}" class="w-80 h-80">
    <div slot="options" class="shadow rounded px-2 py-4 mt-0 bg-cgray-400 dark:bg-cgray-700" on:click|stopPropagation>
      {#each customItems as item}
        <Checkbox checked="{selectedItems.includes(item)}" class="block my-2" color="red" label="{item.text}" on:change="{toggle(item)}" />
      {/each}
    </div>
  </Select>
</Template>

<Story name="OnChange" args="{{ items }}" template="ochange" />

<Story name="Bind" args="{{ items }}" template="bind" />

<Story name="Outlined" args="{{ items, outlined: true }}" template="bind" />

<Story name="Search" args="{{ items, autocomplete: true }}" template="bind" />

<Story name="Custom" args="{{ items: customItems, autocomplete: true }}" template="custom" />
