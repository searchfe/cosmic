<script lang="ts">
  import inject  from '@cosmic/core/parts/ioc/inject';

  import { AppearanceType } from '@cosmic/core/common/appearance';
  import { AppearanceService } from '@cosmic/workbench/services/appearance-service';

  let mod = AppearanceType.any;
  let aps = inject<AppearanceService>(AppearanceService);

  function changeMode() {
    aps.updateMode(mod);
  }
</script>

<style>
  :root {
    color: var(--label-color);
  }
</style>

<h2>Size</h2>

<label>
	<input type=radio bind:group={mod} value={AppearanceType.any} on:change="{changeMode}">
	ANY
</label>

<label>
	<input type=radio bind:group={mod} value={AppearanceType.light} on:change="{changeMode}">
	Light
</label>

<label>
	<input type=radio bind:group={mod} value={AppearanceType.dark} on:change="{changeMode}">
	Dark
</label>

<br>
<div>
AppearanceType is {mod}
</div>
