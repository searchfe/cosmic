import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { service } from '@cosmic/core/browser';
import { TextStyle } from '@cosmic/core/parts';
import { fontDao } from '@cosmic/core/parts';
import { TOKENS } from '../token';
import { v4, v5 } from 'uuid';

const DEFAULT_STYLES = {
    name: '默认名称',
    description: '默认主题',
    size: '12',
    id: Date.now() + '',
    family: 'PingFang SC',
    style: '400',
    lineHeight: '12',
};

/**
 * todo: figma 字体没有fontweight
 */

@injectable()
export default class TextService extends BaseService<TextStyle> {
    private fontDao: ReturnType<typeof fontDao>;
    constructor(@inject(TOKENS.GqlClient) private client: service.GqlClient) {
        super();
        this.fontDao = fontDao(this.client);
        this.setType('TEXT');
        this.queryList();
    }

    public create(): TextStyle  {
        const style = this.transformToLocal(DEFAULT_STYLES);
        return style;
    }

    public cloneById(styleId: string, isChangeId = true): TextStyle {
        const style = this.get(styleId);
        const fontStyle = new TextStyle(isChangeId ? v5('cosmic', v4()) : styleId);
        const { description, name, fontSize, textDecoration, fontName, lineHeight, letterSpacing, paragraphSpacing } = style;
        fontStyle.description = description;
        fontStyle.name = name;
        fontStyle.fontSize = fontSize;
        fontStyle.textDecoration = textDecoration;
        fontStyle.fontName = {...fontName};
        fontStyle.lineHeight = {...lineHeight};
        fontStyle.letterSpacing = {...letterSpacing};
        fontStyle.paragraphSpacing = paragraphSpacing;
        return fontStyle;
    }

    public isRepeat(styleId: string) {
        const localStyle = this.localStyles.get(styleId);
        if (!localStyle) return false;
        const serviceStyles = this.getServiceStyles();
        return serviceStyles.some(item => {
            return +localStyle.fontSize === +item.fontSize
                && localStyle.textDecoration === item.textDecoration
                && +localStyle.lineHeight?.value === +localStyle.lineHeight.value
                && localStyle.fontName.family === item.fontName.family
                && localStyle.fontName.style === item.fontName.style
                && +localStyle.letterSpacing.value === +item.letterSpacing.value;
        });
    }

    public async queryList() {
        const { data } = await this.fontDao.query({});
        const fonts = data?.fonts || [] as gql.Font[];
        this.serviceStyles.clear();
        fonts.map(font => this.transformToLocal(font)).forEach(font => this.addServiceStyle(font));
        this.subject.next({type: 'R', data: ''});
    }

    public async saveStyle(id: string) {
        const style = this.transformToService(this.get(id));
        const team = await this.teamService.getCurrentUserTeam();
        const { data } = await this.fontDao.create({...style, team: team?.id});
        if (data?.createFont) {
            await this.queryList();
            this.subject.next({type: 'C', data: data.createFont?.id as string});
        }
    }

    public async updateStyle(style: TextStyle) {
        const serviceStyle = this.transformToService(style);
        const {data} = await this.fontDao.update({...serviceStyle, id: style.id});
        if (data?.updateFont) {
            await this.queryList();
            this.subject.next({type: 'U', data: style.id});
        }
    }

    public transformToLocal(fontStyle: Partial<gql.Font>): TextStyle {
        const { id, name, size, family, style = '400', lineHeight } = fontStyle;
        const textStyle = new TextStyle(id!);
        textStyle.description = '默认描述';
        textStyle.name = name as string;
        textStyle.fontSize = Number(size);
        textStyle.textDecoration = 'NONE';
        textStyle.fontName = { family: family!, style: style } as unknown as Internal.FontName;
        textStyle.lineHeight = {value: Number(lineHeight), unit: 'PIXELS'};
        textStyle.letterSpacing = {value: Number(0), unit: 'PIXELS'};
        textStyle.paragraphSpacing = 0;
        return textStyle;
    }

    public transformToService(target: Partial<TextStyle>): Partial<gql.Font> {
        const { name, fontSize, fontName, lineHeight, letterSpacing, paragraphSpacing } = target as TextStyle & { lineHeight: {value: number}};
        return {
            name: name!,
            size: fontSize ? fontSize + '' : '',
            weight: '10',
            lineHeight: String(lineHeight?.value),
            family: fontName!.family! + '',
            style: fontName!.style,
            team: '6166bd9cc13b026875181927',
            variant: '121212',
        };
    }

}
