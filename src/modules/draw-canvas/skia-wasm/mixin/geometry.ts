import type { Paint } from 'canvaskit-wasm';
import { Base } from './base';

// TODO: fills and stroke support array
export class GeometryMixin extends Base {
  // TODO 确认完更新策略好设置正确的类型
  fills: Paint[] = [];
  private strokes: Paint[];
  strokeWeight: number;
  strokeMiterLimit: number;
  strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE';
  // strokeCap: StrokeCap | PluginAPI['mixed']
  // strokeJoin: StrokeJoin | PluginAPI['mixed']
  // dashPattern: ReadonlyArray<number>
  // fillStyleId: string | PluginAPI['mixed']
  // strokeStyleId: string

  get background(): string {
    return this.fills.toString();
  }

  // TODO: support more typeof background
  set background(background: string) {
    const paint = new this.context.ck.Paint();
    const color = this.context.ck.parseColorString(background);
    paint.setColor(color);
    paint.setStyle(this.context.ck.PaintStyle.Fill);
    paint.setAntiAlias(true);
    this.fills.push(paint);
  }
}
