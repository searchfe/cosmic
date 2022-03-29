import { urql } from '@cosmic/core/browser';


const { useQuery, useMutation } = urql;


export function query(query: gql.QueryOpacityDTO, fields: string[] = []) {
    return useQuery<{ opacitys: Partial<gql.Opacity>[] }, gql.QueryOpacityDTO>({
        query: `query ($fields: [String!], $query: QueryOpacityDTO) {
            opacitys(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(fields: string[] = []) {
    return useMutation<{ createOpacity: Partial<gql.Opacity> }, { data: gql.CreateOpacityDTO }>(
        `mutation ($data: CreateOpacityDTO!) {
            createOpacity(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function createUnique(fields: string[] = []) {
    return useMutation<
        { createUniqueOpacity: Partial<gql.Opacity> },
        { data: gql.CreateOpacityDTO, filter: gql.QueryOpacityDTO }
    >(
        `mutation ($data: CreateOpacityDTO!, $filter: QueryOpacityDTO!) {
            createUniqueOpacity(data: $data, filter: $filter) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}
