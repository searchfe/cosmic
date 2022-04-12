import { toRaw } from 'vue';
import { MinimalStrokesMixin, util, Paint } from '@cosmic/core/parts';

export default {
    mounted(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
    updated(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
};

function changeStyle(el: HTMLElement, binding: any) {
    const node = toRaw(toRaw(binding.value).target) as MinimalStrokesMixin & { strokeId: string};
    
    const { strokeWeight, dashPattern = [0, 0], strokeId, strokes = [] } = node;
    if (!strokeId) {
        el.style.border = 'none';
        return;
    }
    const [fill] = strokes;
    const [ gap ] = dashPattern;
    const color = util.toBackgroundStyle(fill as Paint);
    const borderStyle = +gap > 0 ? 'dashed' : 'solid';
    el.style.border = `${strokeWeight}px ${borderStyle} ${color}`;
}