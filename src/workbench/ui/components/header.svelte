<script lang="ts">
  import { Button } from '@cosmic-base/browser';
</script>

<header class="internal-header">
  <div class="header-left">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="svg-icon"
      viewBox="0 0 32 32"
      width="16"
      height="16"
      style="fill: rgb(255, 255, 255);"
    >
      <path
        d="M30.523 6.656v-5.326h-5.323v1.774h-18.459v-1.771h-5.323v5.323h1.596v18.635h-1.596v5.323h5.325v-1.775h18.455v1.775h5.323v-5.323h-1.594v-18.638h1.597zM26.974 3.104h1.774v1.776h-1.771v-1.776zM3.195 3.104h1.774v1.776h-1.774v-1.776zM4.969 28.836h-1.774v-1.775h1.774v1.775zM28.748 28.836h-1.771v-1.775h1.775v1.775zM27.154 25.287h-1.952v1.775h-18.459v-1.771h-1.952v-18.636h1.952v-1.777h18.455v1.777h1.952v18.631zM17.568 7.897h-9.76v9.76h6.566v6.566h9.76v-9.76h-6.566v-6.57zM15.794 15.883h-6.211v-6.211h6.211v6.211zM22.359 16.238v6.21h-6.21v-6.21h6.21z"
      /></svg
    >
  </div>
  <div class="header-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="svg-icon"
      viewBox="0 0 32 32"
      width="16"
      height="16"
      style="fill: rgb(255, 255, 255);"
    >
      <path
        d="M30.523 6.656v-5.326h-5.323v1.774h-18.459v-1.771h-5.323v5.323h1.596v18.635h-1.596v5.323h5.325v-1.775h18.455v1.775h5.323v-5.323h-1.594v-18.638h1.597zM26.974 3.104h1.774v1.776h-1.771v-1.776zM3.195 3.104h1.774v1.776h-1.774v-1.776zM4.969 28.836h-1.774v-1.775h1.774v1.775zM28.748 28.836h-1.771v-1.775h1.775v1.775zM27.154 25.287h-1.952v1.775h-18.459v-1.771h-1.952v-18.636h1.952v-1.777h18.455v1.777h1.952v18.631zM17.568 7.897h-9.76v9.76h6.566v6.566h9.76v-9.76h-6.566v-6.57zM15.794 15.883h-6.211v-6.211h6.211v6.211zM22.359 16.238v6.21h-6.21v-6.21h6.21z"
      /></svg
    >
  </div>
  <div class="header-right">
    <span class="header-status">所有更改已保存</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="svg-icon"
      viewBox="0 0 32 32"
      width="16"
      height="16"
      style="fill: rgb(255, 255, 255);"
    >
      <path
        d="M30.523 6.656v-5.326h-5.323v1.774h-18.459v-1.771h-5.323v5.323h1.596v18.635h-1.596v5.323h5.325v-1.775h18.455v1.775h5.323v-5.323h-1.594v-18.638h1.597zM26.974 3.104h1.774v1.776h-1.771v-1.776zM3.195 3.104h1.774v1.776h-1.774v-1.776zM4.969 28.836h-1.774v-1.775h1.774v1.775zM28.748 28.836h-1.771v-1.775h1.775v1.775zM27.154 25.287h-1.952v1.775h-18.459v-1.771h-1.952v-18.636h1.952v-1.777h18.455v1.777h1.952v18.631zM17.568 7.897h-9.76v9.76h6.566v6.566h9.76v-9.76h-6.566v-6.57zM15.794 15.883h-6.211v-6.211h6.211v6.211zM22.359 16.238v6.21h-6.21v-6.21h6.21z"
      /></svg
    >
    <div><Button>保存</Button></div>
  </div>
</header>

<style>
  .internal-header {
    display: flex;
    min-height: 40px;
    background-color: var(--bg-color, #1f1f1f);
    justify-content: space-between;
    padding: 0 14px;
    align-items: center;
  }
  .header-status {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
  .internal-header > div {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .header-left {
    justify-content: flex-start;
  }

  .header-center {
    justify-content: center;
  }

  .header-right {
    justify-content: flex-end;
  }

  .header-right * + * {
    margin-left: 8px;
  }
</style>
