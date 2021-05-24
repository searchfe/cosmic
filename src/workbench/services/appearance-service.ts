import { injectable, inject, ContainerModule } from 'inversify';
import { EventEmitter2 } from 'eventemitter2';

import { AppearanceType } from '@cosmic-base/common/appearance';


@injectable()
/** 外观设置服务 */
export class AppearanceService {
  private type: AppearanceType = AppearanceType.any;
  private evt = new EventEmitter2();

  public updateMode(type: AppearanceType) {
    if (this.type !== type) {
      this.type = type;
      this.evt.emit('onModeChanged', type);
      console.log('update mode', type);
    }
  }
  public onModeChanged(fn: (type: AppearanceType) => void) {
    this.evt.on('onModeChanged', fn);
  }
}
