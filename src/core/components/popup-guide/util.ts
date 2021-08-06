import keycode from 'keycode';

export const throttle = (func: any, wait: number) => {
  let lastTime: any;
  return function (...rest: any[]) {
    if (!lastTime || new Date().getTime() - lastTime > wait) {
      lastTime = +new Date();
      func(...rest);
    }
  };
};

export function angleBetween(startX: number, startY: number, endX: number, endY: number) {
  let r = (180 * Math.atan2(endY - startY, endX - startX)) / Math.PI + 90;
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
    if (!this.rect || !this.lastTime || newTime - this.lastTime > this.wait) {
      this.lastTime = newTime;
      this.rect = this.dom.getBoundingClientRect();
    }
    return this.rect;
  }
}

export function normalizeShortcutKey(
  /** e.g.  "67" | "67,72" | "B" | "B,Z | "B,13""*/
  keys: string
) {
  const shortcutKeycodes: number[] = [];
  let shortcutKeyText = '';
  keys.split(',').forEach((key: string) => {
    let text;
    if (parseFloat(key).toString() === 'NaN') {
      // case string
      shortcutKeycodes.push(keycode(key));
      text = key;
    } else {
      // case number
      shortcutKeycodes.push(parseInt(key, 10));
      text = keycode(parseInt(key, 10));
    }
    shortcutKeyText = shortcutKeyText || text.substring(0, 1).toUpperCase();
  });
  return {
    keycodes: shortcutKeycodes,
    text: shortcutKeyText,
  };
}
