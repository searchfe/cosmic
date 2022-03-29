import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { EffectStyle } from '@cosmic/core/parts';

@injectable()
export default class EffectStyleService extends BaseService<EffectStyle> {
    constructor() {
        super();
        this.setType('EFFECT');
        [1, 2, 3, 4, 5].map(item => this.transformToLocal({offsetX: 10, offsetY: 10, blur: 11, spread: item, name: item + '', id: item + ''})).forEach(item =>  {
            this.addLocalStyle(item);
        });

        [7,8,9,10].map(item => this.transformToLocal({offsetX: 10, offsetY: 10, blur: 17, spread: item, name: item + '', id: item + ''})).forEach(item =>  {
            this.addServiceStyle(item);
        });
    }

    create() {
        const fillStyle = {
            color: {r: 0, g: 0, b: 0, a: 1},
            opacity: 1,
        };
    }

    transformToLocal(effect: gql.Shadow) {
        const{offsetX, offsetY, id, name, blur, spread} = effect;
        const effectStyle = new EffectStyle();
        effectStyle.offset = {x: offsetX, y: offsetY};
        effectStyle.blur = blur;
        effectStyle.spread = spread;
        effectStyle.name = name;
        effectStyle.id = id;
        return effectStyle;
    }

    transformToServer(fillStyle: FillStyle) {
        const { name, color } = fillStyle;
        return { 
            name,
            day: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        };
    }

}