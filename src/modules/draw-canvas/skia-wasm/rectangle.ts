import type {RectangleNode} from '../types/shape';
import {getCanvasKit} from './canvas-kit';
import type {Surface} from 'canvaskit-wasm';

export class Rectangle implements RectangleNode {
    readonly type = 'RECTANGLE';
    x: number;
    y: number;
    width: number;
    height: number;
    topLeftRadius: number;
    topRightRadius: number;
    bottomLeftRadius: number;
    bottomRightRadius: number;

    constructor(options: Partial<RectangleNode>) {
        const {x, y, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius} = options;
        // this.x = x;
        // this.y = y;
        this.x = 100;
        this.y = 100;
        this.width = width;
        this.height = height;
        this.topLeftRadius = topLeftRadius;
        this.topRightRadius = topRightRadius;
        this.bottomLeftRadius = bottomLeftRadius;
        this.bottomRightRadius = bottomRightRadius;
    }

    render(canvas) {
        return getCanvasKit().then(canvasKit => {
            console.log(canvasKit)
            const surface:Surface = canvasKit.MakeCanvasSurface(canvas.id);
            const paint = new canvasKit.Paint();
            paint.setStyle(canvasKit.PaintStyle.Fill);
            paint.setAntiAlias(true);
            paint.setColor(canvasKit.Color(66, 129, 164, 1.0));
            paint.setPathEffect(canvasKit.PathEffect.MakeCorner(20));
            if (!surface) {
                throw 'Could not make surface';
            }
            const rrect = canvasKit.RRectXY([100, 10, 140, 62], 50, 80);
            const rrectPath = new canvasKit.Path().addRRect(rrect, true);
            surface.getCanvas().drawPath(rrectPath, paint);
            surface.flush();
            console.log(surface.width());
        });
    }
}
