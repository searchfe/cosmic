import { TextNode } from '../../document';
import { paintToRgbaString } from './color';
import type { NodeStyle } from './types';

export function makeTextStyle(node: TextNode) {
    const styles: NodeStyle = {};
    const {fontSize = 12, paragraphSpacing = 0, fontName = {}, letterSpacing = {}, lineHeight = {value:  12}, textDecoration} = node;
    styles['font-size']= `${fontSize as number}px`;
    styles['line-height'] = `${(lineHeight as {value: number}).value}px`;
    styles['font-family'] = `${(fontName as Internal.FontName).family ?? ''}`;
    styles['font-weiget'] = `${(fontName as Internal.FontName).style ?? 400}`;
    styles['letter-spacing'] = `${(letterSpacing as {value: number}).value ?? 0}px`;
    if(node.fills && Array.isArray(node.fills)) {
        styles['color'] = paintToRgbaString(node.fills[0]);
    }
    switch(node.textAlignHorizontal) {
        case 'LEFT':
            break;
        case 'CENTER':
            styles['text-align'] = 'center';
            break;
        case 'RIGHT':
            styles['text-align'] = 'right';
            break;
        case 'JUSTIFIED':
            styles['text-align'] = 'justify';
            break;
    }
    if(node.textAlignHorizontal)
    return styles;
}