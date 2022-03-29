import { default as  BaseStyle } from './base-style';

export class StrokeStyle extends BaseStyle {
    private type: 'FILL';
    strokeWeight: string;
    strokeJoin: Internal.StrokeJoin;
    strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE';
    dashPattern: string;
    solidPattern: string;
    strokeGap: Internal.StrokeCap;

    constructor() {
        super();
        this.type = 'FILL';
    }

    clone(): StrokeStyle {
        const cloneStyle = JSON.parse(JSON.stringify(this));
        cloneStyle.clone = this.clone;
        return cloneStyle;
    }
}