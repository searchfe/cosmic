import { FrameNode, PageNode, SceneNode, SolidPaint, TextNode } from '../internals';

export function transformTextStyleFromNode(node: TextNode): Partial<Internal.TextStyle> {
    const { fontSize = 12, paragraphSpacing = 0 } = node;
    const fontName = node.fontName as Internal.FontName || {family: 'PingFang SC', style:  '400'};
    const letterSpacing = node.letterSpacing as Internal.LetterSpacing || {value:  0, unit: 'PIXELS'};
    const lineHeight = node.lineHeight as Internal.LineHeight || { value: 12, unit: 'PIXELS'};
    const textDecoration = node.textDecoration as Internal.TextDecoration || 'NONE';
    return {
        fontSize: fontSize as number,
        fontName: {...fontName},
        letterSpacing: {...letterSpacing},
        lineHeight: {...lineHeight},
        paragraphSpacing,
        textDecoration,
    };
}

export function transformSolidFromNode(node: TextNode ): Partial<Internal.SolidPaint> {
    const fills  = (node.fills || [new SolidPaint()]) as  Partial<Internal.SolidPaint>[];
    const solidPaint = fills[0];
    return {...solidPaint, color: {...solidPaint.color} as Internal.RGB};
}

export function transformBackgroundFormNode(node: FrameNode): Partial<Internal.SolidPaint> {
    const backgrounds  = (node.backgrounds || [new SolidPaint()]) as  Partial<Internal.SolidPaint>[];
    const solidPaint = backgrounds[0];
    return {...solidPaint, color: {...solidPaint.color} as Internal.RGB};
}

export function transformCornerFromNode(node: FrameNode): Internal.RectangleCornerMixin {
    const {topLeftRadius = 0,  topRightRadius = 0, bottomLeftRadius = 0, bottomRightRadius = 0} = node;
    return {
        topLeftRadius,
        topRightRadius,
        bottomLeftRadius,
        bottomRightRadius,
    };
}

export function transformStokeFromNode(node: TextNode | FrameNode) {
    const { strokeWeight = 0, strokeLineStyle = 'solid' } = node as any;
    return {
        strokeWeight,
        strokeLineStyle: strokeLineStyle || 'solid',
    };
}

export function transformStrokePainFromNode(node: TextNode | FrameNode): Internal.SolidPaint {
    const strokes = (node.strokes || [new SolidPaint()]);
    const stroke = (strokes[0] || new SolidPaint()) as Internal.SolidPaint as any;
    return stroke;
}

export function transformEffectStoreFromNode(node: SceneNode): Internal.SolidPaint {
    let style = node.getPluginData('effectStores');
    if (!style) {
        style = new SolidPaint();
        style.color = {r: 0, g: 0, b: 0};
        node.setPluginData('effectStores', style);
    }
    return {...style, color: {...style.color}};
}

export function transformDropEffectFromNode(node: SceneNode): Partial<Internal.DropShadowEffect> {
    let effect = node.effects && node.effects[0] as Partial<Internal.DropShadowEffect>;
    if (!effect) {
        effect = {
            offset: {x: 0, y: 0},
            spread: 0,
            radius: 0,
        };
    }
    return {...effect, offset: {...effect.offset} as Internal.Vector};
}