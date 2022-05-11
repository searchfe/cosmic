import { BlendMixin, SceneNode } from '../../document';
import type { NodeStyle } from './types';
import { paintToRgbaString } from './color';

export function makeEffectStyle(node: BlendMixin) {
    if (!node.effects || node.effects.length === 0) {
        return {
            boxShadow: 'none',
        };
    }
    const styles: NodeStyle = {};
    const fill = (node as SceneNode).getPluginData('effectStores');
    const color =  paintToRgbaString(fill) || '#000';
    const [effect] = node.effects;
    const {offset, spread, radius} = effect as Internal.DropShadowEffect;
    styles['box-shadow'] = `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${color}`;
    return styles;
}

