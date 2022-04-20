import { toRaw } from 'vue';
import { FrameNode } from '@cosmic/core/parts';

export default {
    mounted(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
    updated(el: HTMLElement, binding: any) {
        changeStyle(el, binding);
    },
};

function changeStyle(el: HTMLElement, binding: any) {
    const node = toRaw(toRaw(binding.value).target) as FrameNode;
    const { topLeftRadius = 0, topRightRadius = 0, bottomLeftRadius = 0, bottomRightRadius = 0 } = node;
    // if (topLeftRadius) el.style.borderTopLeftRadius = `${topLeftRadius}px`;
    // if (topRightRadius) el.style.borderTopRightRadius = `${topLeftRadius}px`;
    // if (bottomLeftRadius) el.style.borderBottomLeftRadius = `${bottomLeftRadius}px`;
    // if (bottomRightRadius) el.style.borderBottomRightRadius = `${bottomRightRadius}px`;
    el.style.borderRadius = `${topLeftRadius}px ${topRightRadius}px  ${bottomRightRadius}px ${bottomLeftRadius}px`;
}