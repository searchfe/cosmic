<script lang='ts'>
  import Menu from './navigation-menu.svelte';
</script>
<header class='navigation-bar'>
  <Menu></Menu>
</header>
<style>
  .navigation-bar {
    display: flex;
    min-height: 27px;
    background-color: var(--bg-color);
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
  }
</style>
