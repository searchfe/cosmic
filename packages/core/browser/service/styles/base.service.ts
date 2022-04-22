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
export class BaseService<T extends {id: string}> {

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

    public get(styleId: string): any {
        const style = this.serviceStyles.get(styleId);
        return style;
    }
    
    public getServiceStyles(): any[] {
        return [...this.serviceStyles.values()];
    }

    public async addServiceStyle(style: T) {
        this.serviceStyles.set(style.id, style);
        return style;
    }

}