export interface BreakPoint {
    id: string;
    label: string;
    range: [number, number];
    // FIXME: fakeValue是为了直接替换frame值
    fakeValue: number;
}

export interface BreakPointProps {
    breakPoints: BreakPoint[];
    active: string;
}