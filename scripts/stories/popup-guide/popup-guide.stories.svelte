<script lang="ts">
    import 'smelte/src/tailwind.css';
    import '../../../src/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { PopupRing, PopupButton, GroupChangeEvent } from '../../../src/core/components';

    $: selected = -1;
    function handleChange(event) {
      selected = event.detail.selected;
    }
</script>
  
<Meta title="Popup Guide" component="{PopupRing}" />
  
<Template id="normal" let:args >
  <div class="w-1/2 h-full bg-cgray-50 dark:bg-cgray-800 relative">
    <div class="pt-5 pl-5 text-tiny">selected Item : {selected}</div>
    <PopupRing on:change={handleChange} {...args} ></PopupRing>
  </div>
</Template>


<Story name="Ring" template="normal" args={{title: 'Ring'}} >
</Story>
  
<Story name="Button" >
  <div class="pt-4"></div>
  <PopupButton text="Front" shortcutKey="F"></PopupButton>
  <div class="pt-4"></div>
  <PopupButton text="Back" shortcutKey="B" icon="arrow_back_ios"></PopupButton>
</Story>
  