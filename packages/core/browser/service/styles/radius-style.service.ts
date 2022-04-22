import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { RadiusStyle, cornerDao, serializable} from '@cosmic/core/parts';
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

    create(s: Partial<gql.Corner> = {}) {
        const style = this.transformToLocal({...DEFAULT_STYLES, ...s});
        return style;
    }

    transformToLocal(radius: gql.Corner) {
        const {tl, tr, bl, br, name, id} = radius; 
        const radiusStyle = new RadiusStyle(id);
        radiusStyle.topLeftRadius = parseInt(tl[0], 10);
        radiusStyle.topRightRadius = parseInt(tr[0], 10);
        radiusStyle.bottomLeftRadius = parseInt(bl[0], 10);
        radiusStyle.bottomRightRadius = parseInt(br[0], 10);
        radiusStyle.name = name;
        return radiusStyle;
    }

    transformToService(radius: Internal.RectangleCornerMixin & Partial<{name: string}>) {
       const {name = '默认名称', topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius } = radius;
       return {
            name,
            tl: [topLeftRadius + ''],
            tr: [topRightRadius + ''],
            bl: [bottomLeftRadius + ''],
            br: [bottomRightRadius + ''],
       };
    }

    public cloneById(styleId: string, isChangeId = true): RadiusStyle {
        const style = this.get(styleId);
        const radiusStyle = new RadiusStyle(isChangeId ? v5('cosmic', v4()) : styleId);
        const {id, name, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius} = style;
        radiusStyle.name = name;
        radiusStyle.topLeftRadius = topLeftRadius;
        radiusStyle.topRightRadius = topRightRadius;
        radiusStyle.bottomLeftRadius = bottomLeftRadius;
        radiusStyle.bottomRightRadius = bottomRightRadius;
        return radiusStyle;
    }

    public async saveStyle(radiusStyle: Internal.RectangleCornerMixin) {
        const style = this.transformToService(radiusStyle);
        const team = await this.teamService.getCurrentUserTeam();
        const { data } = await this.cornerDao.create({...style, team: team?.id});
        if (data?.createCorner) {
            await this.queryList();
            this.subject.next({type: 'C', data: data?.createCorner.id as string});
        }
    }

    public async updateStyle(style: Internal.RectangleCornerMixin & {name: string, id: string}) {
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