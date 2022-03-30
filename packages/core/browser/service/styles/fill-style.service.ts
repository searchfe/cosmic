import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { FillStyle } from '@cosmic/core/parts';
import Color from 'color';

@injectable()
export default class FillStyleService extends BaseService<FillStyle> {
    constructor() {
        super();
        this.setType('fill');
        [1, 2, 3, 4, 5].map(item => this.transformToLocal({day: 'rgba(50,50,25,1)', name: item + '', id: item + ''})).forEach(item =>  {
            this.addLocalStyle(item);
        });

        [7,8,9,10].map(item => this.transformToLocal({day: 'rgba(50,50,25,1)', name: item + '', id: item + ''})).forEach(item =>  {
            this.addServiceStyle(item);
        });
    }

    create() {
        const fillStyle = {
            color: {r: 0, g: 0, b: 0, a: 1},
            opacity: 1,
        };
    }

    transformToLocal(servicerColor: gql.Color) {
        const{day, name, id} = servicerColor;
        const color = new Color(day).object();
        const fillStyle = new FillStyle();
        fillStyle.opacity = 1;
        fillStyle.color = color;
        fillStyle.name = name;
        fillStyle.id = id;
        return fillStyle;
    }

    transformToServer(fillStyle: FillStyle) {
        const { name, color } = fillStyle;
        return { 
            name,
            day: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        };
    }
 
}