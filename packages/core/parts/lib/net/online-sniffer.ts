interface ICallback {
    (online: boolean): void;
}

export class OnlineSniffer {
    private online = false;

    constructor(private statusCallback: ICallback) {
        window.addEventListener('online', () => {
            this.statusChangeHandler(true);
        });

        window.addEventListener('offline', () => {
            this.statusChangeHandler(false);
        });
    }

    private statusChangeHandler(status: boolean) {
        this.online = status;
        this.statusCallback(status);
    }

    isOnline() {
        return this.online;
    }
}
