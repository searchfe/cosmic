import { default as  BaseStyle } from './base-style';

export class RadiusStyle extends BaseStyle implements Internal.SolidPaint {
    
    tl: number;
    bl: number;
    tr: number;
    br: number;


    constructor(id: string) {
        super(id, 'RADIUS');
    }

    clone(): RadiusStyle {
        return this;
    }
}