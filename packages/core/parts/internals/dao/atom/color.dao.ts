import { useQuery, useMutation } from '@urql/vue';


export function query(schema: string, query: gql.QueryColorDTO, fields: string[]) {
    const projection = fields || ['id', 'name', 'day', 'night', 'dark'];
    return useQuery<Partial<gql.Color>, gql.QueryColorDTO>({
        query: `query ($fields: [String!], $query: QueryColorDTO) {
            colors(fields: $fields, query: $query) {
                id,
                ${projection.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(schema: string, fields: string[] = ['id']) {
    return useMutation<Partial<gql.Color>, { data: gql.CreateColorDTO }>(
        `mutation ($data: CreateColorDTO!) {
            createColor(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function createUnique(schema: string, fields: string[] = ['id']) {
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
