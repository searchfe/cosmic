export function throttle(func: any, wait: number) {
    let lastTime: any;
    return function(...rest: any[]) {
        if (!lastTime ||
        (new Date().getTime() - lastTime > wait)) {
            lastTime = +new Date();
            func(...rest);
        }
    };
}
export function angleBetween(startX: number, startY: number, endX: number, endY: number) {
    let r = 180 * Math.atan2((endY - startY) , (endX - startX)) / Math.PI + 90;
    if (r < 0) r = Math.round(r + 360);
    return r;
}
export class RectWithThrottle {
    private lastTime?: number;
    private rect?: DOMRect;
    private dom: HTMLElement;
    private wait: number;
    constructor(dom: HTMLElement, wait = 1000) {
        this.dom = dom;
        this.wait = wait;
    }
    get() {
        const newTime = new Date().getTime();
        if (!this.rect || !this.lastTime ||
            (newTime - this.lastTime > this.wait)) {
                this.lastTime = newTime;
                this.rect = this.dom.getBoundingClientRect();
        }
        return this.rect;'';
    }
}
