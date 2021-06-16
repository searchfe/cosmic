<script lang="ts">
  import 'smelte/src/tailwind.css';
  import '../../../src/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import ResourcePanel from '../../../src/workbench/ui/components/resource/resource.svelte';

</script>

<Meta title="Resource Panel" component="{ResourcePanel}" />

<Template let:args>
  <ResourcePanel />
</Template>

<Story name="Default">
  <div class="w-100">
    <ResourcePanel />
  </div>
 
</Story>
