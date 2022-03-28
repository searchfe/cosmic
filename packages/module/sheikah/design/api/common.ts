import { lodash } from '@cosmic/core/browser';
import { urql } from '@cosmic/core/browser';


const { capitalize } = lodash;

const { useQuery, useMutation  } = urql;

export function query<Data, QueryDTO>(schema: string, query: MaybeRef<QueryDTO>, fields: string[] = []) {
    return useQuery<Data, { query: QueryDTO }>({
        query: `query ($fields: [String!], $query: QueryBaseDTO) {
            ${schema}s(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function queryBorder(query: MaybeRef<gql.QueryBaseDTO>) {
    return useQuery<{ borders: gql.Border[] }, { query: gql.QueryBaseDTO }>({
        query: `query ($fields: [String!], $query: QueryBaseDTO) {
            borders(fields: $fields, query: $query) {
                id,
                name,
                team,
                top { weight, style },
                bottom { weight, style },
                left { weight, style },
                right { weight, style }
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function onCreate<Data>(schema: string, fields: string[] = []) {
    return useQuery<Data>({
        query: `subscription {
            on${capitalize(schema)}Create {
                id,
                ${fields.join(',')}
            }
        }`,
    });
}

export function create<Result, Data>(schema: string, fields: string[] = []) {
    const capializeName = capitalize(schema);
    return useMutation<Result, { data: Data }>(
        `mutation ($data: Create${capializeName}DTO!) {
            create${capializeName}(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}
