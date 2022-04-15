import { toRaw } from 'vue';
import { BlendMixin, util, Paint } from '@cosmic/core/parts';

export default {
    mounted(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
    updated(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
};

function changeStyle(el: HTMLElement, binding: any) {
    console.log(121);
    const node = toRaw(toRaw(binding.value).target) as BlendMixin & {effectStrokes: Array<any>};
    const field = toRaw(toRaw(binding.value).field) || 'boxShadow';
    const { effects = [], effectStrokes = [] } = node;
    const effect = effects[0];
    if (!effect) {
        el.style[field] = 'none';
        return;
    }
    console.log(121);
    const [fill] = effectStrokes;
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