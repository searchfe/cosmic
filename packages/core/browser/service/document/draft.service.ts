import { injectable, inject } from '@cosmic/core/inversify';
import { draftDAO } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { Subject } from '@cosmic/core/rxjs';

interface SubjectSourceType {
    type: 'C' | 'U' | 'D';
    data: Partial<gql.Draft>[];
}

@injectable()
export default class DraftService {
    private draftDAO: ReturnType<typeof draftDAO>;
    private subject: Subject<SubjectSourceType>;

    constructor(@inject(service.TOKENS.GqlClient) private client: service.GqlClient) {
        this.draftDAO = draftDAO(client);
        this.subject = new Subject();
    }

    async query(query: gql.QueryDraftDTO) {
        const result = await this.draftDAO.query(query, ['id', 'data', 'project', 'name', 'team']);
        return result.data?.drafts;
    }

    async create(data: gql.CreateDraftDTO) {
        const result = await this.draftDAO.create(data, ['id', 'data', 'project', 'name', 'team']);
        const newData = result.data?.createDraft;
        if (newData && newData.id) {
            this.subject.next({
                type: 'C',
                data: [newData],
            });
        }
    }

    async update(data: gql.QueryDraftDTO) {
        const result = await this.draftDAO.update(data);
        if (result.data) {
            this.subject.next({
                type: 'U',
                data: [data as SubjectSourceType],
            });
        }
    }

    async delete(id: string) {
        const result = await this.draftDAO.delete(id);
        if (result.data) {
            this.subject.next({
                type: 'D',
                data: [{ id }],
            });
        }
    }
}
