import type { Canvas, Surface, CanvasKit } from 'canvaskit-wasm';

export class Context {
  private canvas: Canvas;
  private surface: Surface;
  public ck: CanvasKit;
  constructor(ck: CanvasKit, surface: Surface) {
    this.ck = ck;
    this.surface = surface;
    this.canvas = this.surface.getCanvas();
  }

  getCanvas(): Canvas {
    return this.canvas;
  }

  draw(): void {
    this.surface.flush();
  }
}
