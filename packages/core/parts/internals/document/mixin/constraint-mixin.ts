export default class ConstraintMixin implements Internal.ConstraintMixin{
    constraints: Constraints = {
        horizontal: ConstraintType.MIN,
        vertical: ConstraintType.MIN,
    };
}
export enum ConstraintType {
    MIN = 'MIN',
    CENTER = 'CENTER',
    MAX = 'MAX',
    STRETCH = 'STRETCH',
    SCALE = 'SCALE',
}
export interface Constraints {
    horizontal: ConstraintType,
    vertical: ConstraintType,
}