type FlowValue = '1' | 'auto' | 'initial' | 'none';

export default class View {
  public root: HTMLElement;
  constructor(root?: HTMLElement) {
    this.root = root || document.createElement('div');
  }
  setFlow(type: FlowValue) {
    this.root.classList.remove('flex-1', 'flex-auto', 'flex-initial', 'flex-none');
    this.root.classList.add(`flex-${type}`);
    return this;
  }
  append(child: HTMLElement) {
    this.root.appendChild(child);
    return this;
  }
  prepend(...childs: HTMLElement[]) {
    this.root.prepend(...childs);
    return this;
  }
}
