import { injectable, inject } from 'inversify';

import type ColorRef from '@cosmic-base/common/color-ref';

import { AppearanceType } from '@cosmic-base/common/appearance';
import * as Colors from '@cosmic-base/browser/style/ui-color';
import { AppearanceService } from '@cosmic-workbench/services/appearance-service';

export const ColorSetRoot = Symbol.for('UIColorElement');

@injectable()
export class ColorSet {
  private type = AppearanceType.any;
  constructor(
    @inject(ColorSetRoot) private root: HTMLElement,
    @inject(AppearanceService) private aps: AppearanceService,
    ) {
    // this.root.innerHTML = '';
    this.render();
    aps.onModeChanged((type) => this.onModeChanged(type));
  }
  private onModeChanged(type: AppearanceType) {
    this.type = type;
    this.render();
  }
  render() {
    const colorStringArray: string[] = [];
    const colors = Colors as {[key:string]: ColorRef};
    Object.keys(colors).forEach((key) => {
      colorStringArray.push(`-${this.fomat(key)} : ${colors[key].color(this.type).hex() };`);
    });
    this.root.innerHTML = `:root {
      ${colorStringArray.join('\r')}
    }`;
  }
  fomat(key: string) {
    // BackgroundColor -> -background-color
    return key.replace(/([A-Z])/g, (f) => '-' + f.toLocaleLowerCase());
  }
}
