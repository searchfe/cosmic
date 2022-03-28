import { type Ref } from 'vue';
import type WidgetGuides from 'vue-guides';
import { useDrag, useWheel } from '@vueuse/gesture';

interface SetOption {
    x?: number,
    y?: number,
    cursor?: string,
    end: boolean,
}
interface SpringOption {
    content: Ref<HTMLElement>;
    wrapper: Ref<HTMLElement>;
    scrollX: Ref<WidgetGuides>;
    scrollY: Ref<WidgetGuides>;
}

export class Gesturer {
    content: Ref<HTMLElement>;
    wrapper: Ref<HTMLElement>;
    scrollX: Ref<WidgetGuides>;
    scrollY: Ref<WidgetGuides>;
    x = 0;
    y = 0;
    constructor(option: SpringOption) {
        this.content = option.content;
        this.wrapper = option.wrapper;
        this.scrollX = option.scrollX;
        this.scrollY = option.scrollY;

        useDrag(({ movement: [x, y], dragging, event }) => {
            if (event.target !== this.wrapper.value) return;
            this.delta({ x, y, cursor: dragging ? 'grabbing' : 'grab', end: !dragging });
        }, { domTarget: this.wrapper });

        useWheel(({ movement: [x, y], wheeling }) => {
            this.delta({ x, y, cursor: wheeling ? 'grabbing': 'grab', end: !wheeling });
        }, { domTarget: this.wrapper });
    }
    delta(option: SetOption) {
        if (!this.content.value) return;
        if (this.wrapper.value && option.cursor) this.wrapper.value.style.cursor = option.cursor;
        if (option.x !== undefined && option.y !== undefined) {
            this.moveTo(this.x + option.x, this.y + option.y);
            if (option.end) {
                this.x = this.x + option.x;
                this.y = this.y + option.y;
            }
        }
    }
    moveTo(x: number, y: number) {
        this.content.value.style.transform = `translate(${x + 25}px, ${y+25}px)`;
        this.scrollX.value.scroll(x * -1);
        this.scrollX.value.scrollGuides(y * -1);
        this.scrollY.value.scroll(y * -1);
        this.scrollY.value.scrollGuides(x * -1);
    }
    moveToCenter() {
        const node: HTMLElement = this.content.value;
        const innerRect = node.getBoundingClientRect();
        const outterRect = this.wrapper.value.getBoundingClientRect();
        this.x = outterRect.width / 2 - innerRect.width / 2;
        this.y = outterRect.height / 2 - innerRect.height / 2;
        this.moveTo(this.x, this.y);
    }
    moveToStart() {
        this.x = 0;
        this.y = 0;
        this.moveTo(0, 0);
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    resize() {
        this.moveTo(this.x, this.y);
        this.scrollX.value.resize();
        this.scrollY.value.resize();
    }
}

