import { type Ref } from 'vue';

interface SetOption {
    x?: number,
    y?: number,
    cursor?: string,
    end: boolean,
}

export function useSpring(content: Ref<HTMLElement | undefined>, gesturer: Ref<HTMLElement | undefined>) {
    let x = 0, y = 0;
    return {
        set: (option: SetOption) => {
            if (!content.value) return;
            const node: HTMLElement = content.value;
            if (gesturer.value && option.cursor) gesturer.value.style.cursor = option.cursor;
            if (option.x !== undefined && option.y !== undefined) {
                node.style.transform = `translate(${x + option.x}px, ${y + option.y}px)`;
                if (option.end) {
                    x = x + option.x;
                    y = y + option.y;
                }
            }
        },
        setCenter: () => {
            if (!content.value || !gesturer.value) return;
            const node: HTMLElement = content.value;
            const innerRect = node.getBoundingClientRect();
            const outterRect = gesturer.value.getBoundingClientRect();
            x = outterRect.width / 2 - innerRect.width / 2;
            y = outterRect.height / 2 - innerRect.height / 2;
            node.style.transform = `translate(${x}px, ${y}px)`;
        },
    };
}