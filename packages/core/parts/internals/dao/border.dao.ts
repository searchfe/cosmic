import { Client } from '@urql/core';

export default function borderDao(client: Client) {
    return {

        query(query: gql.QueryBorderDTO) {
            const projection = ['id', 'name', 'top', 'right'];
            return client.query< {borders: Partial<gql.Border>[]}>(
                `query ($fields: [String!], $query: QueryBorderDTO!) {
                    borders(fields: $fields, query: $query) {
                        id,
                        name,
                        top {
                            weight,
                            style
                        },
                        right {
                            weight,
                            style
                        },
                    }
                }`,
                {query},
            ).toPromise();
        },

        create(data: Partial<gql.CreateBorderDTO>, fields = ['id']) {
            return client.mutation<{ createColor: Partial<gql.QueryBorderDTO> }>(
                `mutation ($data: CreateBorderDTO!) {
                    createBorder(data: $data) {
                        id,
                        name,
                        top: {
                            weight,
                            style
                        },
                        right {
                            weight,
                            style
                        },
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