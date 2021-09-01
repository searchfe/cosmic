<script lang="ts">
  import { onMount } from 'svelte';
  import { Rectangle } from '../../../modules/draw-canvas/skia-wasm/index';
  import { Context } from '../../../modules/draw-canvas/skia-wasm/context';
  import { getCanvasKit } from '../../../modules/draw-canvas/skia-wasm/canvas-kit';
  onMount(() => {
    getCanvasKit().then((CK) => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const surface = CK.MakeCanvasSurface(canvas);
      const rect = new Rectangle(new Context(CK, surface));
      rect.x = 100;
      rect.width = 40;
      rect.y = 10;
      rect.borderRaidus = 20;
      rect.background = '#ff00ff';
      rect.width = 100;
      rect.height = 100;
      rect.draw();
    });
  });
</script>

<div>
  <canvas id="canvas" width="500" height="500"></canvas>
</div>
