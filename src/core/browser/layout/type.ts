import type View from '../view'; 
import type SplitItemView from './split-item.view';

export enum directionType {
    'col',
    'row'
}

export interface ISplitBoardView extends View {
    items: SplitItemView[];
    direction : directionType;
    setCursor: (type: '' | 'row-resize' | 'col-resize' | 'crosshair' | 'e-resize' | 'w-resize' | 's-resize' | 'n-resize') => void;
    cancelForMerge: () => void;
    resizeAt: (index: number, start: number, length: number, position: number) => void;
    waitForMergeAtItem: (index: number, direction: 'w' | 'e' | 'n' | 's') => void;
    splitColumnAt: (index: number, clientX: number, clientY: number) => void;
    splitRowAt: (index: number, clientX: number, clientY: number) => void;
}