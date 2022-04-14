import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { StrokeStyle, borderDao } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { TOKENS } from '../token';
import { v4, v5 } from 'uuid';

const DEFAULT_STYLES = {
    id: '',
    name: '默认名称',
    team: '',
    updatedAt: '',
    top: {weight: '1', style: 'solid'},
};
interface SubjectSourceType {
    type: 'C' | 'U' | 'D' | 'R';
    data?: Partial<StrokeStyle>[] | string;
}


@injectable()
export default class StrokeStyleService extends BaseService<StrokeStyle, SubjectSourceType> {
    private borderDao: ReturnType<typeof borderDao>;
    constructor(@inject(TOKENS.GqlClient) private client: service.GqlClient) {
        super();
        this.setType('stroke');
        this.borderDao = borderDao(client);
        this.queryList();
    }

    create(stroke = DEFAULT_STYLES) {
        const style = this.transformToLocal(stroke);
        return style;
    }

    cloneById(id: string, isChangeId = true) {
        const originalStyle = this.get(id);
        const cloneStyle = new StrokeStyle(isChangeId ? v5('cosmic',v4()) : id);
        const {strokeWeight, strokeAlign, style, dashPattern, name} = originalStyle;
        cloneStyle.strokeWeight = strokeWeight;
        cloneStyle.strokeAlign = strokeAlign;
        cloneStyle.style = style;
        cloneStyle.dashPattern = [...dashPattern];
        cloneStyle.name = name;
        return cloneStyle;
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

    transformToService(stroke: StrokeStyle): Partial<gql.Border>{
        const { name, style, strokeWeight } = stroke;
        return {
            name,
            top: {style, weight: strokeWeight},
            bottom: {style, weight: strokeWeight},
            left: {style, weight: strokeWeight},
            right: {style, weight: strokeWeight},
            team: '6166bd9cc13b026875181927',
        };
    }

    public async saveStyle(id: string) {
        const style = this.transformToService(this.get(id)!);
        const creatOption = await this.borderDao.create(style);
        await this.queryList();
        this.subject.next({type: 'C', data: []});
    }

    public async updateStyle(style: StrokeStyle) {
        const serviceStyle = this.transformToService(style);
        const {data} = await this.borderDao.update({...serviceStyle, id: style.id});
        if (data?.updateBorder) {
            await this.queryList();
            this.subject.next({type: 'U', data: style.id});
        }
    }

    private async queryList() {
        const { data }= await this.borderDao.query({});
        const borders = data?.borders || [] ;
        this.serviceStyles.clear();
        borders.map(border => this.transformToLocal(border)).forEach(border => this.addServiceStyle(border));
        this.subject.next({type: 'R', data: this.getServiceStyles()});
    }
 
}