type Transform = Internal.Transform;
type Rect = Internal.Rect;
export default class LayoutMixin implements Internal.LayoutMixin {
    readonly absoluteTransform: Transform;
    relativeTransform: Transform;
    x: number;
    y: number;
    rotation: number; // In degrees
  
    readonly width: number;
    readonly height: number;
    readonly absoluteRenderBounds: Rect | null;
    constrainProportions: boolean;
  
    layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'; // applicable only inside auto-layout frames
    layoutGrow: number;
  
    resize(width: number, height: number) {
        // TODO
    }
    resizeWithoutConstraints(width: number, height: number) {
        // TODO
    }
    rescale(scale: number) {
        // TODO
    }
}