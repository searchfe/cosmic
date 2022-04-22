import { toRaw } from 'vue';
import { util, Paint, SceneNode } from '@cosmic/core/parts';

export default {
    mounted(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
    updated(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
};

function changeStyle(el: HTMLElement, binding: any) {
    const node = toRaw(toRaw(binding.value).target) as SceneNode;
    const field = toRaw(toRaw(binding.value).field) || 'boxShadow';
    const { effects = []} = node;
    const effect = effects[0];
    if (!effect) {
        el.style[field] = 'none';
        return;
    }
    const fill = node.getPluginData('effectStores');
    const color = util.toBackgroundStyle(fill as Paint) || '#000000';
    const {offset, spread, radius} = effect as any;
    let shadow = '';
    if (field === 'boxShadow') {
        shadow = `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${color}`;
    } else {
        shadow = `${offset.x}px ${offset.y}px ${radius}px ${color}`;
    }
    el.style[field] = shadow;
}