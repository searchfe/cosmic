import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { service } from '@cosmic/core/browser';
import { TOKENS } from '../token';
import { EffectStyle, shadowDao } from '@cosmic/core/parts';
import { v4, v5 } from 'uuid';

const DEFAULT_STYLES = {
    id: '',
    name: '默认名称',
    team: '',
    type: '',
    offsetX: '0',
    offsetY: '0',
    blur: '0',
    spread: '0',
};
interface SubjectSourceType {
    type: 'C' | 'U' | 'D' | 'R';
    data?: Partial<EffectStyle>[] | string;
}

@injectable()
export default class EffectStyleService extends BaseService<EffectStyle, SubjectSourceType> {
    private shadowDao: ReturnType<typeof shadowDao>;
    constructor(@inject(TOKENS.GqlClient) private client: service.GqlClient) {
        super();
        this.shadowDao = shadowDao(client);
        this.queryList();
    }

    create() {
        const style = this.transformToLocal(DEFAULT_STYLES);
        return style;
    }

    cloneById(styleId: string, isChangeId = true) {
        const originalStyle = this.get(styleId);
        const effectStyle = new EffectStyle(isChangeId ? v5('cosmic', v4()) : styleId);
        const {name, effects} = originalStyle;
        const { offset, radius, spread } = effects[0] as Internal.DropShadowEffect;
        effectStyle.name = name;
        effectStyle.effects = [{
            offset: {...offset},
            radius,
            spread,
        }] as Internal.DropShadowEffect[];
        return effectStyle;
    }

    transformToLocal(shadow: Partial<gql.Shadow>) {
        const{offsetX = 0, offsetY = 0, id = Date.now() + '', name, blur = 0, spread} = shadow;
        const effectStyle = new EffectStyle(id);
        effectStyle.name = name as string;
        const effect = {
            offset: { x: offsetX, y: offsetY},
            radius: blur,
            spread: spread,
        } as Internal.Effect;
        effectStyle.effects = [effect];
        return effectStyle;
    }

    transformToService(effectStyle: EffectStyle): Partial<gql.Shadow> {
        const { name , effects } = effectStyle ;
        const { offset, radius, spread } = (effects[0] || {}) as Internal.DropShadowEffect;
        return {
            name,
            offsetX: offset.x + '',
            offsetY: offset.y + '',
            spread: spread + '',
            blur: radius + '',
            team: '6166bd9cc13b026875181927',
        };
    }

    public async saveStyle(id: string) {
        const style = this.transformToService(this.get(id)!);
        const { data } = await this.shadowDao.create(style);
        if (!data?.createShadow) return;
        await this.queryList();
        this.subject.next({type: 'C', data: data?.createShadow.id as string} );
    }

    public async updateStyle(style: EffectStyle) {
        const serviceStyle = this.transformToService(style);
        const {data} = await this.shadowDao.update({...serviceStyle, id: style.id});
        if (data?.updateShadow) {
            await this.queryList();
            this.subject.next({type: 'U', data: style.id});
        }
    }

    private async queryList() {
        const { data }= await this.shadowDao.query({});
        const shadows = data?.shadows || [] ;
        this.serviceStyles.clear();
        shadows.map(shadow => this.transformToLocal(shadow)).forEach(shadow => this.addServiceStyle(shadow));
        this.subject.next({type: 'R', data: this.getServiceStyles()});
    }

}