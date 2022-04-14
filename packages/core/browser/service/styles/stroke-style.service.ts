import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { StrokeStyle, borderDao } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { TOKENS } from '../token';

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
    private borderDao: ReturnType<typeof borderDao>;
    constructor(@inject(TOKENS.GqlClient) private client: service.GqlClient) {
        super();
        this.setType('stroke');
        this.borderDao = borderDao(client);
        console.log(1212121212);
        this.queryList();
    }

    create(stroke = DEFAULT_STYLES) {
        const style = this.transformToLocal(stroke);
        return style;
    }

    cloneById(id: string, isChangeId = true) {
        const style = this.get(id);
    }

    transformToLocal(servicerColor: Partial<gql.Border>) {
        const{id = Date.now() + '', name, team, updatedAt, top = {weight: '10', style: 'solid'}} = servicerColor;
        const strokeStyle = new StrokeStyle(id);
        strokeStyle.strokeWeight = top.weight;
        strokeStyle.strokeAlign = 'CENTER';
        strokeStyle.style = 'solid';
        strokeStyle.dashPattern = top.style === 'dash' ? [1, 1] : [0,0],
        strokeStyle.name = name as string;
        return strokeStyle;
    }

    transformToServer(stroke: StrokeStyle) {
        return stroke;
    }

    private async queryList() {
        const { data }= await this.borderDao.query({});
        const borders = data?.borders || [] ;
        this.serviceStyles.clear();
        borders.map(border => this.transformToLocal(border)).forEach(border => this.addServiceStyle(border));
        this.subject.next({type: 'R', data: this.getServiceStyles()});
    }
 
}