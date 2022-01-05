interface LayoutMixin {
    x: number;
    y: number;

    width: number;
    height: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultShapeMixin extends LayoutMixin {}
