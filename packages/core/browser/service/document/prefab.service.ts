import { injectable, inject } from '@cosmic/core/inversify';
import { prefabDAO } from '@cosmic/core/parts';
import { service } from '@cosmic/core/browser';
import { Subject } from '@cosmic/core/rxjs';

interface SubjectSourceType {
    type: 'C' | 'U' | 'D';
    data: Partial<gql.Prefab>[];
}

const defaultFields: Array<keyof gql.Prefab> = ['id', 'name', 'team', 'atoms', 'component'];

@injectable()
export default class PrefabService {
    private prefabDAO: ReturnType<typeof prefabDAO>;
    private subject: Subject<SubjectSourceType>;

    constructor(@inject(service.TOKENS.GqlClient) private client: service.GqlClient) {
        this.prefabDAO = prefabDAO(client);
        this.subject = new Subject();
    }

    async query(query: gql.Prefab) {
        const result = await this.prefabDAO.query(query, defaultFields);
        return result.data?.prefabs;
    }

    async create(data: gql.CreatePrefabDTO) {
        const result = await this.prefabDAO.create(data, defaultFields);
        const newData = result.data?.createPrefab;
        if (newData && newData.id) {
            this.subject.next({
                type: 'C',
                data: [newData],
            });
        }
    }

    async update(data: gql.QueryPrefabDTO) {
        const result = await this.prefabDAO.update(data);
        if (result.data) {
            this.subject.next({
                type: 'U',
                data: [data as gql.Prefab],
            });
        }
    }

    async delete(id: string) {
        const result = await this.prefabDAO.delete(id);
        if (result.data) {
            this.subject.next({
                type: 'D',
                data: [{ id }],
            });
        }
    }
}
