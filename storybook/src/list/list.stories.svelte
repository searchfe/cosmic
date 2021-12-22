<script>
  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { List } from '@cosmic/core/components';
  const classesDefault = 'cursor-pointer p-4 border-alert-50 my-2';
  const selectedClassesDefault = 'bg-active dark:bg-active';
  let selected;
  const listOneLine = [
    {
      text: 'Item 1',
      icon: 'favorite',
    },
    {
      text: 'Item 2',
      icon: 'favorite',
    },
    {
      text: 'Item 3',
      icon: 'favorite',
    },
  ];
  const listTwoLines = [
    {
      text: 'Item 1',
      icon: 'favorite',
      subheading: 'Subheading 1',
    },
    {
      text: 'Item 2',
      icon: 'favorite',
      subheading: 'Subheading 2',
    },
    {
      text: 'Item 3',
      icon: 'favorite',
      subheading: 'Subheading 3',
    },
  ];
  function change(event) {
    console.log(event);
  }

  // const cb = new ClassBuilsder(classes, classesDefault);

  // $: c = cb.
  //   flush()
  //   .add(selectedClassesDefault, selected);
</script>

<Meta title="List" component={List} />

<Template let:args id="normal">
  <List {...args} on:change={change} class="w-80" />
</Template>

<Template let:args id="custom">
  <List {...args} on:change={change} class="w-80">
    <li slot="item" let:item>
      <div
        class="cursor-pointer p-4 border-alert-50 my-2"
        on:click={() => (selected = item.text)}
        class:dark:bg-active={selected === item.text}
        class:bg-active={selected === item.text}
      >
        {selected === item.text ? '👌' : '🙅‍'}
        {item.text}
      </div>
    </li>
  </List>
</Template>

<Story name="OneLine" args={{ items: listOneLine }} template="normal" />

<Story name="TwoLine" args={{ items: listTwoLines }} template="normal" />

<Story name="Custom" args={{ items: listOneLine }} template="custom" />

<!-- <Story name="dense" args="{{ items: listTwoLines, dense: true }}" /> -->
