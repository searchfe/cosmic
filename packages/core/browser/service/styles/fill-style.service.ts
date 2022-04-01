import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { FillStyle } from '@cosmic/core/parts';
import Color from 'color';
interface SubjectSourceType {
    type: 'C' | 'U' | 'D' | 'R';
    data?: Partial<FillStyle>[];
}

@injectable()
export default class FillStyleService extends BaseService<FillStyle, SubjectSourceType> {
    constructor() {
        super();
        this.setType('SOLID');
    }

    create() {
        const style = this.transformToLocal({
            id: Date.now() + '',
            name: '默认名称',
            team: '',
            day: 'rgba(0, 0, 0, 0)'
        });
        return style;
    }

    transformToLocal(servicerColor: Partial<gql.Color>) {
        const{day, name, id} = servicerColor;
        const color = new Color(day).object();
        const fillStyle = new FillStyle(id as string);
        fillStyle.opacity = 1;
        fillStyle.color = color as any;
        fillStyle.name = name as any;
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