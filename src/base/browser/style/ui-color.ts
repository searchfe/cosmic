import * as Color from 'color';
import ColorRef from '@cosmic-base/common/color-ref';

function makeColor(anyColorHex: string, lightColorHex?: string, darkColorHex?: string) {
  return new ColorRef(Color(anyColorHex), Color(lightColorHex), Color(darkColorHex));
}

export const BorderColor =            makeColor('#D9D9D9', '#D9D9D9', '#D9D9D9');
/** 高亮色 */
export const ControlAccentColor =     makeColor('#0070FF', '#0070FF', '#0070FF');
export const ControlBackgroundColor = makeColor('#FFFFFF', '#FFFFFF', '#5D5F61');
export const ControlDisabledColor =   makeColor('#F9F9F9', '#F9F9F9', '#464749');

export const GridBackgroundColor =    makeColor('#F2F2F2', '#F2F2F2', '#2E2F30');

export const TextFieldBackground =    makeColor('#FFFFFF', '#F2F2F2', '#454545');

