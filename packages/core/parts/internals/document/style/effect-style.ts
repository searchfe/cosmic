import { default as BaseStyle } from './base-style';

export class EffectStyle extends BaseStyle {

    effects: ReadonlyArray<Internal.Effect>;
    constructor(id: string) {
        super(id, 'EFFECt');
        this.effects = [];
    }

    clone(): EffectStyle {
        const cloneStyle = JSON.parse(JSON.stringify(this));
        cloneStyle.clone = this.clone;
        return cloneStyle;
    
    }
}

