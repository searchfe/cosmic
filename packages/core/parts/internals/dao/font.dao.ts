import { Client } from '@urql/core';

const fontField = ['id', 'team', 'style', 'variant', 'weight', 'size', 'lineHeight', 'family', 'name'];

export default function fontDao(client: Client) {

    return {
        query(query: gql.QueryFontDTO) {
            return client.query< {fonts: Partial<gql.Font>[]}>(
                `query ($fields: [String!], $query: QueryFontDTO!) {
                    fonts(fields: $fields, query: $query) {
                        id,
                        name,
                        team,
                        weight,
                        size,
                        lineHeight,
                        family
                    }
                }`,
                {query},
            ).toPromise();
        },
        create(data: Partial<gql.CreateFontDTO>, fields = ['id']) {
            return client.mutation<{ createDraft: Partial<gql.CreateFontDTO> }>(
                `mutation ($data: CreateFontDTO!) {
                    createFont(data: $data) {
                        id,
                        ${fields.join(',')}
                    }
                }`,
                { data },
            ).toPromise();
        },

        update(data: Partial<gql.QueryFontDTO>, fields = ['id']) {
            return client.mutation<{ updateFont: boolean }>(
                `mutation ($data: QueryFontDTO!) {
                    updateFont(data: $data)
                }`,
                { data },
            ).toPromise();
        },
    };
}
