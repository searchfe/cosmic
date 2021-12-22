<script>
  import '@cosmic/core/components/global.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import Canvas from '@cosmic/core/components/canvas';

  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import { TextField } from '@cosmic/core/components';
</script>

<Meta title="Canvas" component={TextField} />

<Template let:args id="normal">
  <div class="w-80">
    <Canvas />
  </div>
</Template>

<Story name="Default" template="normal" />
