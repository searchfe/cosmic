import gt from 'graphql-tag';

const defaultFragment = gt`
    fragment colorFields on Color {
        id
        name
        team
        day
        night
        dark
        updatedAt
    }
`;

export function queryOne(colorFields = defaultFragment) {
    return gt`
        query ($id: String!) {
            getColor(id: $id) {
                ...colorFields
            }
        }
        ${colorFields}
    `;
}

export function query(colorFields = defaultFragment) {
    return gt`
        query ($query: QueryColorDTO) {
            colors(query: $query) {
                ...colorFields
            }
        }
        ${colorFields}
    `;
}


export function create(colorFields = defaultFragment) {
    return gt`
        mutation ($data: CreateColorDTO!) {
            createColor(data: $data) {
                ...colorFields
            }
        }
        ${colorFields}
    `;
}

export function update() {
    return gt`
        mutation ($data: QueryColorDTO!) {
            updateColor(data: $data)
        }
    `;
}

export function createUnique(colorFields = defaultFragment) {
    return gt`
        mutation ($data: CreateColorDTO!, $filter: QueryColorDTO!) {
            createUniqueColor(data: $data, filter: $filter) {
                ...colorFields
            }
        }
        ${colorFields}
    `;
}
