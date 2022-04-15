import type { Client } from '@urql/core';


type PrefabFields = (keyof gql.Prefab)[];

export default function prefabDAO(client: Client) {
    return {
        query(query: gql.QueryPrefabDTO, fields: PrefabFields = ['id']) {
            return client.query<{ prefabs: Partial<gql.Prefab>[] }>(
                `query ($query: QueryPrefabDTO!) {
                    prefabs(query: $query) {
                        id,
                        ${fields.join(',')}
                    }
                }`,
                { query },
            ).toPromise();
        },
        create(data: gql.CreatePrefabDTO, fields: PrefabFields = ['id']) {
            return client.mutation<{ createPrefab: Partial<gql.Prefab> }>(
                `mutation ($data: CreatePrefabDTO!) {
                    createPrefab(data: $data) {
                        id,
                        ${fields.join(',')}
                    }
                }`,
                { data },
            ).toPromise();
        },
        update(data: gql.QueryPrefabDTO) {
            return client.mutation<{ updatePrefab: boolean }>(
                `mutation ($data: QueryPrefabDTO!) {
                    updatePrefab(data: $data)
                }`,
                { data },
            )
            .toPromise();
        },
        delete(id: string) {
            return client.mutation<{ deletePrefab: boolean }>(
                `mutation ($id: String!) {
                    deletePrefab(id: $id)
                }`,
                { id },
            )
            .toPromise();
        },
    };
}
