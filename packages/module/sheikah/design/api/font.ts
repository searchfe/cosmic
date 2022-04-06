import { useQuery, useMutation } from '@cosmic/core/urql';


export function query(query: gql.QueryFontDTO, fields: string[] = []) {
    return useQuery<{ fonts: Partial<gql.Font>[] }, gql.QueryFontDTO>({
        query: `query ($fields: [String!], $query: QueryFontDTO) {
            fonts(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(fields: string[] = []) {
    return useMutation<{ createFont: Partial<gql.Font> }, { data: gql.CreateFontDTO }>(
        `mutation ($data: CreateFontDTO!) {
            createFont(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function update() {
    return useMutation<{ updateFont: Partial<gql.Font> }, { data: gql.QueryFontDTO }>(
        `mutation ($data: QueryFontDTO!) {
            updateFont(data: $data)
        }`,
    );
}

export function createUnique(fields: string[] = []) {
    return useMutation<
        { createUniqueFont: Partial<gql.Font> },
        { data: gql.CreateFontDTO, filter: gql.QueryFontDTO }
    >(
        `mutation ($data: CreateFontDTO!, $filter: QueryFontDTO!) {
            createUniqueFont(data: $data, filter: $filter) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}
