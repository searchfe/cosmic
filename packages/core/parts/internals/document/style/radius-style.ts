import { default as  BaseStyle } from './base-style';

export class RadiusStyle extends BaseStyle implements Internal.SolidPaint {
    private type: 'RADIUS';
    
    tl: number;
    bl: number;
    tr: number;
    br: number;


    constructor() {
        super();
        this.type = 'RADIUS';
    }

    clone(): FillStyle {
        return this;
    }
}