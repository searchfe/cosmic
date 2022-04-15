import { useQuery, useMutation } from '@cosmic/core/urql';


export function query(query: gql.QueryBorderDTO) {
    return useQuery<{ borders: Partial<gql.Border>[] }, gql.QueryBorderDTO>({
        query: `query ($query: QueryBorderDTO) {
            borders(query: $query) {
                id,
                name,
                team,
                top{
                    weight,
                    style,
                },
                right{
                    weight,
                    style,
                },
                bottom{
                    weight,
                    style,
                },
                left{
                    weight,
                    style,
                },
            }
        }`,
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create(fields='') {
    return useMutation<{ createBorder: Partial<gql.Border> }, { data: gql.CreateBorderDTO }>(
        `mutation ($data: CreateBorderDTO!) {
            createBorder(data: $data) {
                id,
                ${fields}
            }
        }`,
    );
}

export function createUnique(fields='') {
    return useMutation<
        { createUniqueBorder: Partial<gql.Color> },
        { data: gql.CreateBorderDTO, filter: gql.QueryBorderDTO }
    >(
        `mutation ($data: CreateBorderDTO!, $filter: QueryBorderDTO!) {
            createUniqueBorder(data: $data, filter: $filter) {
                id,
                ${fields}
            }
        }`,
    );
}
