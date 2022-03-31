import { Subject } from '@cosmic/core/rxjs';
import { injectable, inject } from '@cosmic/core/inversify';
import { TOKENS } from '../token';
import KeyboardService from './keyboard.service';

@injectable()
/** 处理工具的全局状态事务 */
export default class ToolService {
    private _states: ToolState[]  = [];
    private subject: Subject<ToolState>;
    constructor(@inject(TOKENS.Keyboard) private keyboardService: KeyboardService) {
        this.subject = new Subject();
        keyboardService.keydown('Space').subscribe(() => this.set(ToolState.Hand));
        keyboardService.keyup('Space').subscribe(() => this.cancel(ToolState.Hand));
    }
    state() {
        return this.subject;
    }
    resotre() {
        this._states = [ToolState.Null];
        this.subject.next(ToolState.Null);
    }
    set(state: ToolState) {
        if (this._states.lastIndexOf(state) === this._states.length -1 && this._states.length > 0) return;
        this._states.push(state);
        this.subject.next(state);
    }
    cancel(state: ToolState) {
        const last = this._states.pop();
        if (last === state) {
            const sec = this._states.pop();
            if (sec) {
                this.set(sec);
                return;
            }
            this.resotre();
        }
    }
}

export enum ToolState {
    Null,
    Frame,
    Text,
    Hand,
}


