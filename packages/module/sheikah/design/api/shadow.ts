import { urql } from '@cosmic/core/browser';


const { useQuery, useMutation } = urql;


export function query(query: gql.QueryShadowDTO, fields: string[] = []) {
    return useQuery<{ shadows: Partial<gql.Shadow>[] }, gql.QueryShadowDTO>({
        query: `query ($fields: [String!], $query: QueryShadowDTO) {
            shadows(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(fields: string[] = []) {
    return useMutation<{ createShadow: Partial<gql.Shadow> }, { data: gql.CreateShadowDTO }>(
        `mutation ($data: CreateShadowDTO!) {
            createShadow(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function createUnique(fields: string[] = []) {
    return useMutation<
        { createUniqueShadow: Partial<gql.Shadow> },
        { data: gql.CreateShadowDTO, filter: gql.QueryShadowDTO }
    >(
        `mutation ($data: CreateShadowDTO!, $filter: QueryShadowDTO!) {
            createUniqueShadow(data: $data, filter: $filter) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}
