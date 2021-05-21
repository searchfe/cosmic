import { injectable, inject, ContainerModule } from 'inversify';
import type { interfaces } from 'inversify';


import { AppearanceType } from 'base/common/appearance';

export const UIColorRoot = Symbol.for('UIColorElement');

@injectable()
export class UIColor {
  public type: AppearanceType = AppearanceType.any;
  private root: HTMLElement;

  constructor(@inject(UIColorRoot) root: HTMLElement) {
    console.log('cons', root);
    this.root = root;
    this.root.innerHTML = '';
  }


  public updateAppearance(type: AppearanceType) {
    if (this.type !== type) {
      this.type = type;
    }

  }
}

export const UIColorModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
  // 如果需改变入口可 使容器rebind UIColorRoot
  bind<HTMLElement>(UIColorRoot).toDynamicValue(() => document.getElementById('head') as HTMLElement);
  bind<UIColor>(UIColor).to(UIColor);
});
