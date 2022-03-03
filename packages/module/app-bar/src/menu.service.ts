// import { EventEmitter2 } from 'eventemitter2';
import { Observer, injectable } from '@cosmic/core/parts';
interface Data {
    [key: string]: string;
}
@injectable()
export default class MenuService {
    private ob: Observer;
    constructor() {
        this.ob = Observer.getObserver();
    }
    public selectTab(index: number, data: Data){
        this.ob.publish('select', {
            index,
            data,
        });
        return index;
    }
    public change(cb: (index: number, data: Data) => void) {
        this.ob.subscribe('select', (rs) => {
            cb(rs.index, rs.data);
        });
    }
}