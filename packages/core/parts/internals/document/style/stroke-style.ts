import { default as  BaseStyle } from './base-style';

export class StrokeStyle extends BaseStyle {
    strokeWeight: number;
    strokeJoin: Internal.StrokeJoin;
    strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE';
    dashPattern: Array<number>;
    strokeGap: Internal.StrokeCap;
    style: string;
    strokeLineStyle:string;

    constructor(id: string) {
        super(id, 'STROKE');
    }

    clone(): StrokeStyle {
        const cloneStyle = JSON.parse(JSON.stringify(this));
        cloneStyle.clone = this.clone;
        return cloneStyle;
    }
}