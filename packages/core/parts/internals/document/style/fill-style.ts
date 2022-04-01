import { default as  BaseStyle } from './base-style';

export class FillStyle extends BaseStyle implements Internal.SolidPaint {
    private type: 'SOLID';
    color: Internal.RGBA;
    opacity: number;

    constructor() {
        super();
        this.type = 'SOLID';
    }

    clone(): FillStyle {
        return this;
    }
}