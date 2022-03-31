import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { StrokeStyle } from '@cosmic/core/parts';
import Color from 'color';

@injectable()
export default class StrokeStyleService extends BaseService<StrokeStyle> {
    constructor() {
        super();
        this.setType('fill');
        [1, 2, 3, 4, 5].map(item => this.transformToLocal({
            strokeWeight: 10, 
            strokeAlign: 'CENTER', 
            dashPattern: 10,
            solidPattern: 10,
            name: item + '', 
            id: item + '',
        })).forEach(item =>  {
            this.addLocalStyle(item);
        });

        [7,8,9,10].map(item => this.transformToLocal({
            strokeWeight: 10, 
            strokeAlign: 'CENTER', 
            dashPattern: 10,
            solidPattern: 10,
            name: item + '', 
            id: item + '',
        })).forEach(item =>  {
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
        const{strokeWeight, strokeAlign, dashPattern, solidPattern, name, id} = servicerColor;
        const strokeStyle = new StrokeStyle();
        strokeStyle.strokeWeight = strokeWeight;
        strokeStyle.strokeAlign = strokeAlign;
        strokeStyle.dashPattern = dashPattern;
        strokeStyle.solidPattern = solidPattern;
        strokeStyle.name = name;
        strokeStyle.id = id;
        return strokeStyle;
    }

    transformToServer(fillStyle: FillStyle) {
        const { name, color } = fillStyle;
        return { 
            name,
            day: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        };
    }
 
}