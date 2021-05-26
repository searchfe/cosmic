import * as Color from 'color';
import ColorRef from '@cosmic-base/common/color-ref';

function makeColor(anyColorHex: string, lightColorHex?: string, darkColorHex?: string) {
  return new ColorRef(Color(anyColorHex), Color(lightColorHex), Color(darkColorHex));
}

export const BorderColor =            makeColor('#D9D9D9', '#D9D9D9', '#D9D9D9');

/** 高亮色 */
export const ControlAccentColor =     makeColor('#5580c0', '#5580c0', '#5580c0');
export const ControlHighlightColor =  makeColor('#ffae2b', '#ffae2b', '#ffae2b');
export const ControlForbiddenColor =  makeColor('#d00000', '#d00000', '#d00000');

export const ControlBackgroundColor = makeColor('#FFFFFF', '#FFFFFF', '#5D5F61');
export const ControlDisabledColor =   makeColor('#F9F9F9', '#F9F9F9', '#464749');

/** 三级标签色 */
export const LabelColor =             makeColor('#000000', '#000000', '#E0E0E0');
export const SecondaryLabelColor =    makeColor('#000000', '#000000', '#808080');
export const TertiaryLabelColor =     makeColor('#3F3F3F', '#3F3F3F', '#3F3F3F');

/** 三级背景色 */
export const BgColor =                makeColor('#E0E0E0', '#E0E0E0', '#1F1F1F');
export const SecondaryBgColor =       makeColor('#D7D7D7', '#D7D7D7', '#272728');
export const TertiaryBgColor =        makeColor('#C6C6C6', '#C6C6C6', '#393939');
export const FourthBgColor =          makeColor('#BABABA', '#BABABA', '#454545');

/** 辅助色 */
export const SystemYellowColor =      makeColor('#d1905d', '#d1905d', '#d1905d');
export const SystemOrangeColor =      makeColor('#d1905d', '#d1905d', '#d1905d');
export const SystemPinkColor =        makeColor('#c4666f', '#c4666f', '#c4666f');
export const SystemRedColor =         makeColor('#d00000', '#d00000', '#d00000');
export const SystemGrayColor =        makeColor('#c0c0c1', '#c0c0c1', '#c0c0c1');
export const SystemBlueColor =        makeColor('#729cd4', '#729cd4', '#729cd4');


/** 组件色 */
export const GridBackgroundColor =    makeColor('#F2F2F2', '#F2F2F2', '#2E2F30');
export const TextFieldBackground =    makeColor('#FFFFFF', '#F2F2F2', '#454545');
