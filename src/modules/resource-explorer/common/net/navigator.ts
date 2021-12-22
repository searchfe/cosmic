interface ICallback {
  (online: boolean): void;
}

export class Navigator {
  private static instance: Navigator;
  private online = false;
  private callbacks: ICallback[] = [];

  static getInstance() {
    if (!Navigator.instance) {
      Navigator.instance = new Navigator();
      Navigator.instance.init();
    }
    return Navigator.instance;
  }

  private init() {
    window.addEventListener('online', event => {
      Navigator.instance.netListner(true);
    });
    window.addEventListener('offline', event => {
      Navigator.instance.netListner(false);
    });
  }

  private netListner(online: boolean) {
    this.online = online;
    this.callbacks.forEach(cb => {
      cb(online);
    });
  }

  isOnline() {
    return this.online;
  }

  onNestStatusChange(cb: ICallback) {
    this.callbacks.push(cb);
  }
}
