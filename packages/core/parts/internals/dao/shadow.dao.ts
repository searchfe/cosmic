import { Client } from '@urql/core';

export default function shadowDao(client: Client) {
    return {

        query(query: gql.QueryShadowDTO) {
            const projection = ['id', 'name', 'offsetX', 'offsetY', 'blur', 'spread'];
            return client.query< {shadows: Partial<gql.Shadow>[]}>(
                `query ($query: QueryShadowDTO!) {
                    shadows(query: $query) {
                        id,
                        ${projection.join(',')}   
                    }
                }`,
                {query},
            ).toPromise();
        },

        create(data: Partial<gql.CreateShadowDTO>, fields = ['id']) {
            const projection = ['id', 'name', 'offsetX', 'offsetY', 'blur', 'spread'];
            return client.mutation<{ createShadow: Partial<gql.QueryShadowDTO> }>(
                `mutation ($data: CreateShadowDTO!) {
                    createShadow(data: $data) {
                        id,
                        ${projection.join(',')}
                    }
                }`,
                { data },
            ).toPromise();
        },

        update(data: Partial<gql.QueryShadowDTO>, fields = ['id']) {
            return client.mutation<{ updateShadow: boolean }>(
                `mutation ($data: QueryShadowDTO!) {
                    updateShadow(data: $data)
                }`,
                { data },
            ).toPromise();
        },
    };
}