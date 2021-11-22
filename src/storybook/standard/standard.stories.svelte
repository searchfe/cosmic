<script>
  import 'smelte/src/tailwind.css';
  import '../../../src/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import Standard from '@cosmic/workbench/ui/components/resource/standard/standard.svelte';
</script>

<Meta title="Standard" component="{Standard}" />

<Template let:args>
  <div class="w-100">
    <Standard />
  </div>
</Template>

<Story name="Default" args="{{}}" />
