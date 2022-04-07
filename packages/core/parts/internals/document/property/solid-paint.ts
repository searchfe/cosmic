import { serializable} from '../serialize';
import { v4, v5} from 'uuid';

@serializable()
export default class SolidPaint implements Internal.SolidPaint {
    readonly type = 'SOLID';
    color: Internal.RGB;
    visible?: boolean = true;
    opacity?: number = 1;
    blendMode?: Internal.BlendMode = 'NORMAL';
    id: string;
    constructor(color: Internal.RGB) {
        this.id = v5('cosmic', v4());
        this.color = color;
    }
}
