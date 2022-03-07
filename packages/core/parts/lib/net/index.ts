import { OnlineSniffer } from './online-sniffer';


type netStatus = 'online' | 'offline';
type listener = (status: netStatus) => unknown;

export class Net {
    private onlineSniffer: OnlineSniffer;
    private callbacks: Set<listener> = new Set;
    private status: netStatus = 'offline';

    constructor() {
        this.onlineSniffer = new OnlineSniffer(this.onLineStatusChangeHandler);
    }

    private onLineStatusChangeHandler() {
        this.status = this.onlineSniffer.isOnline() ? 'online' : 'offline';
        this.callbacks.forEach(cb => {
            cb(this.status);
        });
    }

    onStatusChange(cb: listener) {
        this.callbacks.add(cb);
    }

    getStatus() {
        return this.status;
    }
}
