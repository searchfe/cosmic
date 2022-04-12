import { serializable} from '../serialize';

@serializable()
export default class SolidPaint implements Internal.SolidPaint {
    readonly type = 'SOLID';
    color: Internal.RGB;
    visible?: boolean = true;
    opacity?: number = 1;
    blendMode?: Internal.BlendMode = 'NORMAL';
}
