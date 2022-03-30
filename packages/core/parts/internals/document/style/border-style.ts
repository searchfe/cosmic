import { default as BaseStyle } from './base-style';

export class EffectStyle extends BaseStyle implements Internal.DropShadowEffect {
    type: 'EFFECT';
    effects: ReadonlyArray<Internal.Effect>;
    constructor() {
        super();
        this.type = 'EFFECT';
    }

    clone(): EffectStyle {
        const cloneStyle = JSON.parse(JSON.stringify(this));
        cloneStyle.clone = this.clone;
        return cloneStyle;
    
    }
}
