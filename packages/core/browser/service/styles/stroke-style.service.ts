import { injectable } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { StrokeStyle } from '@cosmic/core/parts';

const DEFAULT_STYLES = {
    id: '',
    name: '默认名称',
    team: '',
    updatedAt: '',
    top: {weight: '1', style: 'solid'},
};
interface SubjectSourceType {
    type: 'C' | 'U' | 'D' | 'R';
    data?: Partial<StrokeStyle>[];
}


@injectable()
export default class StrokeStyleService extends BaseService<StrokeStyle, SubjectSourceType> {
    constructor() {
        super();
        this.setType('stroke');
    }

    create(stroke = DEFAULT_STYLES) {
        const style = this.transformToLocal(stroke);
        return style;
    }

    transformToLocal(servicerColor: Partial<gql.Border>) {
        const{id = Date.now() + '', name, team, updatedAt, top = {weight: '10', style: 'solid'}} = servicerColor;
        const strokeStyle = new StrokeStyle(id);
        strokeStyle.strokeWeight = top.weight;
        strokeStyle.strokeAlign = 'CENTER';
        strokeStyle.dashPattern = top.style === 'dash' ? [1, 1] : [0,0],
        strokeStyle.name = name as string;
        return strokeStyle;
    }

    transformToServer(stroke: StrokeStyle) {
        return stroke;
    }
 
}