import type { RectangleNode } from '../types/shape';
import type { Path } from 'canvaskit-wasm';
import { Mixin } from 'ts-mixer';
import { DefaultShapeMixin } from './mixin/shape';
import type { Context } from './context';

export class Rectangle extends Mixin(DefaultShapeMixin) implements RectangleNode {
  readonly type = 'RECTANGLE';
  private rect: Path;
  private _width: number;
  private _height: number;

  constructor(context: Context) {
    super();
    this.context = context;
  }

  get width(): number {
    return this._width;
  }

  set width(width: number) {
    this._width = width;
    this.updateRect();
  }

  get height(): number {
    return this._height;
  }

  set height(height: number) {
    this._height = height;
    this.updateRect();
  }

  get borderRaidus(): number {
    return this.cornerRadius;
  }

  set borderRaidus(borderRaidus: number) {
    this.cornerRadius = borderRaidus;
    this.updateRect();
  }

  private updateRect() {
    const left = this.x;
    const top = this.y;
    const right = this._width + this.x;
    const bottom = this._height + this.y;
    const rrect = this.context.ck.RRectXY([left, top, right, bottom], this.cornerRadius, this.cornerRadius);
    this.rect = new this.context.ck.Path().addRRect(rrect, true);
  }

  draw(): void {
    // TODO: use mixin to handle paint and stroke
    // TODO: set default fills
    this.context.getCanvas().drawPath(this.rect, this.fills[0]);
    this.context.draw();
  }
}
