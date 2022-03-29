import { type Observable, Subject, BehaviorSubject, of } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';

@injectable()
export default class KeyboardService {
    constructor(private root: HTMLElement = document.body) {
        this.root.addEventListener('keydown', (e) => {this.onKeydown(e); });
        this.root.addEventListener('keyup', (e) => {this.onKeyup(e); });
    }
    private onKeydown(event: KeyboardEvent) {
        console.log(event);
        //
    }
    private onKeyup(event: KeyboardEvent) {
        //
    }
}