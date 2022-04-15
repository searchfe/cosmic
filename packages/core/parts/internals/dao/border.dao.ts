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
            return client.mutation<{ createBorder: Partial<gql.QueryBorderDTO> }>(
                `mutation ($data: CreateBorderDTO!) {
                    createBorder(data: $data) {
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
                { data },
            ).toPromise();
        },

        update(data: Partial<gql.QueryBorderDTO>, fields = ['id']) {
            return client.mutation<{ updateBorder: boolean }>(
                `mutation ($data: QueryBorderDTO!) {
                    updateBorder(data: $data)
                }`,
                { data },
            ).toPromise();
        },
    };
}