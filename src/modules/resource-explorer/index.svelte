<script lang="ts">
  import {onMount} from 'svelte';
  import {Collapse} from '../../core/components/collapse';
  import {CollapseItem} from '../../core/components/collapse/item';

  let foo = ["1"]

  onMount(() => {
    foo = ["1", "2"]
  });
</script>

<div class="flex flex-row" style="width: 80%; height: 100vh; border: 1px solid yellow;">
  <div class="sidebar">
    <Collapse bind:activeKey={foo}>
      <CollapseItem header="header 1" key="1">content 1</CollapseItem>
      <CollapseItem header="header 2" key="2">content 2</CollapseItem>
    </Collapse>
  </div>
  <div class="content">
    this is the contents
  </div>
</div>

<style>
  .sidebar {
    width: 100px;
    margin-right: 20px;
    background: blue;
  }
  .content {
    flex: 1;
  }
</style>
