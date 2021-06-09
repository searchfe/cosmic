<script>
  import 'smelte/src/tailwind.css';
  import '../../../src/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import Button from '../../../src/core/components/button';
 
  let count = 0;
  function handleClick() {
      console.log(count);
    count += 1;
  }

</script>

<Meta title="Button" component="{Button}"/>


<Template let:args id='normal'>
  <Button {...args} on:click="{args.onclick}" class="w-40">
    {count}
  </Button>
</Template>

<Template let:args id="history"></Template>

<Story name="Basic" args={{primary:true}} template='normal'></Story>
<Story name="Block" args={{block:true}} template='normal'></Story>
<Story name="Outlined" args={{outlined:true}} template='normal'></Story>
<Story name="Text" args={{text:true}} template='normal'></Story>
<Story name="Disabled" args={{disabled:true}} template='normal'></Story>
<!-- <Story name="change_history" args={{icon:'change_history'}} template='history'></Story> -->
