import { capitalize } from 'lodash';
import { operationStore, mutation } from '@urql/svelte';

export function query<Data, QueryDTO>(schema: string, query: QueryDTO, fields: string[] = []) {
    return operationStore<Data, { query: QueryDTO }>(
        `query ($fields: [String!], $query: Query${capitalize(schema)}DTO) {
                colors(fields: $fields, query: $query) {
                    id,
                    ${fields.join(',')}
                }
        }`,
        { query },
        { requestPolicy: 'cache-and-network' },
    );
}

export function onCreate<Data>(schema: string, fields: string[] = []) {
    return operationStore<Data>(
        `subscription {
            on${capitalize(schema)}Create {
                id,
                ${fields.join(',')}
            }
        }`,
    );
}

export function create<Result, Data>(schema: string, fields: string[] = []) {
    const capializeName = capitalize(schema);
    return mutation<Result, { data: Data }>({
        query: `mutation ($data: Create${capializeName}DTO!) {
            create${capializeName}(data: $data) {
                id,
                ${fields.join(',')}
            }
        }`,
    });
}
