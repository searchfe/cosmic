import Component from './resource-explorer.svelte';
import { SVController } from '@cosmic/core/parts';

export class ResourceExplorer extends SVController {
    initWithComponent(target: Element) {
        return new Component({
            target,
        });
    }

    viewWillAppear(): void {
        /** to be completed */
    }
    viewDidAppear(): void {
        /** to be completed */
    }

    viewWillDisappear(): void {
        /** to be completed */
    }
    viewDidDisappear(): void {
        /** to be completed */
    }
}