<script lang="ts">
    import 'smelte/src/tailwind.css';
    import '../../../src/core/components/global.css';
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { PopupGuide } from '../../../src/core/components';
</script>
  
<Meta title="Popup Guide" component="{PopupGuide}" />
  
<Template id="normal" let:args >
  <div class="w-1/2 h-full bg-cgray-50 dark:bg-cgray-800 relative">
    <PopupGuide></PopupGuide>
  </div>
</Template>


<Story name="Primary" template="normal" >
</Story>
  