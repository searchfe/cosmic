import { injectable, inject, ContainerModule } from 'inversify';
import { EventEmitter2 } from 'eventemitter2';

import { AppearanceType } from '@cosmic/core/common';

@injectable()
/** 外观设置服务 */
export class AppearanceService {
  private _type: AppearanceType = AppearanceType.dark;
  private evt = new EventEmitter2();

  public updateMode(type: AppearanceType) {
    if (this._type !== type) {
      this._type = type;
      this.evt.emit('onModeChanged', type);
    }
  }
  public onModeChanged(fn: (type: AppearanceType) => void) {
    this.evt.on('onModeChanged', fn);
  }
  public type() {
    return this._type;
  }
}
