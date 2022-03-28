export default class BlendMixin implements Internal.BlendMixin {
    opacity: number;
    blendMode: 'PASS_THROUGH' | Internal.BlendMode;
    isMask: boolean;
    effects: ReadonlyArray<Internal.Effect>;
    effectStyleId: string;
}