import { useQuery, useMutation } from '@cosmic/core/urql';


export function query(query: gql.QueryCornerDTO, fields: string[] = []) {
    return useQuery<{ corners: Partial<gql.Corner>[] }, gql.QueryCornerDTO>({
        query: `query ($query: QueryCornerDTO) {
            corners(query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(fields: string[] = []) {
    return useMutation<{ createCorner: Partial<gql.Corner> }, { data: gql.CreateCornerDTO }>(
        `mutation ($data: CreateCornerDTO!) {
            createCorner(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function createUnique(fields: string[] = []) {
    return useMutation<
        { createUniqueCorner: Partial<gql.Corner> },
        { data: gql.CreateCornerDTO, filter: gql.QueryCornerDTO }
    >(
        `mutation ($data: CreateCornerDTO!, $filter: QueryCornerDTO!) {
            createUniqueCorner(data: $data, filter: $filter) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}
