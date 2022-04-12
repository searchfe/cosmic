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
    const node = toRaw(toRaw(binding.value).target) as BlendMixin & {effectStrokes: Array<any>};
    const { effects = [], effectStrokes = [] } = node;
    const effect = effects[0];
    if (!effect) {
        el.style.boxShadow = 'none';
        return;
    }
    const [fill] = effectStrokes;
    console.log(fill);
    const color = util.toBackgroundStyle(fill as Paint);
    const {offset, spread, radius} = effect as any;
    el.style.boxShadow =  `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${color}`;
    
}