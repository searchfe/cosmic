<script lang="ts">
    import 'smelte/src/tailwind.css';
    import '../../../src/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { PopupGuide } from '../../../src/core/components';
</script>
  
<Meta title="Popup Guide" component="{PopupGuide}" />
  
<Template let:args>
    <div class="h-20"> </div>
    <PopupGuide></PopupGuide>
</Template>


<Story name="Primary" args="{{}}">
      <div class="h-20"> </div>
    <PopupGuide></PopupGuide>
</Story>
  