import { serializable} from '../serialize';

@serializable()
export default class SolidPaint implements Internal.SolidPaint {
    readonly type = 'SOLID';
    color: Internal.RGB = {r: 255, g: 255, b: 255};
    visible?: boolean = true;
    opacity?: number = 1;
    blendMode?: Internal.BlendMode = 'NORMAL';
}
