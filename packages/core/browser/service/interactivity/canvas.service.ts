import { injectable } from '@cosmic/core/inversify';

@injectable()
/** 抽象画布接口 主要管理坐标系 */
export default class CanvasService {
    /** client offset of canvas */
    private clientX = 0;
    private clientY = 0;
    private clientWidth = 0;
    private clientHeight = 0;

    /** inner offset of canvas origin point */
    private contentOffsetX = 0;
    private contentOffsetY = 0;

    private scale = 1;

    setClient(x: number, y: number, width: number, height: number) {
        this.clientX = round(x);
        this.clientY = round(y);
        this.clientWidth = width;
        this.clientHeight = height;
    }

    setContentOffset(x: number, y: number) {
        this.contentOffsetX = round(x);
        this.contentOffsetY = round(y);
    }
    
    setScale(scale: number) {
        this.scale = 1;
    }

    getPosition(clientX: number , clientY: number) {
        return {
            x: round(clientX) - this.clientX - this.contentOffsetX,
            y: round(clientY) - this.clientY - this.contentOffsetY,
        };
    }

    inCanvas(clientX: number, clientY: number) {
        if ( clientX < this.clientX) return false;
        if ( clientY < this.clientY) return false;
        if ( clientX > this.clientX + this.clientWidth) return false;
        if ( clientY > this.clientY + this.clientHeight) return false;
        return true;
    }
}

function round(num: number) {
    return Math.round(num * 10) / 10;
}