interface LayoutMixin {
    // readonly absoluteTransform: Transform
    // relativeTransform: Transform
    x: number
    y: number
    // rotation: number // In degrees

    width: number
    height: number
    // constrainProportions: boolean

    // resize(width: number, height: number): void
    // resizeWithoutConstraints(width: number, height: number): void
    // rescale(scale: number): void
}

export interface DefaultShapeMixin extends LayoutMixin {

}
