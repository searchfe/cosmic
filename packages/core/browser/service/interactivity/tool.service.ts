import { Subject } from '@cosmic/core/rxjs';
import { injectable, inject } from '@cosmic/core/inversify';
import { TOKENS } from '../token';
import KeyboardService from './keyboard.service';

type ToolData = {[index: string]: any};

@injectable()
/** 处理工具的全局状态事务 */
export default class ToolService {
    private _states: ToolState[]  = [];
    private subject: Subject<ToolState>;
    public  data : ToolData = {};
    constructor(@inject(TOKENS.Keyboard) private keyboardService: KeyboardService) {
        this.subject = new Subject();
        keyboardService.keydown('SPACE').subscribe(() => this.set(ToolState.Hand));
        keyboardService.keyup('SPACE').subscribe(() => this.cancel(ToolState.Hand));
        this.initShortcutKey();
    }
    getState() {
        return this._states.length ? this._states[this._states.length - 1] : ToolState.Null;
    }
    state() {
        return this.subject;
    }
    resotre() {
        this._states = [ToolState.Null];
        this.subject.next(ToolState.Null);
    }
    set(state: ToolState, data?: ToolData) {
        if (this._states.lastIndexOf(state) === this._states.length -1 && this._states.length > 0) return;
        this.data = data || {};
        this._states.push(state);
        this.subject.next(state);
    }
    cancel(state: ToolState, data?: ToolData) {
        const last = this._states.pop();
        this.data = data || {};
        if (last === state) {
            const sec = this._states.pop();
            if (sec) {
                this.set(sec);
                return;
            }
            this.resotre();
        }
    }
    initShortcutKey() {
        this.keyboardService.keydown('F').subscribe((event: KeyboardEvent) => {
            if (event.target !== document.body) return;
            if(this.getState() === ToolState.Null) this.set(ToolState.Frame);
        });
        this.keyboardService.keydown('T').subscribe((event: KeyboardEvent) => {
            if (event.target !== document.body) return;
            if(this.getState() === ToolState.Null) this.set(ToolState.Text);
        });
    }
}

export enum ToolState {
    Null,
    Frame,
    Text,
    Hand,
    Component,
    ResizeNode,
    MoveNode,
}


