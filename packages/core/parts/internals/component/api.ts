import * as urql from '@urql/vue';

const { useQuery, useMutation } = urql;

export type QueryComponentResult = Pick<
    gql.Component,
    | 'name'
    | 'displayName'
    | 'desc'
>
    & { keyNodes: QueryKeyNodeResult[] }
    & { properties: QueryPropertyResult[] }
    & { variants: QueryVariantResult[] };

type QueryKeyNodeResult = Pick<
    gql.KeyNode,
    | 'type'
    | 'name'
    | 'desc'
>;

type QueryPropertyResult = Pick<
    gql.Property,
    | 'name'
    | 'type'
    | 'defaultValue'
    | 'desc'
>;

type QueryVariantResult = Pick<
    gql.Property,
    | 'name'
    | 'type'
    | 'defaultValue'
    | 'desc'
>;

const queryFields = `name
displayName
desc
keyNodes {
    name
    type
    desc
}
properties {
    name
    type
    defaultValue
    desc
}
variants {
    name
    type
    defaultValue
    desc
}`;

export function useTeamComponents<T extends gql.QueryComponentDTO>(component: T) {
    return useQuery<QueryComponentResult[]>({
        query: `
            query ($query: QueryComponentDTO) {
                components(query: $query) { ${queryFields} }
            }
        `,
        variables: { component },
    });
}

export function useCreateComponent<T extends gql.CreateComponentDTO>() {
    return useMutation<QueryComponentResult, { data: T }>(`
        mutation ($data: CreateComponentDTO!) {
            createComponent(data: $data) { ${queryFields} }
        }
    `);
}
