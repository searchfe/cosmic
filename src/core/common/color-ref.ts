import type * as Color from 'color';
import { AppearanceType } from './appearance';

export default class ColorRef {
  private anyColor: Color;
  private lightColor: Color;
  private darkColor: Color;

  constructor(anyColor: Color, lightColor?: Color, darkColor?: Color) {
    this.anyColor = anyColor;
    this.lightColor = lightColor || anyColor;
    this.darkColor = darkColor || anyColor;
  }

  public color(appearanceType: AppearanceType) {
    switch (appearanceType) {
      case AppearanceType.any:
        return this.anyColor;
      case AppearanceType.light:
        return this.lightColor;
      case AppearanceType.dark:
        return this.darkColor;
      default:
        return this.anyColor;
    }
  }
}
