import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { RadiusStyle, cornerDao } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { TOKENS } from '../token';
import { v4, v5 } from 'uuid';

const DEFAULT_STYLES = {
    name: '默认名称',
    description: '默认主题',
    tl: ['0'],
    tr: ['0'],
    bl: ['0'],
    br: ['0'],
    team: '6166bd9cc13b026875181927',
    updatedAt: '',
    id: v5('cosmic', v4()),
};



@injectable()
export default class RadiusStyleService extends BaseService<RadiusStyle> {
    private cornerDao: ReturnType<typeof cornerDao>;
    constructor(@inject(TOKENS.GqlClient) private client: service.GqlClient) {
        super();
        this.cornerDao = cornerDao(this.client);
        this.queryList();
    }

    create() {
        const style = this.transformToLocal(DEFAULT_STYLES);
        return style;
    }

    transformToLocal(radius: gql.Corner) {
        const {tl, tr, bl, br, name, id} = radius; 
        const radiusStyle = new RadiusStyle(id);
        radiusStyle.tl = +tl[0];
        radiusStyle.tr = +tr[0];
        radiusStyle.bl = +bl[0];
        radiusStyle.br = +br[0];
        radiusStyle.name = name;
        return radiusStyle;
    }

    transformToService(radius: RadiusStyle) {
       const { name, tl, tr, bl, br } = radius;
       return {
            name,
            tl: [tl + ''],
            tr: [tr + ''],
            bl: [bl + ''],
            br: [br + ''],
       };
    }

    public cloneById(styleId: string, isChangeId = true): RadiusStyle {
        const style = this.get(styleId);
        const radiusStyle = new RadiusStyle(isChangeId ? v5('cosmic', v4()) : styleId);
        const {id, name, tl, tr, bl, br} = style;
        radiusStyle.name = name;
        radiusStyle.tl = tl;
        radiusStyle.tr = tr;
        radiusStyle.bl = bl;
        radiusStyle.br = br;
        return radiusStyle;
    }

    public async saveStyle(id: string) {
        const style = this.transformToService(this.get(id));
        const team = await this.teamService.getCurrentUserTeam();
        const { data } = await this.cornerDao.create({...style, team: team?.id});
        if (data?.createCorner) {
            await this.queryList();
            this.subject.next({type: 'C', data: data?.createCorner.id as string});
        }
    }

    public async updateStyle(style: RadiusStyle) {
        const serviceStyle = this.transformToService(style);
        const {data} = await this.cornerDao.update({...serviceStyle, id: style.id});
        if (data?.updateCorner) {
            await this.queryList();
            this.subject.next({type: 'U', data: style.id});
        }
    }

    public async queryList() {
        const { data } = await this.cornerDao.query({});
        const corners = data?.corners || [] as gql.Corner[];
        this.serviceStyles.clear();
        corners.map(corner => this.transformToLocal(corner)).forEach(corner => this.addServiceStyle(corner));
        this.subject.next({type: 'R', data: ''});
    }
 
}