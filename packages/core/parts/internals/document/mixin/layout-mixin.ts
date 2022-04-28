type Transform = Internal.Transform;
type Rect = Internal.Rect;
export default class LayoutMixin implements Internal.LayoutMixin {
    readonly absoluteTransform: Transform;
    relativeTransform: Transform;
    x = 0;
    y = 0;

    VerticalStretch = 0;
    HorizontalStretch = 0;
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
        // switch(this.HorizontalLayout) {
        //     case 0:
        //         this.width = width;
        //         break;
        //     case 1:
        //         this.x = ((this as any).parent.width - this.width - this.r);
        //         this.width = width;
        //         break;
        //     case 2:
        //         this.width = ((this as any).parent.width - this.x - this.r);
        //         break;
        //     case 3:
        //         break;
        //     case 4:
        //         break;
        // }
        // switch(this.VerticalLayout) {
        //     case 0:
        //         this.height = height;
        //         break;
        //     case 1:
        //         this.y = ((this as any).parent.height - this.height - this.b);
        //         this.height = height;
        //         break;
        //     case 2:
        //         this.height = ((this as any).parent.height - this.y - this.b);
        //         break;
        //     case 3:
        //         break;
        //     case 4:
        //         break;
        // }
        ((this as any).children || []).forEach((child: any) => {
            child.resize(child.width, child.height);
            child.update();
        });
    }
    resizeWithoutConstraints(width: number, height: number) {
        // TODO
    }
    rescale(scale: number) {
        // TODO
    }
}
