<script lang="ts">
  import { onMount } from 'svelte';
  import { Rectangle } from '../../../modules/draw-canvas/skia-wasm/index';
  onMount(() => {
    const rect = new Rectangle({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      topLeftRadius: 20,
      topRightRadius: 20,
      bottomRightRadius: 20,
      bottomLeftRadius: 20,
    });
    rect.render(document.getElementById('canvas'))
  });
</script>

<div>
  <canvas id="canvas" width="500" height="500"></canvas>
</div>
