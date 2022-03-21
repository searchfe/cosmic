import { injectable } from '@cosmic/core/inversify';
import { type Subject, BehaviorSubject } from '@cosmic/core/rxjs';

export interface WorkbenchBarItemConfig {
    id: string,
    text: string,
    order?: number,
}

export interface WorkbenchBarItem {
    id: string,
    text: string,
}

@injectable()
export class WorkbenchBarService {
    private configs: WorkbenchBarItemConfig[];
    private source: Subject<WorkbenchBarItem[]>;
    constructor() {
        this.configs = [{
            id: 'sheikah',
            text: '资产管理',      
            order: 10,
        },{
            id: 'workbench',
            text: '设计工具',
            order: 20,
        },{
            id: 'blueprint',
            text: 'Blueprint',
            order: 30,
        }];
        this.source = new BehaviorSubject(this.configs);
    }
    // public regist(config: WorkbenchBarItemConfig) {
    //     // do sth.
    // }
    public getConfigs() {
        return this.source; 
    }
}