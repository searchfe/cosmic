import { Client } from '@urql/core';

const fontField = ['id', 'team', 'style', 'variant', 'weight', 'size', 'lineHeight', 'family', 'name'];

export default function fontDao(client: Client) {

    return {
        query(query: gql.QueryFontDTO) {
            return client.query< {fonts: Partial<gql.Font>[]}>(
                `query ($query: QueryFontDTO!) {
                    fonts(query: $query) {
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
            return client.mutation<{ createFont: Partial<gql.QueryFontDTO> }>(
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
