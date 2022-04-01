import { injectable, inject } from '@cosmic/core/inversify';
import { BaseService } from './base.service';
import { TextStyle } from '@cosmic/core/parts';
import FontDaoService from '../dao/font.dao.service';
import { TOKENS } from '../token';
import { Subject } from '@cosmic/core/rxjs';

const DEFAULT_STYLES = {
    name: '默认名称',
    description: '默认主题',
    size: '12',
    id: Date.now() + '',
    family: 'PingFang SC',
    style: '',
};

interface SubjectSourceType {
    type: 'C' | 'U' | 'D' | 'R';
    data?: Partial<TextStyle>[];
}

/**
 * todo: figma 字体没有fontweight
 */

@injectable()
export default class TextService extends BaseService<TextStyle, SubjectSourceType> {
    constructor(@inject<FontDaoService>(TOKENS.FontDao) private fontDaoService: FontDaoService) {
        super();
        this.setType('TEXT');
        this.subject = new Subject<SubjectSourceType>();
        this.queryList();
    }

    public create(): TextStyle  {
        const style = this.transformToLocal(DEFAULT_STYLES);
        return style;
    }

    public async queryList() {
        const fonts = await this.fontDaoService.queryList();
        this.serviceStyles.clear();
        if (fonts) {
            fonts.map(font => this.transformToLocal(font)).forEach(font => this.addServiceStyle(font));
            this.subject.next({type: 'R', data: this.getServiceStyles()});
        }
    }

    public async saveStyle(id: string) {
        const style = this.transformToService(this.get(id)!);
        const creatOption = await this.fontDaoService.create(style);
        await this.queryList();
        this.subject.next({type: 'C', data: []});
    }

    public async updateStyle(style: TextStyle) {
        const update = await this.fontDaoService.update(this.transformToService(style));
    }

    public transformToLocal(fontStyle: Partial<gql.Font>): TextStyle {
        const { id, name, size, family, style, lineHeight = '10'} = fontStyle;
        const textStyle = new TextStyle(id!);
        textStyle.description = '默认描述';
        textStyle.name = name as string;
        textStyle.fontSize = Number(size);
        textStyle.fontName = { fontFamily: family!, style: style! } as unknown as Internal.FontName;
        textStyle.lineHeight = {value: Number(lineHeight), unit: 'PIXELS'};
        textStyle.letterSpacing = {value: Number(10), unit: 'PIXELS'};
        textStyle.paragraphSpacing = Number('1');
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