import { injectable } from '@cosmic/core/inversify';
import { Subject } from '@cosmic/core/rxjs';
import { TOKENS } from '../token';
import { TeamService } from '../team/index.service';
import { inject } from '@cosmic/core/parts';

export interface SubjectSourceType {
    type: 'C' | 'U' | 'D' | 'R';
    data?: string;
}

@injectable()
export class BaseService<T extends {id: string, clone: () => T}> {

    public subject: Subject<SubjectSourceType>;

    // 当前service类型
    protected type: string;

    protected localStyles: Map<string, T>;

    protected serviceStyles: Map<string, T>;

    protected teamService: TeamService;

    constructor() {
        this.localStyles =  new Map<string, T>();
        this.serviceStyles = new Map<string, T>();
        this.subject = new Subject<SubjectSourceType>();
        this.teamService = inject<TeamService>(TOKENS.Teams);
    }

    public create(): any {
        // todo
    }

    public setType(type: string) {
        this.type = type;
    }

    public get(styleId: string): T  {
        let style = this.localStyles.get(styleId) || this.serviceStyles.get(styleId);
        // 当前style为空的时候创建默认
        if (!style) {
            style = this.create() as T;
            style.id = styleId;
            this.addLocalStyle(style);
        }
        return style;
    }

    public delete(styleId: string) {
        if (this.localStyles.has(styleId)) {
            return this.localStyles.delete(styleId);
        }
        this.deleteService(styleId);
    }

    public clone(styleId: string): T {
        const target = this.get(styleId);
        const cloneStyle = target.clone();
        return cloneStyle;
    }

    public addLocalStyle(style: T):T {
        if (!style) return style;
        this.localStyles.set(style.id, style);
        return style;
    }

    public deleteService(styleId: string) {
        return this.localStyles.delete(styleId);
    }
    
    public initLocalStyles(styles: T[]) {
        styles.forEach(style => this.addLocalStyle(style));
    }

    public getLocalStyles(): T[] {
        return [...this.localStyles.values()];
    }
    
    public getServiceStyles(): T[] {
        return [...this.serviceStyles.values()];
    }

    public async addServiceStyle(style: T) {
        this.serviceStyles.set(style.id, style);
        return style;
    }

    public unref(styleId: string): T {
        const style = this.get(styleId).clone();
        style.id = Date.now() + '';
        this.addLocalStyle(style);
        return style;
    }

    public ref(styleId: string, originStyleId: string): T {
        const style = this.get(styleId);
        if (this.isLocalStyle(originStyleId)) {
            this.delete(originStyleId);
        } 
        return style;
    }

    public async updateStyle(style: T) {
        // TODO
    }

    public updateLocalStyles(style: T): void {
        this.localStyles.set(style.id, style);
    }

    public isLocalStyle(styleId: string) {
        return this.localStyles.has(styleId);
    }
}