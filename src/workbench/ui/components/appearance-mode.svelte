<script lang="ts">
  import type { Container } from 'inversify';

  import { AppearanceType } from '@cosmic-base/common/appearance';
  import { AppearanceService } from '@cosmic-workbench/services/appearance-service';

  export let appContainer: Container;
  const aps = appContainer.get(AppearanceService);

	let mod = AppearanceType.any;

  function changeMode() {
    aps.updateMode(mod);
  }
</script>

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


AppearanceType is {mod}
