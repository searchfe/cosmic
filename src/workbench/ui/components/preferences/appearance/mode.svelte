<script lang="ts">
  import inject  from '@cosmic-base/parts/ioc/inject';

  import { AppearanceType } from '@cosmic-base/common/appearance';
  import { AppearanceService } from '@cosmic-workbench/services/appearance-service';

  const aps: AppearanceService = inject(AppearanceService);

	let mod = AppearanceType.any;

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
