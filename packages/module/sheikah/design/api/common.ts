import { lodash } from '@cosmic/core/browser';
import { urql } from '@cosmic/core/browser';


const { capitalize } = lodash;

const { useQuery, useMutation  } = urql;

export function query<Data, QueryDTO>(schema: string, query: MaybeRef<QueryDTO>, fields: string[] = []) {
    return useQuery<Data, { query: QueryDTO }>({
        query: `query ($fields: [String!], $query: Query${capitalize(schema)}DTO) {
            colors(fields: $fields, query: $query) {
                id,
                ${fields.join(',')}
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
