import { default as  BaseStyle } from './base-style';

export class FillStyle extends BaseStyle implements Internal.SolidPaint {
    private type: 'FILL';
    color: Internal.RGBA;
    opacity: number;

    constructor() {
        super();
        this.type = 'FILL';
    }

    clone(): FillStyle {
        return this;
    }
}