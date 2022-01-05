import { injectable } from 'inversify';

@injectable()
export abstract class Controller {
    abstract view(): HTMLElement;

    viewWillAppear() {
        /** going to render, appending element to dom tree  */
    }
    viewDidAppear() {
        /** after appeared */
    }

    viewWillDisappear() {
        /** going to disappear */
    }
    viewDidDisappear() {
        /** going to disappear */
    }
}
