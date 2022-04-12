import { useQuery, useMutation } from '@cosmic/core/urql';
import { colorQT } from '@cosmic/core/gql';

// TODO: if wantting server return other field list, design it as a parameter of those functions
export function queryOne(id: string) {
    return useQuery<{ getColor: Partial<gql.Color> }, gql.QueryColorDTO>({
        query: colorQT.queryOne(),
        variables: { id },
        requestPolicy: 'cache-and-network',
    });
}

export function query(query: gql.QueryColorDTO) {
    return useQuery<{ colors: Partial<gql.Color>[] }, gql.QueryColorDTO>({
        query: colorQT.query(),
        variables: query,
        requestPolicy: 'cache-and-network',
    });
}

export function create() {
    return useMutation<{ createColor: Partial<gql.Color> }, { data: gql.CreateColorDTO }>(colorQT.create());
}

export function update() {
    return useMutation<{ updateColor: Partial<gql.Color> }, { data: gql.QueryColorDTO }>(colorQT.update());
}

export function createUnique() {
    return useMutation<
        { createUniqueColor: Partial<gql.Color> },
        { data: gql.CreateColorDTO, filter: gql.QueryColorDTO }
    >(colorQT.createUnique());
}
