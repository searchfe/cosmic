import { default as  BaseStyle } from './base-style';

export class FillStyle extends BaseStyle {
    color: Internal.RGBA;
    opacity: number;

    constructor(id: string) {
        super(id, 'SOLID' as any);
    }

    clone(): FillStyle {
        const fill = JSON.parse(JSON.stringify(this));
        fill.clone = this.clone;
        return fill;
    }
}