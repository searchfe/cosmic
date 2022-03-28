import { injectable } from '@cosmic/core/inversify';
import { NodeService } from '../node.service';
@injectable()
export class BaseService<T extends Record<string, unknown> & {id: string}> {

    // 当前service类型
    protected type: string;

    protected localStyles: Map<string, T>;

    protected serviceStyles: Map<string, T>;

    constructor() {
        this.localStyles =  new Map<string, T>();
        this.serviceStyles = new Map<string, T>();
    }

    public setType(type: string) {
        this.type = type;
    }

    public get(styleId: string) {
        return this.localStyles.get(styleId) || this.serviceStyles.get(styleId);
    }

    public delete(styleId: string): T {
        if (this.localStyles.has(styleId)) {
            return this.localStyles.remove(styleId);
        }
        this.deleteService(styleId);
    }

    public clone(styleId: string): T {
        const target = this.get(styleId);
        const cloneStyle = target.clone();
        return cloneStyle;
    }

    public addLocalStyle(style: T):T {
        this.localStyles.set(style.id, style);
        return style;
    }

    public deleteService(styleId: string): T{
        return this.localStyles.remove(styleId);
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

    public async addServiceStyle(style: T): Promise<T[]> {
        this.serviceStyles.set(style.id, style);
        return style;
    }

    public unref(styleId: string): T {
        const style = this.get(styleId).clone();
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
        await Promise.resolve();
        this.updateLocalStyles(style);
        return style;
    }

    public updateLocalStyles(style: T): T {
        this.localStyles.set(style.id, style);
    }

    public isLocalStyle(styleId: string) {
        console.log(this.localStyles.has(styleId));
        return this.localStyles.has(styleId);
    }
}