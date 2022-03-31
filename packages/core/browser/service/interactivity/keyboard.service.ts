import { type Observable, Subject, BehaviorSubject, of, filter } from '@cosmic/core/rxjs';
import { injectable } from '@cosmic/core/inversify';

@injectable()
export default class KeyboardService {
    private subject: Subject<KeyboardEvent>;
    constructor(private root: HTMLElement = document.body) {
        this.root.addEventListener('keydown', (e) => {
            this.subject.next(e);
        });
        this.root.addEventListener('keyup', (e) => {
            this.subject.next(e);
        });
        this.subject = new Subject();
    }
    public keyup(code: string) {
        return this.subject.pipe(
            filter(event => event.type === 'keyup' && (event.key === code || event.code ===code)),
        );
    }
    public keydown(code: string) {
        return this.subject.pipe(
            filter(event => event.type === 'keydown' && (event.key === code || event.code ===code)),
        );
    }
}