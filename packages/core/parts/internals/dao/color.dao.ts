import { Client } from '@urql/core';

export default function ColorDao(client: Client) {
    return {

        query(query: gql.QueryColorDTO) {
            const projection = ['id', 'name', 'day', 'night', 'dark'];
            return client.query< {colors: Partial<gql.Color>[]}>(
                `query ($fields: [String!], $query: QueryColorDTO!) {
                    colors(fields: $fields, query: $query) {
                        id,
                        ${projection.join(',')}
                    }
                }`,
                {query},
            ).toPromise();
        },

        create(data: Partial<gql.CreateColorDTO>, fields = ['id']) {
            return client.mutation<{ createColor: Partial<gql.QueryColorDTO> }>(
                `mutation ($data: CreateColorDTO!) {
                    createColor(data: $data) {
                        id,
                        ${fields.join(',')}
                    }
                }`,
                { data },
            ).toPromise();
        },

        update(data: Partial<gql.QueryColorDTO>, fields = ['id']) {
            return client.mutation<{ updateColor: boolean }>(
                `mutation ($data: QueryColorDTO!) {
                    updateColor(data: $data)
                }`,
                { data },
            ).toPromise();
        },
    };
}