import { injectable, inject } from 'inversify';
import type { AppearanceType } from '@cosmic-base/common/appearance';

import { AppearanceService } from '@cosmic-workbench/services/appearance-service';

export const ColorSetRoot = Symbol.for('UIColorElement');

@injectable()
export class ColorSet {

  constructor(
    @inject(ColorSetRoot) private root: HTMLElement,
    @inject(AppearanceService) private aps: AppearanceService,
    ) {
    this.root.innerHTML = '';
    aps.onModeChanged(this.onModeChanged);
  }
  private onModeChanged(type: AppearanceType) {
    console.log('type change ->', type);
  }
}
