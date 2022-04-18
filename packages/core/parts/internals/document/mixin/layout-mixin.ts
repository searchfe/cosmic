type Transform = Internal.Transform;
type Rect = Internal.Rect;
export default class LayoutMixin implements Internal.LayoutMixin {
    readonly absoluteTransform: Transform;
    relativeTransform: Transform;
    x = 0;
    y = 0;
    VerticalStretch = 0;
    HorizontalStretch = 0;
    VerticalLayout = 0;
    HorizontalLayout = 0;

    b = 0;
    r = 0;
    rotation: number; // In degrees

    width: number;
    height: number;
    readonly absoluteRenderBounds: Rect | null;
    constrainProportions: boolean;

    layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT' = 'INHERIT'; // applicable only inside auto-layout frames
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
