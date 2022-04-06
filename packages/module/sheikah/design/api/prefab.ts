import { useMutation, useQuery } from '@cosmic/core/urql';


type PrefabFields = (keyof gql.Prefab)[];

export function queryOne(id: string, fields: PrefabFields = ['id', 'name', 'team', 'component', 'atoms']) {
    return useQuery<{ getPrefab: Partial<gql.Prefab> }, gql.QueryPrefabDTO>({
        query: `query ($id: String!) {
            getPrefab(id: $id) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: { id },
        requestPolicy: 'cache-and-network',
    });
}

export function query(query: gql.QueryPrefabDTO, fields: string[] = ['id', 'name', 'team', 'component', 'atoms']) {
    return useQuery<{ prefabs: Partial<gql.Prefab>[] }, gql.QueryPrefabDTO>({
        query: `query ($fields: [String!], $query: QueryPrefabDTO) {
            prefabs(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(fields: string[] = []) {
    return useMutation<{ createPrefab: Partial<gql.Prefab> }, { data: gql.CreatePrefabDTO }>(
        `mutation ($data: CreatePrefabDTO!) {
            createPrefab(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function deleteOne() {
    return useMutation<{ deletePrefab: boolean }, { id: string }>(`
        mutation deletePrefab($id: String!) {
            deletePrefab(id: $id)
        }
    `);
}
