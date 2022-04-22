import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { StrokeStyle, borderDao, MinimalStrokesMixin } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { TOKENS } from '../token';
import { v4, v5 } from 'uuid';

const DEFAULT_STYLES = {
    id: '',
    name: '默认名称',
    team: '',
    updatedAt: '',
    top: {weight: '0', style: 'solid'},
};

@injectable()
export default class StrokeStyleService extends BaseService<StrokeStyle> {
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
        const {strokeWeight, strokeAlign, strokeLineStyle, dashPattern, name} = originalStyle;
        cloneStyle.strokeWeight = strokeWeight;
        cloneStyle.strokeAlign = strokeAlign;
        cloneStyle.strokeLineStyle = strokeLineStyle;
        cloneStyle.dashPattern = [...dashPattern];
        cloneStyle.name = name;
        return cloneStyle;
    }

    transformToLocal(servicerColor: Partial<gql.Border>) {
        const{id = Date.now() + '', name, team, updatedAt, top = {weight: '10', style: 'solid'}} = servicerColor;
        const strokeStyle = new StrokeStyle(id);
        strokeStyle.strokeWeight = parseInt(top.weight);
        strokeStyle.strokeAlign = 'CENTER';
        strokeStyle.strokeLineStyle = 'solid';
        strokeStyle.dashPattern = top.style === 'dash' ? [1, 1] : [0,0],
        strokeStyle.name = name as string;
        return strokeStyle;
    }

    transformToService(stroke: MinimalStrokesMixin & Partial<{ name: string }>): Partial<gql.Border>{
        const { name = '默认名称', strokeLineStyle, strokeWeight } = stroke;
        return {
            name,
            top: {style: strokeLineStyle, weight: strokeWeight + ''},
            bottom: {style: strokeLineStyle, weight: strokeWeight  + ''},
            left: {style: strokeLineStyle, weight: strokeWeight  + ''},
            right: {style: strokeLineStyle, weight: strokeWeight  + ''},
        };
    }

    public async saveStyle(style: MinimalStrokesMixin) {
        const serviceStyle = this.transformToService(style);
        const team = await this.teamService.getCurrentUserTeam();
        const { data } = await this.borderDao.create({...serviceStyle, team: team?.id});
        
        if (data?.createBorder) {
            await this.queryList();
            this.subject.next({type: 'C', data: data.createBorder.id as string});
        }
        
    }

    public async updateStyle(style: MinimalStrokesMixin) {
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
        this.subject.next({type: 'R', data: ''});
    }
 
}