import { default as  BaseStyle } from './base-style';

export class RadiusStyle extends BaseStyle implements Internal.RectangleCornerMixin {
    
    topLeftRadius: number;
    topRightRadius: number;
    bottomLeftRadius: number;
    bottomRightRadius: number;


    constructor(id: string) {
        super(id, 'RADIUS');
        this.topLeftRadius = 0;
        this.topRightRadius = 0;
        this.bottomLeftRadius = 0;
        this.bottomRightRadius = 0;
    }

    clone(): RadiusStyle {
        return this;
    }
}