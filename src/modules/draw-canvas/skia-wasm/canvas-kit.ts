const CanvasKitInit = require('/node_modules/canvaskit-wasm/bin/canvaskit.js');
import type {CanvasKit} from 'canvaskit-wasm';

export async function getCanvasKit(): Promise<CanvasKit> {
    return CanvasKitInit({
        locateFile: (file: string) =>  './bin/'+file,
    }).then((canvasKit: CanvasKit) => canvasKit);
}