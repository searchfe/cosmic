import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { EffectStyle } from '@cosmic/core/parts';

const DEFAULT_STYLES = {
    id: '',
    name: '默认名称',
    team: '',
    type: '',
    offsetX: '0',
    offsetY: '0',
    blur: '0',
    spread: '0',
};
interface SubjectSourceType {
    type: 'C' | 'U' | 'D' | 'R';
    data?: Partial<EffectStyle>[];
}

@injectable()
export default class EffectStyleService extends BaseService<EffectStyle, SubjectSourceType> {
    constructor() {
        super();
    }

    create() {
        const style = this.transformToLocal(DEFAULT_STYLES);
        return style;
    }

    transformToLocal(shadow: Partial<gql.Shadow>) {
        const{offsetX = 0, offsetY = 0, id = Date.now() + '', name, blur = 0, spread} = shadow;
        const effectStyle = new EffectStyle(id);
        const effect = {
            offset: { x: offsetX, y: offsetY},
            radius: blur,
            spread: spread,
        } as Internal.DropShadowEffect;
        effectStyle.effects = [effect];
        return effectStyle;
    }

    transformToServer(effectStyle: EffectStyle) {
        return effectStyle;
    }

}