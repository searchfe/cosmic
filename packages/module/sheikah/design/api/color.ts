import { urql } from '@cosmic/core/browser';


const { useQuery, useMutation  } = urql;

export function query(schema: string, query: gql.QueryColorDTO, fields: string[] = []) {
    return useQuery<Partial<gql.Color>, gql.QueryColorDTO>({
        query: `query ($fields: [String!], $query: QueryColorDTO) {
            colors(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(schema: string, fields: string[] = []) {
    return useMutation<Partial<gql.Color>, { data: gql.CreateColorDTO }>(
        `mutation ($data: CreateColorDTO!) {
            createColor(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function createUnique(schema: string, fields: string[] = []) {
    return useMutation<
        { createUniqueColor: Partial<gql.Color> },
        { data: gql.CreateColorDTO, filter: gql.QueryColorDTO }
    >(
        `mutation ($data: CreateColorDTO!, $filter: QueryColorDTO!) {
            createUniqueColor(data: $data, filter: $filter) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}
