import { injectable, inject } from '@cosmic/core/inversify';
import { draftDAO } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
// import { Subject } from '@cosmic/core/rxjs';
import { TOKENS } from '../token';
import { serialize, deserialize } from '@cosmic/core/parts';

// interface SubjectSourceType {
//     type: 'C' | 'U' | 'D';
//     data: Partial<gql.Draft>[];
// }


@injectable()
export default class DraftService {
    private draftDAO: ReturnType<typeof draftDAO>;
    private draft: Partial<gql.Draft>;
    // private subject: Subject<SubjectSourceType>;

    constructor(
        @inject(TOKENS.GqlClient) private client: service.GqlClient,
        @inject(TOKENS.Node) private nodeService: service.NodeService,
    ) {
        this.draftDAO = draftDAO(this.client);
        this.draft = {
            name: '设计稿',
            data: '{}',
            team: '6166bd9cc13b026875181927',
            project: '62449f2aa3551f6c5bccbd0c',
        };
        // this.subject = new Subject();
        this.open();
    }

    async save() {
        const obj = serialize(this.nodeService.getDocument());
        console.log('save', obj);
        this.draft.data  = JSON.stringify(obj);
        if (!this.draft.id) {
            const newOne = await this.create(this.draft);
            this.draft.id = newOne.id;
        } else {
            const updatedOne = await this.update(this.draft);
        }
        localStorage.setItem('draft', this.draft.id);
    }

    async open() {
        let draft: Partial<gql.Draft>;
        const draftId = localStorage.getItem('draft');
        if (!draftId) {
            const drafts = await this.query({});
            if (drafts && drafts.length) {
                draft = drafts.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))[0].data;
            }
        } else {
            const d = await this.queryOne(draftId);
            if (d?.data) {
                draft = d.data;
            }
        }
        const data = JSON.parse(draft);
        console.log('open', data);
        if (data.refs) {
            const document = deserialize(data);
            console.log('deserialize', document);
            this.nodeService.load(document);
        }
    }

    async query(query: gql.QueryDraftDTO) {
        const result = await this.draftDAO.query(query, ['id', 'data', 'project', 'name', 'team', 'updatedAt']);
        return result.data?.drafts;
    }

    async queryOne(id: string) {
        const result = await this.draftDAO.queryOne(id, ['id', 'data']);
        return result.data?.getDraft;
    }

    async create(data: gql.CreateDraftDTO) {
        const result = await this.draftDAO.create(data, ['id', 'data', 'project', 'name', 'team']);
        if (!result.data) {
            throw new Error(`Save Error, Result: ${result}`);
        }
        return result.data.createDraft;
        // const newData = result.data?.createDraft;
        // if (newData && newData.id) {
        //     this.subject.next({
        //         type: 'C',
        //         data: [newData],
        //     });
        // }
    }

    async update(data: gql.QueryDraftDTO) {
        const result = await this.draftDAO.update(data);
        // if (result.data) {
        //     this.subject.next({
        //         type: 'U',
        //         data: [data as SubjectSourceType],
        //     });
        // }
    }

    async delete(id: string) {
        const result = await this.draftDAO.delete(id);
        // if (result.data) {
        //     this.subject.next({
        //         type: 'D',
        //         data: [{ id }],
        //     });
        // }
    }
}
