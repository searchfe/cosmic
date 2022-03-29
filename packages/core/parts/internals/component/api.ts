import * as urql from '@urql/vue';

const { createRequest } = urql;

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

export function createFetchTeamComponentsRequest(query: gql.QueryComponentDTO) {
    return createRequest<{ components: QueryComponentResult[] }>(`
        query ($query: QueryComponentDTO) {
            components(query: $query) { ${queryFields} }
        }
    `, query);
}

export const createComponentQuery = `
    mutation ($data: CreateComponentDTO!) {
        createComponent(data: $data) { ${queryFields} }
    }
`;

export const deleteComponentQuery = `
    mutation ($data: QueryComponentDTO!) {
        deleteComponentByTeamAndName(data: $data)
    }
`;

export const updateComponentQuery = `
    mutation ($data: CreateComponentDTO!) {
        updateComponent(data: $data)
    }
`;
