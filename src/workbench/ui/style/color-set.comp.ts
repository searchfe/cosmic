import { injectable, inject } from 'inversify';

import type ColorRef from '@cosmic/core/common/color-ref';

import type { AppearanceType } from '@cosmic/core/common/appearance';
import * as Colors from '@cosmic/core/browser/style/ui-color';
import { AppearanceService } from '@cosmic/workbench/services/appearance-service';

export const ColorSetRoot = Symbol.for('UIColorElement');

@injectable()
export class ColorSet {
  constructor(
    @inject(ColorSetRoot) private root: HTMLElement,
    @inject(AppearanceService) private aps: AppearanceService,
    ) {
    // this.root.innerHTML = '';
    this.render();
    aps.onModeChanged((type: AppearanceType) => this.onModeChanged(type));
  }
  private onModeChanged(type: AppearanceType) {
    this.render();
  }
  render() {
    const colorStringArray: string[] = [];
    const colors = Colors as {[key: string]: ColorRef};
    const type = this.aps.type();
    Object.keys(colors).forEach((key: string) => {
      colorStringArray.push(`-${this.fomat(key)} : ${colors[key].color(type).hex() };`);
    });
    this.root.innerHTML = `:root {
      ${colorStringArray.join('\r')}
    }`;
  }
  fomat(key: string) {
    // BackgroundColor -> -background-color
    return key.replace(/([A-Z])/g, (f: string) => `-${f.toLocaleLowerCase()}`);
  }
}
