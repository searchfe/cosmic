<script lang="ts">
  import 'smelte/src/tailwind.css';
  import '@cosmic/core/components/global.css';
  import './style.css';
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import Resource from '@cosmic/workbench/ui/components/resource/resource.svelte';
</script>

<Meta title="Resource Panel" component="{Resource}" />

<Template let:args>
  <Resource />
</Template>

<Story name="Default" args="{{}}">
  <Resource />
</Story>
