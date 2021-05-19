import { injectable, inject } from 'inversify';

import { AppearanceType } from 'base/common/appearance';

export interface UIColorHanlder {
  updateAppearance: (type: AppearanceType) => void;
}
export interface UIColorRef {
  type: AppearanceType;
}

export const UIColorElement = Symbol.for('UIColorElement');

@injectable()
export class UIColor implements UIColorHanlder, UIColorRef {
  public type: AppearanceType = AppearanceType.any;
  private root: HTMLElement;

  constructor(@inject(UIColorElement) root: HTMLElement) {
    this.root = root;
    this.root.innerHTML = 'here is color ui';
  }


  public updateAppearance(type: AppearanceType) {
    if (this.type !== type) {
      this.type = type;
    }

  }
}
