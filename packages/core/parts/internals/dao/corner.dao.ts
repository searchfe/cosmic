import { Client } from '@urql/core';

export default function CornerDao(client: Client) {
    return {
        query(query: gql.QueryCornerDTO) {
            const projection = ['id', 'name', 'tl', 'tr', 'bl', 'br'];
            return client.query< {corners: Partial<gql.Corner>[]}>(
                `query ($query: QueryCornerDTO!) {
                    corners(query: $query) {
                        id,
                        ${projection.join(',')}
                    }
                }`,
                {query},
            ).toPromise();
        },

        create(data: Partial<gql.CreateCornerDTO>, fields = ['id']) {
            return client.mutation<{ createCorner: Partial<gql.QueryCornerDTO> }>(
                `mutation ($data: CreateCornerDTO!) {
                    createCorner(data: $data) {
                        id
                    }
                }`,
                { data },
            ).toPromise();
        },

        update(data: Partial<gql.QueryCornerDTO>, fields = ['id']) {
            return client.mutation<{ updateCorner: boolean }>(
                `mutation ($data: QueryCornerDTO!) {
                    updateCorner(data: $data)
                }`,
                { data },
            ).toPromise();
        },
    };
}