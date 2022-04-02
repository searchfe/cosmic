import { pick } from 'lodash';
import { serializable} from '../../../util/serializable';

@serializable('SOLID')
export default class SolidPaint implements Internal.SolidPaint {
    readonly type = 'SOLID';
    color: Internal.RGB;
    visible?: boolean = true;
    opacity?: number = 1;
    blendMode?: Internal.BlendMode = 'NORMAL';
    constructor(color: Internal.RGB) {
        this.color = color;
    }

    serialize() {
        return {
            type: this.type,
            data: pick(this, ['color', 'visible', 'opacity', 'blendMode']),
        };
    }
}
