export default class ContainerMixin implements Internal.ContainerMixin{
    expanded: boolean;
    backgrounds: ReadonlyArray<Internal.Paint>; // DEPRECATED: use 'fills' instead
    backgroundStyleId: string; // DEPRECATED: use 'fillStyleId' instead
}